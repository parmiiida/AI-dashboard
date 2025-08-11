import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { supabase, user, error } = await getAuthenticatedUser();
    if (error || !user) return unauthorizedResponse();

    const { session_id, messages } = await req.json();

    if (!session_id || !messages) {
      return NextResponse.json(
        { error: "session_id and messages are required" },
        { status: 400 }
      );
    }

    const { error: upsertError } = await supabase
      .from("chat_history")
      .upsert(
        [{
          user_id: user.id,
          session_id,
          messages,
          updated_at: new Date().toISOString(), // optional
        }],
        { onConflict: "user_id,session_id" }
      );

    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /save-history/save error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
