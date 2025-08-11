"use client";

import React from "react";
import { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Button variant="ghost">Sign In</Button>
            <Button variant="default">Sign In</Button>
          </div>

          {/* <Button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button> */}
        </div>

        {/* {isMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </div>
            </nav>
          </div>
        )} */}
      </div>
    </header>
  );
};

export default Header;
