import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import CommentModel from "@/lib/models/CommentModel";

export const GET = async (req, { params }) => {
  try {
    await ConnectDB();
    const comments = await CommentModel.find({ postId: params.postId }).sort({
      createdAt: -1,
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
