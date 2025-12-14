"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

type TransitionPhase = "idle" | "entering" | "exiting";

interface TransitionContextType {
  phase: TransitionPhase;
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

const ENTER_DURATION = 600; // ms for curtain to cover screen

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = useCallback(
    (href: string) => {
      if (phase !== "idle") return;

      // Start enter animation (curtain covers screen)
      setPhase("entering");
      setTargetHref(href);

      // After curtain fully covers, navigate
      setTimeout(() => {
        router.push(href);
      }, ENTER_DURATION);
    },
    [phase, router],
  );

  // When pathname changes, the new page has loaded — start exit animation
  useEffect(() => {
    if (phase === "entering" && targetHref) {
      // Check if we've arrived at the target (or close enough)
      const targetPath = targetHref.split("?")[0].split("#")[0];
      const currentPath = pathname;

      if (currentPath === targetPath || targetPath === "") {
        // Page loaded, start exit animation (curtain reveals new page)
        setPhase("exiting");
        setTargetHref(null);
      }
    }
  }, [pathname, phase, targetHref]);

  // Reset to idle after exit animation completes
  useEffect(() => {
    if (phase === "exiting") {
      const timer = setTimeout(() => {
        setPhase("idle");
      }, ENTER_DURATION);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <TransitionContext.Provider value={{ phase, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within TransitionProvider");
  }
  return context;
}
