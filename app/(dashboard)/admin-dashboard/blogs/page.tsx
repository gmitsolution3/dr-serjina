"use client";

import BlogActionCell from "@/components/admin/blog/BlogActionCell";
import BlogEmpty from "@/components/admin/blog/BlogEmpty";
import BlogError from "@/components/admin/blog/BlogError";
import BlogLoader from "@/components/admin/blog/BlogLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/swr/useFetch";
import { IBlog, IMeta } from "@/types";
import { formatDate } from "@/utils";
import {
  ArrowDownIcon,
  ArrowLeft02Icon,
  ArrowLeftDoubleIcon,
  ArrowRight02Icon,
  ArrowRightDoubleIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  PlusSignIcon,
  Refresh04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading, isError, refetch } = useFetch(
    "/blog",
    {
      params: {
        page: page,
        limit: limit,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
  );

  const blogList: IBlog[] = data?.data?.blogList || [];
  const meta: IMeta = data?.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  useEffect(() => {
    setPage(1);
  }, [globalFilter]);

  const filteredBlogs = useMemo(
    () =>
      blogList.filter((blog) =>
        blog.title
          .toLowerCase()
          .includes(globalFilter.toLowerCase()),
      ),
    [blogList, globalFilter],
  );

  const columns: ColumnDef<IBlog>[] = [
    {
      id: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => {
        const thumbnail = row.original.thumbnail;
        return (
          <div className="relative w-12 h-12 rounded-md overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={row.original.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">No img</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="p-0 hover:bg-transparent"
          >
            Title
            {column.getIsSorted() === "asc" ? (
              <HugeiconsIcon
                icon={ArrowUpIcon}
                className="ml-2 h-4 w-4"
              />
            ) : column.getIsSorted() === "desc" ? (
              <HugeiconsIcon
                icon={ArrowDownIcon}
                className="ml-2 h-4 w-4"
              />
            ) : (
              <HugeiconsIcon
                icon={ArrowUpDownIcon}
                className="ml-2 h-4 w-4"
              />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${
            status === "published" 
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
          }`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "publishedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="p-0 hover:bg-transparent"
          >
            Published Date
            {column.getIsSorted() === "asc" ? (
              <HugeiconsIcon
                icon={ArrowUpIcon}
                className="ml-2 h-4 w-4"
              />
            ) : column.getIsSorted() === "desc" ? (
              <HugeiconsIcon
                icon={ArrowDownIcon}
                className="ml-2 h-4 w-4"
              />
            ) : (
              <HugeiconsIcon
                icon={ArrowUpDownIcon}
                className="ml-2 h-4 w-4"
              />
            )}
          </Button>
        );
      },
      cell: ({ row }) => row.original.publishedAt ? formatDate(row.original.publishedAt) : "-",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="p-0 hover:bg-transparent"
          >
            Created At
            {column.getIsSorted() === "asc" ? (
              <HugeiconsIcon
                icon={ArrowUpIcon}
                className="ml-2 h-4 w-4"
              />
            ) : column.getIsSorted() === "desc" ? (
              <HugeiconsIcon
                icon={ArrowDownIcon}
                className="ml-2 h-4 w-4"
              />
            ) : (
              <HugeiconsIcon
                icon={ArrowUpDownIcon}
                className="ml-2 h-4 w-4"
              />
            )}
          </Button>
        );
      },
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <BlogActionCell blog={row.original} />
      ),
    },
  ];

  const table = useReactTable({
    data: filteredBlogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Loading state
  if (isLoading) {
    return <BlogLoader />;
  }

  // Error state
  if (isError) {
    return <BlogError refetch={refetch} />;
  }

  // Empty state
  if (blogList.length === 0) {
    return (
      <BlogEmpty
        refetch={refetch}
      />
    );
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-2xl">
                Blog Management
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <HugeiconsIcon
                    icon={Refresh04Icon}
                    className="h-4 w-4"
                  />
                  Refresh
                </Button>
                <Button asChild className="gap-2">
                  <Link href="/admin-dashboard/blogs/new">
                    <HugeiconsIcon
                      icon={PlusSignIcon}
                      className="h-4 w-4"
                    />
                    Write New Blog
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search blogs by title..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-full p-5"
                />
              </div>
            </div>

            {/* Desktop Table View - Hidden on mobile */}
            <div className="hidden md:block rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View - Visible only on mobile */}
            <div className="md:hidden space-y-4">
              {table.getRowModel().rows.map((row) => {
                const blog = row.original;
                return (
                  <div
                    key={row.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
                  >
                    <div className="space-y-3">
                      {/* Thumbnail */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Thumbnail:
                        </span>
                        <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                          {blog.thumbnail ? (
                            <Image
                              src={blog.thumbnail}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                No image
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Title:
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">
                          {blog.title}
                        </span>
                      </div>

                      {/* Slug Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Slug:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white text-right break-all">
                          {blog.slug}
                        </span>
                      </div>

                      {/* Status Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </span>
                        <span className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${
                          blog.status === "published" 
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                          {blog.status}
                        </span>
                      </div>

                      {/* Published Date Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Published Date:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {blog.publishedAt ? formatDate(blog.publishedAt) : "-"}
                        </span>
                      </div>

                      {/* Created At Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Created At:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatDate(blog.createdAt)}
                        </span>
                      </div>

                      {/* Actions Field */}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Actions:
                        </span>
                        <BlogActionCell blog={blog} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Server-side Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, meta.total)} of {meta.total}{" "}
                blogs
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                >
                  <HugeiconsIcon
                    icon={ArrowLeftDoubleIcon}
                    className="h-4 w-4"
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <HugeiconsIcon
                    icon={ArrowLeft02Icon}
                    className="h-4 w-4"
                  />
                </Button>
                <span className="text-sm whitespace-nowrap">
                  Page {page} of {meta.totalPage}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === meta.totalPage}
                >
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    className="h-4 w-4"
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(meta.totalPage)}
                  disabled={page === meta.totalPage}
                >
                  <HugeiconsIcon
                    icon={ArrowRightDoubleIcon}
                    className="h-4 w-4"
                  />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}