"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={clsx("animate-fade-in", className)}>
      {children}
    </div>
  );
}
