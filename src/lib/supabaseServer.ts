// src/lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function getAuthenticatedUser() {
    // pass the function itself
    const supabase = createRouteHandlerClient({ cookies });

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return { supabase, user: null, error: "User not authenticated" };
    }

    return { supabase, user };
  }
export function unauthorizedResponse() {
  return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
}
