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
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import {
  mainMenuItems,
  settingsItems,
} from "./menuitems";

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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
                  Doctor Panel
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
          {/* <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={user?.image} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getUserNameInitials(session)}
            </AvatarFallback>
          </Avatar> */}
          {!isCollapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* <span className="truncate text-sm font-medium text-sidebar-foreground">
                {user?.name} test name
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user?.role} test name
              </span> */}
            </div>
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
