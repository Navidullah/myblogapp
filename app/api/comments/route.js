import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import CommentModel from "@/lib/models/CommentModel";

export const POST = async (req) => {
  try {
    await ConnectDB();
    const body = await req.json();

    const { postId, author, authorImage, content } = body;

    if (!postId || !author || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = new CommentModel({
      postId,
      author,
      authorImage,
      content,
      createdAt: new Date(),
    });

    await comment.save();

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error("Error creating comment:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
