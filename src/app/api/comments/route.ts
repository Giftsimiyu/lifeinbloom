import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

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

    // Create comment document in Sanity
    // Comments are created as drafts and must be manually approved
    const comment = await client.create({
      _type: "comment",
      author,
      email,
      content,
      postSlug,
      approved: false,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your comment! It will be published after review.",
        commentId: comment._id,
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
