"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbox = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 🔑 Get user ID on mount
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        console.error("User not found or not logged in", error);
      }
    };
    getUser();
  }, [supabase]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || !userId) return;

    const userMessage: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();

      if (res.ok) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.result,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // ✅ Navigate using dynamic user ID
        router.push(
          `/dashboard/${userId}/tools/text-generator?prompt=${encodeURIComponent(
            prompt
          )}`
        );
      } else {
        const errorMessage: Message = {
          role: "assistant",
          content: `Error: ${data.error}${
            data.details ? ` - ${data.details}` : ""
          }`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Error: Failed to connect to the server",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div className="w-full max-w-lg p-6 bg-[#202021] rounded-xl shadow-xl ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-2 border-none no-scrollbar focus:outline-none rounded-md "
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your message..."
            rows={4}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                (e.target as HTMLTextAreaElement).form?.requestSubmit();
              }
            }}
          />
          <button
            type="submit"
            className="w-full p-2 bg-[#303132] text-white cursor-pointer rounded-xl hover:bg-[#2f3032] disabled:bg-gray-400"
            disabled={loading || !userId}
          >
            {loading ? "Generating..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
