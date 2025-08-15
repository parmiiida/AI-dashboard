"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ChatHistoryList from "@/components/ChatHistoryList";
import type { ChatHistoryItem } from "@/types/chat";

interface ChatHistoryProps {
  onSelectChat: (messages: any) => void;
}

export default function ChatHistory({ onSelectChat }: ChatHistoryProps) {
  const supabase = createClientComponentClient();
  const [historyItems, setHistoryItems] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        try {
          const res = await fetch("/api/save-history/latest");
          const historyData: ChatHistoryItem[] = await res.json();
          setHistoryItems(historyData || []);
        } catch (error) {
          console.error("Error fetching history", error);
        }
      }
    };
    fetchHistory();
  }, [supabase]);

  if (!historyItems.length) return null;

  return (
    <ChatHistoryList historyItems={historyItems} onSelectChat={onSelectChat} />
  );
}
