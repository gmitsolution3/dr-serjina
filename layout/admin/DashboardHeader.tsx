"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import useLogout from "@/hooks/useLogout";
// import { useSession } from "@/lib/auth-context";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

export function DashboardHeader() {
  const [isDark, setIsDark] = useState(false);

  // const { session } = useSession();

  // const user = session?.user;

  // const { handleLogout } = useLogout();

  return (
    <header className="sticky top-0 z-50 flex h-19.5 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden">
          <HugeiconsIcon
            icon={Menu01Icon}
            size={20}
            color="currentColor"
            strokeWidth={1.5}
          />
        </SidebarTrigger>
        <SidebarTrigger className="hidden lg:flex" />
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative flex items-center gap-2 px-2"
            >
              <Avatar className="h-8 w-8">
                {/* <AvatarImage src={user?.image} /> */}
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {/* {getAvatarInitial(session)} */}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              // onClick={handleLogout}
              className="text-destructive"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
