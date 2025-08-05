"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPrompt = searchParams.get("prompt") || "";
  const [prompt, setPrompt] = useState(initialPrompt);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const hasSentInitialPrompt = useRef(false);

  // Only send initial prompt if messages are empty
  useEffect(() => {
    if (
      initialPrompt &&
      messages.length === 0 &&
      !hasSentInitialPrompt.current
    ) {
      hasSentInitialPrompt.current = true;
      (async () => {
        await handleSendPrompt(initialPrompt);
        setPrompt(""); // Clear textarea
        router.replace(
          "/dashboard/566270fd-a10e-4d4c-b64b-d0640dc9b647/tools/text-generator"
        );
      })();
    }
  }, [initialPrompt, messages.length]);

  const handleSendPrompt = async (promptToSend: string) => {
    if (!promptToSend.trim()) return;

    const userMessage: Message = { role: "user", content: promptToSend };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }), // Send full message history
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: res.ok
          ? data.result
          : `Error: ${data.error}${data.details ? ` - ${data.details}` : ""}`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Failed to connect to the server",
        },
      ]);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendPrompt(prompt);
  };

  // Auto-scroll to the bottom
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: 0, // Top of reversed container is "bottom" visually
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className=" bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col rounded-xl shadow-lg h-[92vh]">
        {/* Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-4 no-scrollbar"
        >
          {messages.length === 0 && (
            <p className="text-gray-500 text-center w-full">
              Start the conversation...
            </p>
          )}
          {messages
            .slice()
            .reverse()
            .map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-xl max-w-[80%] break-words ${
                  msg.role === "user"
                    ? "bg-[#171717] text-white ml-auto"
                    : "text-white mr-auto"
                }`}
              >
                <span>{msg.content}</span>
              </div>
            ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-800 scroll-hidden">
          <form onSubmit={handleSubmit} className="relative w-full">
            <textarea
              rows={1}
              value={prompt}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  (e.target as HTMLTextAreaElement).form?.requestSubmit();
                }
              }}
              onChange={(e) => setPrompt(e.target.value)}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = target.scrollHeight + "px";
              }}
              placeholder="Enter your message..."
              className="flex-1 p-3 no-scrollbar rounded-lg bg-[#171717] resize-none outline-none text-white min-h-[48px] w-full pr-16"
              style={{ height: "auto" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute bottom-2 right-2 px-4 py-2 rounded-lg disabled:bg-gray-500"
            >
              {loading ? (
                <p className="bg-white/30 rounded-2xl h-7 w-7 -mr-3 flex items-center justify-center">
                  ...
                </p>
              ) : (
                <span className="bg-white/30 rounded-2xl h-7 w-7 -mr-3 flex items-center justify-center">
                  <ArrowUp className="size-5 " />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
