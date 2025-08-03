import { NextResponse } from "next/server";
import { getGroqChatResponse, GroqMessage } from "@/lib/groq";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const messages: GroqMessage[] = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt as string },
    ];

    const result = await getGroqChatResponse(messages);
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Groq API error:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 }
    );
  }
}
