import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse } from "@/lib/supabaseServer";

export async function GET() {
  const { supabase, user, error } = await getAuthenticatedUser();
  if (error || !user) return unauthorizedResponse();

  const { data, error: fetchError } = await supabase
    .from("chat_history")
    .select("session_id, messages, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(7)

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json(data || {});
}
