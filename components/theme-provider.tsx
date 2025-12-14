"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { themes, ThemeName, ThemeColors } from "@/config/themes";

interface ThemeProviderState {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  radius: number;
  setRadius: (radius: number) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

const THEME_KEY = "sparkui-theme";
const RADIUS_KEY = "sparkui-radius";

function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--background", colors.background);
  root.style.setProperty("--foreground", colors.foreground);
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--primary-foreground", colors.primaryForeground);
  root.style.setProperty("--secondary", colors.secondary);
  root.style.setProperty("--secondary-foreground", colors.secondaryForeground);
  root.style.setProperty("--muted", colors.muted);
  root.style.setProperty("--muted-foreground", colors.mutedForeground);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--accent-foreground", colors.accentForeground);
  root.style.setProperty("--card", colors.card);
  root.style.setProperty("--card-foreground", colors.cardForeground);
  root.style.setProperty("--border", colors.border);
  root.style.setProperty("--input", colors.input);
  root.style.setProperty("--ring", colors.ring);
  root.style.setProperty("--success", colors.success);
  root.style.setProperty("--success-foreground", colors.successForeground);
  root.style.setProperty("--warning", colors.warning);
  root.style.setProperty("--warning-foreground", colors.warningForeground);
  root.style.setProperty("--danger", colors.danger);
  root.style.setProperty("--danger-foreground", colors.dangerForeground);
}

export function SparkThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("default");
  const [radius, setRadiusState] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as ThemeName;
    const savedRadius = localStorage.getItem(RADIUS_KEY);

    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
    }
    if (savedRadius) {
      setRadiusState(parseFloat(savedRadius));
    }
    setMounted(true);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (!mounted) return;

    const isDark = document.documentElement.classList.contains("dark");
    const themeConfig = themes[theme];
    const colors = isDark ? themeConfig.dark : themeConfig.light;
    applyThemeColors(colors);

    // Watch for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkNow = document.documentElement.classList.contains("dark");
          const newColors = isDarkNow ? themeConfig.dark : themeConfig.light;
          applyThemeColors(newColors);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [theme, mounted]);

  // Apply radius when it changes
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.setProperty("--radius", `${radius}rem`);
  }, [radius, mounted]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const setRadius = (newRadius: number) => {
    setRadiusState(newRadius);
    localStorage.setItem(RADIUS_KEY, newRadius.toString());
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, radius, setRadius }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useSparkTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useSparkTheme must be used within SparkThemeProvider");
  }
  return context;
}
