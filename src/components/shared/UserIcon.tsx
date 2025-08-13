"use client";

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UserData {
  first_name?: string;
  last_name?: string;
}

const UserIcon: React.FC = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (user) {
        setUser({
          first_name: user.user_metadata?.first_name,
          last_name: user.user_metadata?.last_name,
        });
      }
    };

    fetchUser();
  }, [supabase]);

  if (!user) return null; // or a loading spinner

  // Get first letter of first_name or fallback to email
  const initial = user.first_name ? user.first_name[0].toUpperCase() : "?";

  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center">
        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
          {initial}
        </span>
      </div>
    </div>
  );
};

export default UserIcon;
