"use client";

import React from "react";
import { Sparkles, ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";

const CTAsection = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Simulate async action (API call, navigation, etc.)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <section className="py-10 lg:py-32 overflow-x-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative bg-gradient-hero border-border/20 rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
          {/* Blurred background */}
          <div className="absolute inset-0 bg-white/50 rounded-3xl blur-3xl opacity-10 scale-110" />

          <div className="relative max-w-4xl mx-auto space-y-8">
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Ready to get started?
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
              Start using AI tools today
            </h2>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators, marketers, and businesses who are
              already using our AI Tools Dashboard to boost their productivity.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login" prefetch>
                <Button
                  className="group cursor-pointer"
                  size="lg"
                  variant="default"
                  onClick={handleClick}
                  disabled={loading}
                >
                  Go to Dashboard
                  {loading ? (
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 " />
                  )}
                </Button>
              </Link>
              <Button variant="default" size="lg">
                Learn more
              </Button>
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Free to start
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Setup in 30 seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAsection;
