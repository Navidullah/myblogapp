"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

export default function CommentSection({ postId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchComments();
  }, [postId]);

  // Post comment
  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/comments", {
        postId,
        author: session?.user?.name || "Anonymous",
        authorImage: session?.user?.image || "/default-avatar.png",
        content: newComment.trim(),
      });

      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
      toast.success("Comment posted!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {session ? (
        <div className="space-y-2 mb-6">
          <Textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-6">
          Please sign in to post a comment.
        </p>
      )}

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="flex items-start gap-3">
              <Image
                src={c.authorImage || "/default-avatar.png"}
                alt={c.author}
                width={30}
                height={30}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{c.author}</p>
                <p className="text-sm text-muted-foreground">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      )}
    </div>
  );
}
