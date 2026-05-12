"use client";

import Editor from "@/components/editor/editor";
import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/swr/usePost";
import { notify } from "@/utils/notify";
import {
  Loader2,
  MessageSquareCheck,
  Save,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailPublicId, setThumbnailPublicId] = useState("");
  const [content, setContent] = useState({});

  //todo: change the revalidate key here
  const { mutate: postBlog, isLoading } = usePost("/blog", {
    revalidateKey: "/something",
  });

  const router = useRouter();

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

  // Handle thumbnail upload
  const handleThumbnailChange = (url: string, public_id: string) => {
    setThumbnail(url);
    setThumbnailPublicId(public_id);
  };

  const saveAsDraft = () => {
    localStorage.setItem(
      "blog-draft",
      JSON.stringify({
        title,
        slug,
        thumbnail,
        thumbnailPublicId,
        content,
      }),
    );

    notify.success("Saved blog as draft");
  };

  const clearDraft = (showMsg: boolean) => {
    localStorage.removeItem("blog-draft");
    setTitle("");
    setSlug("");
    setThumbnail("");
    setThumbnailPublicId("");
    setContent({});

    if (showMsg) {
      notify.success("Removed blog from draft");
    }
  };

  const publishBlog = async () => {
    try {
      const payload = {
        title,
        slug,
        thumbnail,
        content,
      };

      const res = await postBlog(payload);

      if (res.success) {
        console.log("hi");
        notify.success(res.message);

        clearDraft(false);

        router.push("/admin-dashboard/blogs");
      }
    } catch (error: any) {
      notify.error(error.message);
    }
  };

  return (
    <div>
      <h3>NewBlogPage</h3>

      <div className="flex items-center justify-end gap-5 mb-6">
        <Button disabled={isLoading} onClick={publishBlog}>
          {isLoading ? (
            <>
              <Loader2 className="animation-spin" /> Publishing{" "}
            </>
          ) : (
            <>
              <MessageSquareCheck size={16} /> Publish
            </>
          )}
        </Button>
        <Button onClick={saveAsDraft}>
          <Save size={16} /> Save Draft
        </Button>
        <Button onClick={() => clearDraft(true)}>
          <Trash size={16} /> Clear Draft
        </Button>
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

      {/* Thumbnail Upload Section */}
      <div className="mb-6 space-y-2">
        <label className="block text-sm font-medium">
          Thumbnail Image
        </label>
        <ImageUploader
          value={thumbnail}
          imagePublicId={thumbnailPublicId}
          onChange={handleThumbnailChange}
        />
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
