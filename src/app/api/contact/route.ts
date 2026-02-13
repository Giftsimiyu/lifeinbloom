import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { ContactFormEmail } from "@/components/emails/ContactFormEmail";
import { render } from "@react-email/render";
import React from "react";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate contact form data
function validateFormData(data: {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    errors.push("Name is required");
  }

  if (!data.email || typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
    errors.push("Valid email address is required");
  }

  if (!data.subject || typeof data.subject !== "string" || data.subject.trim().length === 0) {
    errors.push("Subject is required");
  }

  if (!data.message || typeof data.message !== "string" || data.message.trim().length === 0) {
    errors.push("Message is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate form data
    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      return NextResponse.json(
        { success: false, message: "Contact email is not configured" },
        { status: 500 }
      );
    }

    // Send email to admin
    const adminEmailElement = React.createElement(ContactFormEmail, { name, email, subject, message, isAdmin: true });
    const adminEmailHtml = await render(adminEmailElement);
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: contactEmail,
      subject: `New Contact Form: ${subject}`,
      html: adminEmailHtml,
      replyTo: email,
    });
    
    if (adminEmailResult.error) {
      console.error("Admin email error:", adminEmailResult.error);
      return NextResponse.json(
        { success: false, message: "Failed to send admin notification. Please try again." },
        { status: 500 }
      );
    } else {
      console.log("Admin email sent:", adminEmailResult.data?.id);
    }

    // Send confirmation email to user
    // Note: In development mode with Resend sandbox, we send to admin email instead
    const userEmailElement = React.createElement(ContactFormEmail, { name, email, subject, message, isAdmin: false });
    const userEmailHtml = await render(userEmailElement);
    const userEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: contactEmail, // Send to admin email in dev mode
      subject: "We received your message",
      html: userEmailHtml,
    });
    
    if (userEmailResult.error) {
      console.warn("User confirmation email could not be sent (testing mode restriction):", userEmailResult.error);
      // In testing mode, we log the error but still return success since the admin notification was sent
    } else {
      console.log("User confirmation email sent:", userEmailResult.data?.id);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We'll be in touch soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "There was an error sending your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
