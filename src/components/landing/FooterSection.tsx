import React from "react";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className=" border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {" "}
            @2025 AI Tools Dashboard. All rights reserved.
          </p>
          <div className="flex items-center gap-6t-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
