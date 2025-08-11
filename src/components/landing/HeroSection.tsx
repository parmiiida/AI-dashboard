import React from "react";
import { ChatDemo } from "./ChatDemo";
import { Sparkles } from "lucide-react";
import { Bot } from "lucide-react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden  pt-20 pb-16 lg:pb-24 min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-12">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py- rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI Tools Made Sample
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-7xl font-bold text-foreground leading-tight">
                Your All-in-One
                <br />
                <span className="bg-gradient-primary bg-clip-text text-white/50">
                  AI Dashboard
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Access powerfull AI tools in one place to enhance your
                productivity and creativity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" className="group">
                Start using AI Tools{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                See How it works
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                Free models included
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                No setup required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Start in 30 seconds
              </div>
            </div>
          </div>
          <div className="mt-16">
            <ChatDemo />
          </div>
        </div>
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow rounded-full blur-3xl opacity-5 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  );
};

export default HeroSection;
