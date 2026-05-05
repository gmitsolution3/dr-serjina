"use client";

import CreateExpertiesModal from "@/components/admin/experties/CreateExpertiesModal";
import ExpertiesActionCell from "@/components/admin/experties/ExpertiesActionCell";
import ExpertiesEmpty from "@/components/admin/experties/ExpertiesEmpty";
import ExpertiesError from "@/components/admin/experties/ExpertiesError";
import ExpertiesLoader from "@/components/admin/experties/ExpertiesLoader";
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
import { IExperties, IMeta } from "@/types";
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

export default function ExpertiesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading, isError, refetch } = useFetch(
    "/treatment-experties",
    {
      params: {
        page: page,
        limit: limit,
        sortBy: "createdAt",
        sortOrder: "asc",
      },
    },
  );

  
  const expertiesList: IExperties[] = data?.data.expertiesList || [];
  const meta: IMeta = data?.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  useEffect(() => {
    setPage(1);
  }, [globalFilter]);


  const filteredExperties = useMemo(
    () =>
      expertiesList.filter((experties) =>
        experties.name
          .toLowerCase()
          .includes(globalFilter.toLowerCase()),
      ),
    [expertiesList, globalFilter],
  );

  const columns: ColumnDef<IExperties>[] = [
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
        <ExpertiesActionCell experties={row.original} />
      ),
    },
  ];

  const table = useReactTable({
    data: filteredExperties,
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
    return <ExpertiesLoader />;
  }

  // Error state
  if (isError) {
    return <ExpertiesError refetch={refetch} />;
  }

  // Empty state
  if (expertiesList.length === 0) {
    return (
      <>
        <ExpertiesEmpty
          refetch={refetch}
          onOpenChange={setShowCreateModal}
        />
        <CreateExpertiesModal
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
                Experties Management
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
                  placeholder="Search Experties..."
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
                Create New Experties
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
                const experties = row.original;
                return (
                  <div
                    key={row.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
                  >
                    <div className="space-y-3">
                      {/* Name Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Name:
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">
                          {experties.name}
                        </span>
                      </div>

                      {/* Created At Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Created At:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatDate(experties.createdAt)}
                        </span>
                      </div>

                      {/* Actions Field */}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Actions:
                        </span>
                        <ExpertiesActionCell experties={experties} />
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
                experties
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

      <CreateExpertiesModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={refetch}
      />
    </>
  );
}
