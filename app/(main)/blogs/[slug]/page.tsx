"use client";
import { useFetchById } from "@/hooks/swr/useFetchById";
import Image from "next/image";
import NextLink from "next/link";
import { use } from "react";

import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ResizeImage from "tiptap-extension-resize-image";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data, isLoading, isError } = useFetchById("/blog", slug);

  const blogDetail = data?.data || {};

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          {/* Thumbnail skeleton */}
          <div className="relative h-96 w-full bg-gray-200 rounded-lg mb-8"></div>

          {/* Date skeleton */}
          <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>

          {/* Title skeleton */}
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>

          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to load blog post
          </h3>
          <p className="text-gray-500 mb-4">
            The blog post you're looking for might have been removed
            or there was a network error.
          </p>
          <NextLink
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Blogs
          </NextLink>
        </div>
      </div>
    );
  }

  // No data found
  if (!blogDetail || Object.keys(blogDetail).length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Blog post not found
          </h3>
          <p className="text-gray-500 mb-4">
            The blog post you're looking for doesn't exist or has been
            removed.
          </p>
          <NextLink
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Blogs
          </NextLink>
        </div>
      </div>
    );
  }

  const html = generateHTML(blogDetail?.content, [
    StarterKit,

    Underline,

    Link,

    ResizeImage,

    Table,

    TableRow,

    TableHeader,

    TableCell,
  ]);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <NextLink
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all blogs
        </NextLink>
      </div>

      {/* Thumbnail */}
      {blogDetail.thumbnail && (
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={blogDetail.thumbnail}
            alt={blogDetail.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          />
        </div>
      )}

      {/* Blog header */}
      <header className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <time
            dateTime={blogDetail.publishedAt || blogDetail.createdAt}
          >
            {formatDate(
              blogDetail.publishedAt || blogDetail.createdAt,
            )}
          </time>

          {blogDetail.status && (
            <>
              <span className="mx-2">•</span>
              <span className="capitalize">{blogDetail.status}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {blogDetail.title}
        </h1>
      </header>

      {/* Content will be rendered here */}
      <div className="prose prose-lg prose-blue max-w-none">
        {/* Content rendering will be added here */}
        <article
        className="prose tiptap"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </div>
    </article>
  );
}
