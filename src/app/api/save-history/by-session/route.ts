import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const { supabase, user, error } = await getAuthenticatedUser();
  if (error || !user) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }

  const { data, error: fetchError } = await supabase
    .from("chat_history")
    .select("messages")
    .eq("user_id", user.id)
    .eq("session_id", session_id)
    .maybeSingle(); // ✅ prevents 500 if no match

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json(data?.messages || []);
}
