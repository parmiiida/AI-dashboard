import React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useState } from "react";

import { Home } from "lucide-react";
import { Image, ShoppingBag, Hash } from "lucide-react";
import { BrushCleaning } from "lucide-react";

const Toolbar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const items = [
    {
      title: "Background Remover",
      url: userId ? `/dashboard/${userId}/tools/text-generator` : "#",
      icon: BrushCleaning,
    },
    // {
    //   title: "Product Description Generator",
    //   url: userId ? `/dashboard/${userId}/tools/text-generator` : "#",
    //   icon: Image,
    // },
    // {
    //   title: "Ad Copy Generator",
    //   url: userId ? `/dashboard/${userId}/tools/text-generator` : "#",
    //   icon: ShoppingBag,
    // },
    // {
    //   title: "Image Enhancer",
    //   url: userId ? `/dashboard/${userId}/tools/text-generator` : "#",
    //   icon: Image,
    // },
    // {
    //   title: "Hashtag Generator",
    //   url: userId ? `/dashboard/${userId}/tools/text-generator` : "#",
    //   icon: Hash,
    // },
  ];
  return (
    <SidebarMenu className="mb-10">
      <SidebarGroupLabel>Tools</SidebarGroupLabel>
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

export default Toolbar;
