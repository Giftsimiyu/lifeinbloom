import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { CommentNotificationEmail } from "@/components/emails/CommentNotificationEmail";
import { render } from "@react-email/render";
import React from "react";
import { shouldAutoApproveComment, getApprovalMessage } from "@/lib/commentValidation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CommentData {
  author?: unknown;
  email?: unknown;
  content?: unknown;
  postSlug?: unknown;
}

function validateCommentData(data: CommentData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.author || typeof data.author !== "string" || data.author.trim().length === 0) {
    errors.push("Name is required");
  }

  if (!data.email || typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
    errors.push("Valid email address is required");
  }

  if (!data.content || typeof data.content !== "string" || data.content.trim().length === 0) {
    errors.push("Comment cannot be empty");
  }

  if (!data.postSlug || typeof data.postSlug !== "string" || data.postSlug.trim().length === 0) {
    errors.push("Post slug is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate comment data
    const validation = validateCommentData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.errors.join(", ") },
        { status: 400 }
      );
    }

    const { author, email, content, postSlug } = body;

    // Check if comment should be auto-approved based on blog guidelines
    const approvalResult = shouldAutoApproveComment(content, author);

    // Create comment document in Sanity
    // Comments can be auto-approved if they pass validation, otherwise require manual review
    const comment = await client.create({
      _type: "comment",
      author,
      email,
      content,
      postSlug,
      approved: approvalResult.shouldApprove,
      timestamp: new Date().toISOString(),
    });

    // Send confirmation email to commenter
    // Note: In development mode with Resend sandbox, we send to admin email instead
    const emailElement = React.createElement(CommentNotificationEmail, { 
      author, 
      message: content,
      autoApproved: approvalResult.shouldApprove 
    });
    const emailHtml = await render(emailElement);
    const adminEmail = process.env.CONTACT_EMAIL;
    const commentEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmail || email, // Send to admin email in dev mode
      subject: "Thank You for Your Comment!",
      html: emailHtml,
    });
    
    if (commentEmailResult.error) {
      console.error("Comment email error:", commentEmailResult.error);
    } else {
      console.log("Comment confirmation email sent:", commentEmailResult.data?.id);
    }

    return NextResponse.json(
      {
        success: true,
        message: getApprovalMessage(approvalResult),
        commentId: comment._id,
        autoApproved: approvalResult.shouldApprove,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Comment submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit comment. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get post slug from query parameters
    const postSlug = request.nextUrl.searchParams.get("postSlug");

    if (!postSlug) {
      return NextResponse.json(
        { success: false, message: "Post slug is required" },
        { status: 400 }
      );
    }

    // Fetch approved comments for the post
    const comments = await client.fetch(
      `
      *[_type == "comment" && postSlug == $postSlug && approved == true] | order(timestamp desc) {
        _id,
        author,
        email,
        content,
        timestamp,
        approved
      }
      `,
      { postSlug }
    );

    return NextResponse.json(
      {
        success: true,
        comments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch comments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch comments. Please try again later.",
      },
      { status: 500 }
    );
  }
}
