import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { resend, FROM_EMAIL } from "@/lib/resend";
import React from "react";
import { NewsletterEmail } from "@/components/emails/NewsletterEmail";
import { render } from "@react-email/render";
import crypto from "crypto";
import { syncSubscriberToResend, prepareSubscriberMetadata } from "@/lib/newsletterAutomation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: unknown): { valid: boolean; error?: string } {
  if (!email || typeof email !== "string") {
    return { valid: false, error: "Email is required" };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  return { valid: true };
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    const validation = validateEmail(email);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already subscribed
    const existingSubscriber = await client.fetch(
      `
      *[_type == "newsletter" && email == $email][0]
      `,
      { email: normalizedEmail }
    );

    if (existingSubscriber) {
      // Return the same message whether confirmed or not - prevents email enumeration
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! If this email isn't already subscribed, you'll receive a confirmation shortly.",
        },
        { status: 200 }
      );
    }

    // Generate confirmation token
    const confirmationToken = generateToken();

    // Create newsletter subscription document
    const subscriber = await client.create({
      _type: "newsletter",
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      confirmed: false, // Start with unconfirmed (can be set to true for simple implementation)
      confirmationToken,
    });

    // In a production environment, you would:
    // 1. Send confirmation email with token
    // 2. User clicks link to confirm subscription
    // 3. Update confirmed field to true
    //
    // For now, we'll auto-confirm to keep it simple
    await client.patch(subscriber._id).set({ confirmed: true }).commit();

    // Sync subscriber to Resend for future campaign management
    const metadata = prepareSubscriberMetadata(normalizedEmail, subscriber.subscribedAt);
    const syncResult = await syncSubscriberToResend(normalizedEmail, metadata);
    
    if (!syncResult.success) {
      console.warn("Failed to sync subscriber to Resend:", syncResult.error);
      // Continue anyway - email sending is more critical than Resend sync
    } else {
      console.log("Subscriber synced to Resend:", normalizedEmail);
    }

    // Send welcome email
    // Note: In development mode with Resend sandbox, we send to admin email instead
    const emailElement = React.createElement(NewsletterEmail, { email: normalizedEmail });
    const emailHtml = await render(emailElement);
    const adminEmailForNewsletter = process.env.CONTACT_EMAIL;
    const emailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmailForNewsletter || normalizedEmail, // Send to admin email in dev mode
      subject: "Welcome to Life in Bloom Newsletter!",
      html: emailHtml,
    });
    
    if (emailResult.error) {
      console.error("Resend email error:", emailResult.error);
    } else {
      console.log("Newsletter email sent:", emailResult.data?.id);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! You're all set to receive updates from Life in Bloom.",
        subscriberId: subscriber._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    // Check if it's a duplicate email error
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already subscribed to our newsletter.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to subscribe. Please try again later.",
      },
      { status: 500 }
    );
  }
}
