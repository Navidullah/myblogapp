/*"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function CardList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blog");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <p className="p-6 text-muted-foreground">Loading blogs...</p>;
  if (blogs.length === 0)
    return <p className="p-6 text-muted-foreground">No blogs found.</p>;

  return (
    <div className="wrapper grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6 px-6">
      {blogs.map((blog) => (
        <Link
          key={blog._id}
          href={`/posts/${blog._id}`} // or slug if you have one
          className="border rounded-lg p-4 hover:shadow-lg transition bg-background"
        >
          <div className="relative w-full h-40 mb-4 rounded overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {blog.description}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Image
              src={blog.authorImage || "/default-avatar.png"}
              alt={blog.author}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <p className="text-xs text-muted-foreground">by {blog.author}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}*/
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default function CardList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const baseUrl = getBaseUrl();
        const res = await axios.get("/api/publicblogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <p className="p-6 text-muted-foreground">Loading blogs...</p>;
  if (blogs.length === 0)
    return <p className="p-6 text-muted-foreground">No blogs found.</p>;

  return (
    <div className="wrapper grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6 px-6">
      {blogs.map((blog) => (
        <Link
          key={blog._id}
          href={`/posts/${blog._id}`}
          className="border rounded-lg p-4 transition-shadow duration-300 bg-background hover:shadow-[0_0_20px_4px_rgba(139,92,246,0.6)]"
        >
          {/* Blog Image */}
          <div className="relative w-full h-40 mb-4 rounded overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover rounded"
            />
          </div>

          {/* Category badge */}
          <div className="mb-1">
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold mb-2">{blog.title}</h2>

          {/* Description */}
          <div
            className="text-sm text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* Author info */}
          <div className="flex items-center gap-2 mt-4">
            <Image
              src={blog.authorImage || "/default-avatar.png"}
              alt={blog.author}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <p className="text-xs text-muted-foreground">by {blog.author}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
