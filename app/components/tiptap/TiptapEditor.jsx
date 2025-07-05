"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

export default function TiptapEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      Link.configure({ openOnClick: false }),
      Image,
      Blockquote,
      Heading.configure({ levels: [1, 2, 3] }),
      Highlight,
      Placeholder.configure({ placeholder: "Write your story..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-h-[300px] max-w-none p-4 border border-gray-700 rounded-md focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex gap-2 bg-background border rounded-md p-2 shadow">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "font-bold text-primary" : ""}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "italic text-primary" : ""}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline") ? "underline text-primary" : ""
            }
          >
            U
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike") ? "line-through text-primary" : ""
            }
          >
            S
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "text-primary" : ""}
          >
            {"< />"}
          </button>
        </div>
      </BubbleMenu>

      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex gap-2 bg-background border rounded-md p-2 shadow">
          <button onClick={() => editor.chain().focus().setParagraph().run()}>
            P
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            &ldquo;
          </button>
        </div>
      </FloatingMenu>

      <EditorContent editor={editor} />
    </div>
  );
}
