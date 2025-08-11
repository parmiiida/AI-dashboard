import axios from "axios";

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function getGroqChatResponse(messages: GroqMessage[]) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not defined in environment variables");
  }

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile", // Updated model
        messages,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content as string;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Groq API request failed: ${
          error.response?.data?.error?.message || error.message
        }`
      );
    } else {
      throw new Error(`Groq API request failed: ${(error as Error).message}`);
    }
  }
}
