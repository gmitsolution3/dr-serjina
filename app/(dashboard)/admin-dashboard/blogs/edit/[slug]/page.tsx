"use client";

import Editor from "@/components/editor/editor";
import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchById } from "@/hooks/swr/useFetchById";
import { usePatch } from "@/hooks/swr/usePatch";
import { notify } from "@/utils/notify";
import {
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  MessageSquareCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { mutate } from "swr";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailPublicId, setThumbnailPublicId] = useState("");
  const [content, setContent] = useState({});
  const [isClient, setIsClient] = useState(false);

  const { slug: blogSlug } = use(params);

  const { data, isLoading: isBlogDetailLoading } = useFetchById(
    "/blog",
    blogSlug,
  );

  const { mutate: updateBlog, isLoading: isUpdating } =
    usePatch("/blog");

  const blogDetail = data?.data || {};

  // Prefill data when blogDetail is loaded
  useEffect(() => {
    if (blogDetail && Object.keys(blogDetail).length > 0) {
      setTitle(blogDetail.title || "");
      setSlug(blogDetail.slug || "");
      setThumbnail(blogDetail.thumbnail || "");
      setContent(blogDetail.content || {});
    }
  }, [blogDetail]);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const onUpdateBlog = async () => {
    try {
      const payload = {
        title,
        slug,
        thumbnail,
        content,
      };

      const res = await updateBlog({
        id: blogSlug,
        data: payload,
      });

      if (res.success) {
        notify.success(res.message);

        mutate(
          (key) => {
            if (Array.isArray(key)) {
              return (
                typeof key[0] === "string" &&
                key[0].startsWith("/blog")
              );
            }
            return (
              typeof key === "string" &&
              key.startsWith("/blog")
            );
          },
          undefined,
          { revalidate: true },
        );

        router.push("/admin-dashboard/blogs");
      }
    } catch (error: any) {
      notify.error(error.message);
    }
  };

  const hasContent =
    title || slug || thumbnail || Object.keys(content).length > 0;

  if (isBlogDetailLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header with actions */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                Edit Blog Post
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Write, edit, and publish your content
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled={isUpdating} onClick={onUpdateBlog}>
                {isUpdating ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Updating...
                  </>
                ) : (
                  <>
                    <MessageSquareCheck size={16} />
                    Update
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress indicator */}
          {isClient && hasContent && (
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
              {title && (
                <span className="flex items-center gap-1">
                  <FileText size={14} /> Title set
                </span>
              )}
              {thumbnail && (
                <span className="flex items-center gap-1">
                  <ImageIcon size={14} /> Thumbnail added
                </span>
              )}
              {slug && (
                <span className="flex items-center gap-1">
                  <LinkIcon size={14} /> Slug ready
                </span>
              )}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          {/* Title Input Section */}
          <div>
            <div className="space-y-4">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide"
              >
                Blog Title
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter an engaging title..."
                className="!text-lg font-medium p-6"
              />
              {slug && (
                <div className="flex items-center gap-2 text-sm bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-lg">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Permalink:
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    /blog/{slug}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Upload Section */}
          <div>
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Thumbnail Image
              </label>
              <div className="">
                <ImageUploader
                  value={thumbnail}
                  imagePublicId={thumbnailPublicId}
                  onChange={handleThumbnailChange}
                />
              </div>
              {thumbnail && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ✓ Thumbnail uploaded successfully
                </p>
              )}
            </div>
          </div>

          {/* Editor Section */}
          <div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Content Editor
              </h3>

              <div>
                <Editor
                  onTitleChange={setTitle}
                  onSlugChange={setSlug}
                  onThumbnailChange={setThumbnail}
                  onContentChange={setContent}
                  initialContent={blogDetail.content}
                  isEditMode={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Draft Info Banner */}
        {isClient && (
          <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
            <p>
              Your draft is automatically saved in your browser's
              local storage
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
