// src/types/chat.ts

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatHistoryItem {
  id: string;
  session_id: string;
  title?: string;
  messages: Message[];
  created_at: string;
}

export interface AppSidebarProps {
  onSelectChat: (messages: Message[]) => void;
}

// If you have other related types, add them here as well
