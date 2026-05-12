"use client";

import { useFetch } from "@/hooks/swr/useFetch";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogSkeletonGrid from "@/components/BlogLoader";

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);

  const { data, isLoading, isError, refetch } = useFetch("/blog", {
    params: {
      page: page,
      limit: limit,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  });

  const blogMeta = data?.data?.meta;
  const blogList = data?.data?.blogList;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mt-2 animate-pulse"></div>
        </div>
        <BlogSkeletonGrid />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load blogs</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPlainTextContent = (content: any) => {
    if (!content?.content) return "";
    
    const extractText = (nodes: any[]): string => {
      return nodes
        .map((node) => {
          if (node.type === "text") return node.text;
          if (node.content) return extractText(node.content);
          return "";
        })
        .join(" ");
    };
    
    const text = extractText(content.content);
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButtons = () => {
    if (!blogMeta) return null;

    const { page: currentPage, totalPage } = blogMeta;
    
    if (totalPage <= 1) return null;

    const buttons = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPage, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        Previous
      </button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="dots1" className="px-3 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-md transition-colors ${
            currentPage === i
              ? "bg-primary text-white"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        buttons.push(
          <span key="dots2" className="px-3 py-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPage}
          onClick={() => handlePageChange(totalPage)}
          className="px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors"
        >
          {totalPage}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === totalPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        }`}
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        {blogMeta && (
          <p className="mt-2 text-gray-600">
            Showing {blogList?.length || 0} of {blogMeta.total} posts
          </p>
        )}
      </div>

      {blogList && blogList.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogList.map((blog: any) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog.slug}`}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 w-full bg-gray-200">
                  {blog.thumbnail ? (
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={blogList.indexOf(blog) < 3} // Priority for first 3 images
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time dateTime={blog.publishedAt}>
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </time>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {getPlainTextContent(blog.content)}
                  </p>
                  <div className="mt-4">
                    <span className="text-blue-600 group-hover:text-blue-700 font-medium">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {blogMeta && blogMeta.totalPage > 1 && (
            <div className="mt-12">
              <div className="flex justify-center items-center space-x-2">
                {renderPaginationButtons()}
              </div>
              <div className="text-center mt-4 text-sm text-gray-500">
                Page {blogMeta.page} of {blogMeta.totalPage}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No blog posts found.</p>
        </div>
      )}
    </div>
  );
}