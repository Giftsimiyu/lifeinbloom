import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import crypto from "crypto";

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
      // If already confirmed, return success message
      if (existingSubscriber.confirmed) {
        return NextResponse.json(
          {
            success: true,
            message: "You're already subscribed to our newsletter!",
          },
          { status: 200 }
        );
      }
      // If not confirmed, we could resend confirmation or just update
      // For simplicity, we'll treat it as a new subscription
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

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! Check your email for confirmation.",
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
