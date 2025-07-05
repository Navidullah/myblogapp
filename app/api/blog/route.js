import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";

const { NextResponse } = require("next/server");
import { auth } from "@/utils/auth.js"; // wherever your auth.js is

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();
/*export async function GET() {
  try {
    await ConnectDB();
    const blogs = await BlogModel.find().sort({ date: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}*/
export async function GET(req) {
  const session = await auth(); // ✅ new way to get the session

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await BlogModel.find({
      authorEmail: session.user.email,
    }).sort({ date: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const timestamp = Date.now();
    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      image: `${imgUrl}`,
      authorImage: `${formData.get("authorImage")}`,
      authorEmail: `${formData.get("authorEmail")}`,
      date: `${formData.get("date")}` || new Date().toISOString(),
    };

    await BlogModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog added" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
