"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { clsx } from "clsx";

interface DocsLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  className?: string;
}

// Optimized docs page layout with performance features
export function DocsLayout({ children, title, description, className }: DocsLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={clsx("animate-fade-in", className)}>
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </header>

      <div className={clsx("space-y-16", mounted && "stagger-fade-in")}>
        {children}
      </div>
    </div>
  );
}

// Section wrapper with scroll margin and content visibility
interface DocsSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function DocsSection({ id, title, description, children, className }: DocsSectionProps) {
  return (
    <section id={id} className={clsx("scroll-mt-24 content-visibility-auto", className)}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {description && (
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      )}
      {children}
    </section>
  );
}

// Progress indicator for long docs pages
export function DocsProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-muted z-50">
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Back to top button
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform z-40"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
