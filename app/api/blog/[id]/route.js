/*/ /app/api/blog/[id]/route.js
import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
//import Blog from "@/models/Blog";
import BlogModel from "@/lib/models/BlogModel";

export const GET = async (req, { params }) => {
  await ConnectDB();
  const { id } = params;

  try {
    const blog = await BlogModel.findById(id);
    return NextResponse.json(BlogModel, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
};*/
import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel"; // adjust this path if needed
export const GET = async (req, { params }) => {
  try {
    await ConnectDB();
    const blog = await BlogModel.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
