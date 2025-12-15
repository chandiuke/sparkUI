"use client";

import { ScrollCodeShowcase } from "@/components/scroll-code-showcase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20" />
        
        <div className="relative z-10 text-center px-4">
          <Badge color="primary" variant="flat" className="mb-4">
            ✦ Scroll Demo
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Build as you <span className="text-gradient">scroll</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-6">
            Watch components come to life. Code types out as you scroll down.
          </p>

          <Button color="primary" size="lg" className="shadow-glow-primary">
            Start Scrolling ↓
          </Button>
        </div>
      </section>

      {/* Scroll Code Showcase */}
      <ScrollCodeShowcase />

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to build?
        </h2>
        <div className="flex items-center justify-center gap-3">
          <Link href="/docs/getting-started">
            <Button color="primary">Get Started</Button>
          </Link>
          <Link href="/docs/components">
            <Button variant="bordered">Components</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
