"use client";

import React from "react";
import Link from "next/link";
import { Bot } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              AI Tools Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" >
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register" >
              <Button variant="default">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
