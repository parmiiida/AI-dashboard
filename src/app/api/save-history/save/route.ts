import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await req.json();
    const { session_id, messages } = body;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not authenticated or error:", userError);
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { error: upsertError } = await supabase.from("chat_history").upsert(
      [
        {
          user_id: user.id,
          session_id,
          messages,
        },
      ],
      { onConflict: "user_id,session_id" }
    );

    if (upsertError) {
      console.error("Upsert error:", upsertError);
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error in POST /api/save-history/save:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
