// app/components/commentSection/ClientCommentWrapper.jsx
"use client";

import CommentSection from "./CommentSection";

//import dynamic from "next/dynamic";

// Dynamically import the client-only component
/*const CommentSection = dynamic(() => import("./CommentSection"), {
  ssr: false,
});*/

export default function ClientCommentWrapper({ postId }) {
  return <CommentSection postId={postId} />;
}
