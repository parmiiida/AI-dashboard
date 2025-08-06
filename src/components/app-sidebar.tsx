"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useChat } from "@/context/chat-context";
import ChatHistoryList from "@/components/ChatHistoryList";
import type { ChatHistoryItem } from "@/types/chat";
import UserDropdown from "./UserDropdown";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";

export function AppSidebar() {
  const { setMessages } = useChat();
  const supabase = createClientComponentClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<ChatHistoryItem[]>([]);

  // Menu items
  const items = [
    {
      title: "Home",
      url: userId ? `/dashboard/${userId}/tools/text-generator` : "#",
      icon: Home,
    },
    // {
    //   title: "Inbox",
    //   url: "#",
    //   icon: Inbox,
    // },
    // {
    //   title: "Calendar",
    //   url: "#",
    //   icon: Calendar,
    // },
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: Search,
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings,
    // },
  ];

  useEffect(() => {
    const getUserAndHistory = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userData?.user) {
        const id = userData.user.id;
        setUserId(id);

        try {
          const res = await fetch("/api/save-history/latest");
          const historyData: ChatHistoryItem[] = await res.json();
          setHistoryItems(historyData || []);
          console.log("Fetched historyData:", historyData); // <-- Add this
        } catch (error) {
          console.error("Error fetching history", error);
        }
      } else {
        console.error("User not found or not logged in", userError);
      }
    };

    getUserAndHistory();
  }, [supabase]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mb-26">
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

            <Separator />

            {historyItems.length > 0 && (
              <ChatHistoryList
                historyItems={historyItems}
                onSelectChat={setMessages}
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
