"use client";
import React from "react";
import { useState } from "react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { Home, GlassesIcon, Glasses } from "lucide-react";

const FirstRowSidebar = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const items = [
    {
      title: "Home",
      url: userId ? `/dashboard/${userId}/tools/text-generator` : "#",
      icon: Home,
    },
    {
      title: "Assets",
      url: userId ? `/dashboard/${userId}/tools/text-generator` : "#",
      icon: Glasses,
    },
  ];
  return (
    <SidebarMenu className="mb-10">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default FirstRowSidebar;
