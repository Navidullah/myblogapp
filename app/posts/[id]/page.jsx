/*import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default async function SinglePostPage({ params }) {
  const { id } = params;

  let blog = null;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`
    );
    blog = res.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return notFound(); // Show 404 if not found
  }

  return (
    <div className="wrapper max-w-3xl  px-4 py-[150px]">
      <Image
        src={blog.image}
        alt={blog.title}
        width={800}
        height={400}
        className="w-full h-80 object-cover rounded mb-6"
      />

      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full capitalize mb-2 inline-block">
        {blog.category}
      </span>

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center gap-2 mb-6">
        <Image
          src={blog.authorImage || "/default-avatar.png"}
          alt={blog.author}
          width={30}
          height={30}
          className="rounded-full object-cover"
        />
        <p className="text-sm text-muted-foreground">by {blog.author}</p>
      </div>

      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
    </div>
  );
}
*/
// Server Component: SinglePostPage (app/posts/[id]/page.jsx)
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import CommentSection from "@/app/components/commentSection/CommentSection";
import dynamic from "next/dynamic";

// Dynamically import the client-only component
const CommentSection = dynamic(
  () => import("@/app/components/commentSection/CommentSection"),
  { ssr: false }
);

//import CommentSection from "@/components/CommentSection"; // client component

export default async function SinglePostPage({ params }) {
  const { id } = params;

  let blog = null;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`
    );
    blog = res.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return notFound();
  }

  return (
    <div className="wrapper max-w-3xl px-4 py-[150px]">
      <Image
        src={blog.image}
        alt={blog.title}
        width={800}
        height={400}
        className="w-full h-80 object-cover rounded mb-6"
      />

      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full capitalize mb-2 inline-block">
        {blog.category}
      </span>

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center gap-2 mb-6">
        <Image
          src={blog.authorImage || "/default-avatar.png"}
          alt={blog.author}
          width={30}
          height={30}
          className="rounded-full object-cover"
        />
        <p className="text-sm text-muted-foreground">by {blog.author}</p>
      </div>

      <article
        className="prose dark:prose-invert max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      <CommentSection postId={blog._id} />
    </div>
  );
}
