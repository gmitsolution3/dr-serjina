"use client";

import AppointmentActionCell from "@/components/admin/appointments/AppointmentActionCell";
import AppointmentEmpty from "@/components/admin/appointments/AppointmentEmpty";
import AppointmentError from "@/components/admin/appointments/AppointmentError";
import AppointmentLoader from "@/components/admin/appointments/AppointmentLoader";
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
import { IAppointment, IMeta } from "@/types";
import { formatDate } from "@/utils";
import {
  ArrowDownIcon,
  ArrowLeft02Icon,
  ArrowLeftDoubleIcon,
  ArrowRight02Icon,
  ArrowRightDoubleIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
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

export default function AppointmentPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading, isError, refetch } = useFetch(
    "/appointment",
    {
      params: {
        page: page,
        limit: limit,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
  );

  const appointmentList: IAppointment[] = data?.data.appointmentList || [];
  const meta: IMeta = data?.data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  useEffect(() => {
    setPage(1);
  }, [globalFilter]);

  const filteredAppointments = useMemo(
    () =>
      appointmentList.filter((appointment) =>
        appointment.name
          .toLowerCase()
          .includes(globalFilter.toLowerCase()) ||
        appointment.email
          .toLowerCase()
          .includes(globalFilter.toLowerCase()) ||
        appointment.phone
          .toLowerCase()
          .includes(globalFilter.toLowerCase())
      ),
    [appointmentList, globalFilter],
  );

  const columns: ColumnDef<IAppointment>[] = [
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
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "consultancyMethod",
      header: "Method",
      cell: ({ row }) => {
        const method = row.original.consultancyMethod;
        return (
          <span className={`capitalize ${
            method === "online" 
              ? "text-blue-600 dark:text-blue-400" 
              : "text-green-600 dark:text-green-400"
          }`}>
            {method}
          </span>
        );
      },
    },
    {
      accessorKey: "appointmentDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className="p-0 hover:bg-transparent"
          >
            Appointment Date
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
      cell: ({ row }) => formatDate(row.original.appointmentDate),
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
            Booked On
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
        <AppointmentActionCell appointment={row.original} />
      ),
    },
  ];

  const table = useReactTable({
    data: filteredAppointments,
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
    return <AppointmentLoader />;
  }

  // Error state
  if (isError) {
    return <AppointmentError refetch={refetch} />;
  }

  // Empty state
  if (appointmentList.length === 0) {
    return (
      <AppointmentEmpty
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
                Appointment Management
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
            {/* Search Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email or phone..."
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
                const appointment = row.original;
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
                          {appointment.name}
                        </span>
                      </div>

                      {/* Email Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Email:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white text-right break-all">
                          {appointment.email}
                        </span>
                      </div>

                      {/* Phone Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Phone:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {appointment.phone}
                        </span>
                      </div>

                      {/* Consultancy Method Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Method:
                        </span>
                        <span className={`text-sm capitalize ${
                          appointment.consultancyMethod === "online" 
                            ? "text-blue-600 dark:text-blue-400" 
                            : "text-green-600 dark:text-green-400"
                        }`}>
                          {appointment.consultancyMethod}
                        </span>
                      </div>

                      {/* Appointment Date Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Appointment Date:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatDate(appointment.appointmentDate)}
                        </span>
                      </div>

                      {/* Booked On Field */}
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Booked On:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatDate(appointment.createdAt)}
                        </span>
                      </div>

                      {/* Actions Field */}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Actions:
                        </span>
                        <AppointmentActionCell appointment={appointment} />
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
                appointments
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