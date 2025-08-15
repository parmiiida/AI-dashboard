"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/app/hooks/useLogout";
import { SidebarMenuButton } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { User2, ChevronUp, ChevronDown } from "lucide-react";
import UserIcon from "../shared/UserIcon";
import { useUser } from "@/app/hooks/useUser";

export default function UserDropdown() {
  const user = useUser();
  if (!user) return null;
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <UserIcon />
          <span className="ml-2">
            {user.first_name} {user.last_name}
          </span>
          <ChevronDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <Separator className="" />
      <DropdownMenuContent
        side="top"
        className="w-62 z-50 shadow-lg"
        align="end"
      >
        <DropdownMenuItem>
          <UserIcon />
          <span className="text-xs text-gray-400">{user.email}</span>
        </DropdownMenuItem>

        <Separator className="mb-2" />
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
