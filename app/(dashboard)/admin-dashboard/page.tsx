"use client";

import { useFetch } from "@/hooks/swr/useFetch";
import { formatDate } from "@/utils";
import {
  AiPhoneIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClipboardIcon,
  DollarIcon,
  FileXIcon,
  MessageCancelIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  change?: string;
  changeType?: "increase" | "decrease";
  color?: string;
}

function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${color} p-4 rounded-xl`}>
          <HugeiconsIcon
            icon={icon}
            size={48}
            color="white"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
  icon: any;
  color?: string;
}

function QuickAction({
  title,
  description,
  href,
  icon,
  color = "text-blue-600",
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 flex items-center gap-4"
    >
      <div className={`${color}`}>
        <HugeiconsIcon icon={icon} size={40} strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <HugeiconsIcon
        icon={ArrowRightIcon}
        size={20}
        className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
      />
    </Link>
  );
}

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useFetch(
    "/dashboard-analytics",
  );

  const analyticData = data?.data || {};

  const stats = [
    {
      title: "",
      value: "856",
      icon: UserIcon,
      change: "8%",
      changeType: "increase" as const,
      color: "",
    },
    {
      title: "Upcoming Appointment",
      value: "45,678",
      icon: DollarIcon,
      change: "5%",
      changeType: "increase" as const,
      color: "",
    },
    {
      title: "Total Services",
      value: "1,234",
      icon: ClipboardIcon,
      change: "5%",
      changeType: "increase" as const,
      color: "",
    },
  ];

  const quickActions = [
    {
      title: "All Appointments",
      description: "View all place appointments",
      href: "/admin-dashboard/appointments",
      icon: CalendarIcon,
      color: "text-blue-600",
    },
    {
      title: "All Experties",
      description: "View and manage all experties",
      href: "/admin-dashboard/experties",
      icon: UserIcon,
      color: "text-green-600",
    },
    {
      title: "All Services",
      description: "View and manage all experties",
      href: "/admin-dashboard/services",
      icon: MessageCancelIcon,
      color: "text-purple-600",
    },
    {
      title: "Manage Profile",
      description: "Change or view profile info",
      href: "/admin-dashboard/profile",
      icon: FileXIcon,
      color: "text-red-600",
    },
    {
      title: "Update password",
      description: "Update your password from settings",
      href: "/admin-dashboard/settings",
      icon: AiPhoneIcon,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Appointments"
            value={analyticData.totalAppointments}
            icon={CalendarIcon}
            color="bg-blue-500"
          />

          <StatCard
            title="Todays Appointments"
            value={analyticData.todaysAppointments}
            icon={CalendarIcon}
            color="bg-green-500"
          />

          <StatCard
            title="Upcoming Appointments"
            value={analyticData.upcomingAppointments}
            icon={CalendarIcon}
            color="bg-purple-500"
          />

          <StatCard
            title="Total Service"
            value={analyticData.totalService}
            icon={CalendarIcon}
            color="bg-orange-500"
          />
        </div>

        {/* Quick Actions and Recent Activity Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions Section - Vertical List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Actions
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Common tasks and shortcuts
                </p>
              </div>
            </div>

            {/* Vertical Quick Actions List */}
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <QuickAction key={index} {...action} />
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Latest updates and notifications
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-4">
                {analyticData?.recentActivities?.length > 0 ? (
                  analyticData?.recentActivities?.map(
                  (data: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {data.name} Booked an appointment
                          </p>
                          <p className="text-xs text-gray-500">
                            Today at{" "}
                            {formatDate(data.appointmentDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                )
                ) : <p>No Activities registered yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
