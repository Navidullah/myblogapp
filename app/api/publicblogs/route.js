import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const blogs = await BlogModel.find().sort({ date: -1 }); // Get all blogs
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
