"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const useAuth = () => {
  const supabase = createClientComponentClient();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.href = "/login";
  };

  return { logout };
};
