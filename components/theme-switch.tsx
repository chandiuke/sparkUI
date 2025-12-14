"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

interface ThemeSwitchProps {
  className?: string;
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={clsx("w-6 h-6", className)} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "p-2 rounded-lg transition-opacity hover:opacity-80",
        "text-default-500 hover:text-foreground",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
    </button>
  );
}
