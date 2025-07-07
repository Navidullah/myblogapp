"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
//import { getBaseUrl } from "@/utils/getBaseUrl";

export default function UserPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        //const baseUrl = getBaseUrl();
        //console.log(baseUrl);
        const res = await axios.get("/api/blog"); // updated route
        if (res.status === 200) {
          setPosts(res.data);
        } else {
          setError("Failed to load posts.");
        }
      } catch (err) {
        console.error("Error fetching user posts:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (posts.length === 0) return <p className="p-6">No posts yet.</p>;

  return (
    <div className="wrapper px-4 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post._id} className="border rounded-lg p-4 bg-background">
          <div className="relative w-full h-40 mb-4 rounded overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <h2 className="text-lg font-bold mb-2">{post.title}</h2>
          <p
            className="text-sm text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />

          <Link
            href={`/posts/${post._id}`}
            className="mt-3 inline-block text-primary hover:underline text-sm"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
