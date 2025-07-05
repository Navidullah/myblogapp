/*"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { app } from "@/utils/firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Dynamically import TiptapEditor
const TiptapEditor = dynamic(
  () => import("@/app/components/tiptap/TiptapEditor"),
  {
    ssr: false,
  }
);

export default function WritePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("style");

  useEffect(() => {
    if (file) {
      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => console.error(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    }
  }, [file]);

 
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    try {
      if (!session || !session.user) {
        alert("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", value);
      formData.append("category", catSlug);
      formData.append("author", session.user.name || "Anonymous");
      formData.append("image", file);
      formData.append(
        "authorImage",
        session.user.image || "/default-avatar.png"
      );

      const res = await axios.post("/api/blog", formData);

      if (res.status === 200) {
        alert("Blog posted successfully ✅");
        router.push("/dashboard"); // or wherever you'd like
      }
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
      alert("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Write New Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="style" onValueChange={setCatSlug}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="style">Style</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
              </SelectContent>
            </Select>
          </div>

      
          <div className="space-y-2">
            <Label htmlFor="media">Upload Image</Label>
            <Input
              id="media"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {media && (
              <Image
                src={media}
                alt="Uploaded"
                width={200}
                height={120}
                className="rounded-md"
              />
            )}
          </div>

        
          <div>
            <Label>Content</Label>
            <TiptapEditor content={value} onChange={setValue} />
          </div>

          
          <Button onClick={handleSubmit}>Publish</Button>
        </CardContent>
      </Card>
    </div>
  );
}
*/
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

// ShadCN UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Firebase
import { app } from "@/utils/firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Tiptap
const TiptapEditor = dynamic(
  () => import("@/app/components/tiptap/TiptapEditor"),
  { ssr: false }
);

export default function WritePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("style");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (file) {
      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => console.error(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    }
  }, [file]);

  const handleSubmit = async () => {
    if (!session || !session.user) {
      toast.error("You must be logged in to publish a post.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", value);
      formData.append("category", catSlug);
      formData.append("author", session.user.name || "Anonymous");
      formData.append("authorEmail", session.user.email || "");
      formData.append("date", new Date().toISOString());
      formData.append("image", file);
      formData.append(
        "authorImage",
        session.user.image || "/default-avatar.png"
      );

      const res = await axios.post("/api/blog", formData);

      if (res.status === 200) {
        toast.success("Blog posted successfully ✅");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Write New Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="style" onValueChange={setCatSlug}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="style">Style</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Upload Media */}
          <div className="space-y-2">
            <Label htmlFor="media">Upload Image</Label>
            <Input
              id="media"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {media && (
              <Image
                src={media}
                alt="Uploaded"
                width={200}
                height={120}
                className="rounded-md"
              />
            )}
          </div>

          {/* Tiptap Editor */}
          <div>
            <Label>Content</Label>
            <TiptapEditor content={value} onChange={setValue} />
          </div>

          {/* Publish Button */}
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Publishing...
              </span>
            ) : (
              "Publish"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
