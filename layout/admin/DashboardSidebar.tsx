"use client";

import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// import useLogout from "@/hooks/useLogout";
// import { useSession } from "@/lib/auth-context";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/swr/useFetch";
import { IProfile } from "@/types";
import { getUserNameInitials } from "@/utils";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { mainMenuItems, settingsItems } from "./menuitems";

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { data, isLoading, isError, refetch } = useFetch("/profile");

  const profileData: IProfile = data?.data || {};

  console.log(profileData);

  // const { session } = useSession();

  // const user = session?.user;

  // const { handleLogout } = useLogout();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Website logo"
              width={200}
              height={200}
              priority
              className="w-18"
            />

            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-primary font-semibold">
                  Admin Panel
                </span>
              </div>
            )}
          </div>
        </Link>
      </SidebarHeader>

      {/* Dashboard */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!isCollapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      href={item.url}
                      exact={item.url === "/admin-dashboard"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        size={20}
                        color="currentColor"
                        strokeWidth={1.5}
                        className="h-5 w-5 shrink-0"
                      />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!isCollapsed && "Settings"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      href={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        size={20}
                        color="currentColor"
                        strokeWidth={1.5}
                        className="h-5 w-5 shrink-0"
                      />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          ) : (
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={profileData?.profileImage} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getUserNameInitials(profileData?.name?.english || "")}
              </AvatarFallback>
            </Avatar>
          )}
          
          {!isCollapsed && (
            <>
              {isLoading ? (
                <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ) : (
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium text-sidebar-foreground">
                    {profileData?.name?.english}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {profileData?.specializedIn}
                  </span>
                </div>
              )}
            </>
          )}
          
          {!isCollapsed && (
            <button
              // onClick={handleLogout}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <HugeiconsIcon
                icon={Logout01Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4"
              />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}