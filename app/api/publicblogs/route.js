import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

await ConnectDB();

export async function GET() {
  try {
    const blogs = await BlogModel.find().sort({ date: -1 }); // Get all blogs
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
