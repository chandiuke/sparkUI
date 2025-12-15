"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { clsx } from "clsx";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  fallback?: ReactNode;
  minHeight?: string | number;
  once?: boolean;
}

// Skeleton fallback for sections
function SectionSkeleton({ minHeight }: { minHeight?: string | number }) {
  return (
    <div 
      className="animate-pulse space-y-4"
      style={{ minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight }}
    >
      <div className="h-6 w-48 bg-muted/60 rounded" />
      <div className="h-4 w-full bg-muted/40 rounded" />
      <div className="h-32 w-full bg-muted/30 rounded-xl" />
    </div>
  );
}

export function LazySection({
  children,
  className,
  rootMargin = "100px",
  threshold = 0,
  fallback,
  minHeight = 200,
  once = true,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already loaded and once is true, skip observer
    if (hasLoaded && once) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once, hasLoaded]);

  const shouldRender = once ? hasLoaded : isVisible;

  return (
    <div ref={ref} className={className}>
      {shouldRender ? (
        <div className="animate-fade-in">{children}</div>
      ) : (
        fallback || <SectionSkeleton minHeight={minHeight} />
      )}
    </div>
  );
}

// Lazy load heavy components like code blocks
interface LazyCodeProps {
  children: ReactNode;
  className?: string;
}

export function LazyCode({ children, className }: LazyCodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        children
      ) : (
        <div className="h-32 bg-[rgb(17,17,17)] rounded-xl animate-pulse" />
      )}
    </div>
  );
}
