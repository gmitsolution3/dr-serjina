"use client";

import Editor from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { notify } from "@/utils/notify";
import { useState } from "react";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState({});

  // Slugify function
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(slugify(newTitle));
  };

  const saveAsDraft = () => {
    localStorage.setItem(
      "blog-draft",
      JSON.stringify({ title, slug, thumbnail, content }),
    );

    notify.success("Saved blog as draft");
  };

  const clearDraft = () => {
    localStorage.removeItem("blog-draft");

    notify.success("Removed blog from draft");
  };

  console.log({title});
  console.log({slug});
  console.log({content});
  console.log({thumbnail});

  return (
    <div>
      <h3>NewBlogPage</h3>

      <div className="flex items-center justify-end gap-5 mb-6">
        <Button>Publish</Button>
        <Button onClick={saveAsDraft}>Save as draft</Button>
        <Button onClick={clearDraft}>clear draft</Button>
      </div>

      {/* Title Input Section */}
      <div className="mb-6 space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter blog title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {slug && (
          <div className="text-sm text-gray-500">
            Slug: <span className="font-mono">{slug}</span>
          </div>
        )}
      </div>

      <Editor
        onTitleChange={setTitle}
        onSlugChange={setSlug}
        onThumbnailChange={setThumbnail}
        onContentChange={setContent}
      />
    </div>
  );
}
