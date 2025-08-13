// hooks/useUser.ts
"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UserData {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export function useUser() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      if (data.user) {
        setUser({
          first_name: data.user.user_metadata?.first_name,
          last_name: data.user.user_metadata?.last_name,
          email: data.user.email,
        });
      }
    };

    fetchUser();
  }, [supabase]);

  return user;
}
