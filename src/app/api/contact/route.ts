import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Configure email transporter
    // Using environment variables for email configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const adminEmailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    const userEmailContent = `
      <h2>We received your message</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to Life in Bloom! We've received your message and will get back to you within 2-3 business days.</p>
      <hr />
      <h3>Your message:</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      <p>${message.replace(/\n/g, "<br />")}</p>
      <hr />
      <p>Warm regards,<br />Life in Bloom Team</p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: adminEmailContent,
      replyTo: email,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: "We received your message",
      html: userEmailContent,
    });

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
