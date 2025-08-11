import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Clock } from "lucide-react";
import type { Message, ChatHistoryItem } from "@/types/chat";

export default function ChatHistoryList({
  historyItems,
  onSelectChat,
}: {
  historyItems: ChatHistoryItem[];
  onSelectChat: (messages: Message[]) => void;
}) {
  return (
    <>
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarMenu>
        {historyItems.map((history) => (
          <SidebarMenuItem key={history.session_id}>
            <SidebarMenuButton
              asChild
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const res = await fetch(
                    `/api/save-history/by-session?session_id=${history.session_id}`
                  );
                  const messages = await res.json();
                  onSelectChat(messages);
                } catch (error) {
                  console.error("Failed to load chat messages", error);
                }
              }}
            >
              <button className="flex items-center w-full text-left">
                <Clock />
                <span className="ml-2 truncate">
                  {history.title ||
                    history.messages?.[0]?.content?.slice(0, 30) ||
                    "Untitled Chat"}
                </span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}
