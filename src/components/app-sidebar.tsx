"use client";

import { useChat } from "@/context/chat-context";
import UserDropdown from "./sidebar/UserDropdown";
import Toolbar from "./sidebar/Toolbar";
import ChatHistory from "./sidebar/ChatHistory";

import { Sidebar, SidebarGroupContent } from "@/components/ui/sidebar";
import { SidebarHeader } from "@/components/ui/sidebar";
import FirstRowSidebar from "./sidebar/FirstRowSidebar";

export function AppSidebar() {
  const { setMessages } = useChat();

  return (
    <Sidebar>
      <SidebarHeader>
        <UserDropdown />
      </SidebarHeader>
      <SidebarGroupContent>
        <FirstRowSidebar />
        <Toolbar />
        <ChatHistory onSelectChat={setMessages} />
      </SidebarGroupContent>
    </Sidebar>
  );
}
