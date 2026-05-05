"use client";

import CreateServiceModal from "@/components/admin/service/CreateServiceModal";
import ServiceActionCell from "@/components/admin/service/ServiceActionCell";
import ServiceEmpty from "@/components/admin/service/ServiceEmpty";
import ServiceError from "@/components/admin/service/ServiceError";
import ServiceLoader from "@/components/admin/service/ServiceLoader";
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
import { IService, IMeta } from "@/types";
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
import Image from "next/image";

export default function ServicePage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading, isError, refetch } = useFetch(
    "/treatment-service",
    {
      params: {
        page: page,
        limit: limit,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
  );

  const serviceList: IService[] = data?.data.serviceList || [];
  const meta: IMeta = data?.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  useEffect(() => {
    setPage(1);
  }, [globalFilter]);

  const filteredServices = useMemo(
    () =>
      serviceList.filter((service) =>
        service.name
          .toLowerCase()
          .includes(globalFilter.toLowerCase()),
      ),
    [serviceList, globalFilter],
  );

  const columns: ColumnDef<IService>[] = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.imageUrl;
        return (
          <div className="relative w-12 h-12 rounded-md overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={row.original.name}
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="p-0 hover:bg-transparent"
          >
            Name
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
        <ServiceActionCell service={row.original} />
      ),
    },
  ];

  const table = useReactTable({
    data: filteredServices,
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
    return <ServiceLoader />;
  }

  // Error state
  if (isError) {
    return <ServiceError refetch={refetch} />;
  }

  // Empty state
  if (serviceList.length === 0) {
    return (
      <>
        <ServiceEmpty
          refetch={refetch}
          onOpenChange={setShowCreateModal}
        />
        <CreateServiceModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={refetch}
        />
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-2xl">
                Service Management
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Create Button Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search Service..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-full p-5"
                />
              </div>
              <Button
                className="gap-2 p-5"
                onClick={() => setShowCreateModal(true)}
              >
                <HugeiconsIcon
                  icon={PlusSignIcon}
                  className="h-4 w-4"
                />
                Create New Service
              </Button>
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
                const service = row.original;
                return (
                  <div
                    key={row.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
                  >
                    <div className="space-y-3">
                      {/* Image Preview */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Image:
                        </span>
                        <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                          {service.imageUrl ? (
                            <Image
                              src={service.imageUrl}
                              alt={service.name}
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

                      {/* Name Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Name:
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">
                          {service.name}
                        </span>
                      </div>

                      {/* Created At Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Created At:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatDate(service.createdAt)}
                        </span>
                      </div>

                      {/* Actions Field */}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Actions:
                        </span>
                        <ServiceActionCell service={service} />
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
                services
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

      <CreateServiceModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={refetch}
      />
    </>
  );
}