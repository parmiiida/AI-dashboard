import { NextResponse } from "next/server";
import { getGroqChatResponse, GroqMessage } from "@/lib/groq";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Prepend system message to the conversation history
    const groqMessages: GroqMessage[] = [
      { role: "system", content: "You are a helpful assistant." },
      ...messages, // Include the full conversation history
    ];

    const result = await getGroqChatResponse(groqMessages);
    return NextResponse.json({ result });
  }catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Groq API error:", error.message, error.stack);
      return NextResponse.json(
        { error: "Failed to generate response", details: error.message },
        { status: 500 }
      );
    }
    // fallback for unknown error types
    console.error("Groq API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response", details: String(error) },
      { status: 500 }
    );
  }

}
