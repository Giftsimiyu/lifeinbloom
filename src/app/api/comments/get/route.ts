import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postSlug = searchParams.get("postSlug");

    if (!postSlug) {
      return NextResponse.json(
        { success: false, message: "postSlug is required" },
        { status: 400 }
      );
    }

    // Fetch all approved comments for the given post slug
    const comments = await client.fetch(
      `
      *[_type == "comment" && postSlug == $postSlug && approved == true] | order(timestamp desc) {
        _id,
        author,
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
        comments: comments.map((comment: any) => ({
          id: comment._id,
          author: comment.author,
          content: comment.content,
          timestamp: comment.timestamp,
          approved: comment.approved,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch comments",
      },
      { status: 500 }
    );
  }
}
