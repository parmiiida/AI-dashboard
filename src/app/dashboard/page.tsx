"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-medium">
          You must be logged in to access the dashboard.
        </p>
        <Link
          href="/register"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Go to Register
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome back!</h1>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
      {/* TODO: Fetch & render history/savings based on user.id */}
    </div>
  );
}
