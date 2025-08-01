"use client";

import { useState, type ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

type AuthType = "login" | "signup";

export default function AuthForm({ type }: { type: AuthType }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;

      if (type === "signup") {
        result = await supabase.auth.signUp({ email, password });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) {
        const msg = result.error.message;

        if (msg.includes("User already registered")) {
          toast.error("User already exists. Please login.");
        } else if (msg.includes("Invalid login credentials")) {
          toast.error("Invalid email or password.");
        } else {
          toast.error(msg);
        }

        throw result.error;
      }

      toast.success(
        type === "signup" ? "Account created!" : "Logged in successfully!"
      );
      router.push("/classes");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm w-full mx-auto">
      <h2 className="text-2xl font-bold text-center">
        {type === "signup" ? "Create Account" : "Login"}
      </h2>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        required
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : type === "signup" ? "Sign Up" : "Login"}
      </Button>

      <p className="text-center text-sm">
        {type === "signup" ? (
          <>
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </>
        )}
      </p>
    </form>
  );
}
