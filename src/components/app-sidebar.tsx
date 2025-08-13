"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useChat } from "@/context/chat-context";
import ChatHistoryList from "@/components/ChatHistoryList";
import type { ChatHistoryItem } from "@/types/chat";
import UserDropdown from "./sidebar/UserDropdown";
import Toolbar from "./sidebar/Toolbar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
        <UserDropdown />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem>Home</SidebarMenuItem>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>

            <Toolbar />
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
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
