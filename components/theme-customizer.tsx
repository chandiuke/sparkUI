"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useSparkTheme } from "./theme-provider";
import { themes } from "@/config/themes";
import { clsx } from "clsx";

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: colorTheme, setTheme: setColorTheme, radius, setRadius } = useSparkTheme();
  const { theme: mode, setTheme: setMode } = useTheme();

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Customize theme"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-background border-l border-border p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Customize</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mode */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Mode</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["light", "dark", "system"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={clsx(
                        "px-3 py-2 text-sm rounded-lg border transition-colors capitalize",
                        mode === m
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Theme */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => setColorTheme(key as keyof typeof themes)}
                      className={clsx(
                        "flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors",
                        colorTheme === key
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: `hsl(${t.dark.primary})` }}
                      />
                      <span className="truncate">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Radius</h3>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 0.3, 0.5, 0.75, 1].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRadius(r)}
                      className={clsx(
                        "px-3 py-2 text-sm rounded-lg border transition-colors",
                        radius === r
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Preview</h3>
                <div className="p-4 rounded-lg border border-border bg-card space-y-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground">
                      Primary
                    </button>
                    <button className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground">
                      Secondary
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm rounded-lg bg-success text-success-foreground">
                      Success
                    </button>
                    <button className="px-3 py-1.5 text-sm rounded-lg bg-danger text-danger-foreground">
                      Danger
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-muted text-muted-foreground text-sm">
                    Muted content area
                  </div>
                </div>
              </div>

              {/* Copy Code */}
              <div>
                <h3 className="text-sm font-medium mb-3">Copy Code</h3>
                <button
                  onClick={() => {
                    const css = generateThemeCSS(colorTheme, radius);
                    navigator.clipboard.writeText(css);
                  }}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Copy CSS Variables
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function generateThemeCSS(themeName: string, radius: number): string {
  const theme = themes[themeName as keyof typeof themes];
  if (!theme) return "";

  return `@layer base {
  :root {
    --background: ${theme.light.background};
    --foreground: ${theme.light.foreground};
    --primary: ${theme.light.primary};
    --primary-foreground: ${theme.light.primaryForeground};
    --secondary: ${theme.light.secondary};
    --secondary-foreground: ${theme.light.secondaryForeground};
    --muted: ${theme.light.muted};
    --muted-foreground: ${theme.light.mutedForeground};
    --accent: ${theme.light.accent};
    --accent-foreground: ${theme.light.accentForeground};
    --card: ${theme.light.card};
    --card-foreground: ${theme.light.cardForeground};
    --border: ${theme.light.border};
    --input: ${theme.light.input};
    --ring: ${theme.light.ring};
    --radius: ${radius}rem;
  }

  .dark {
    --background: ${theme.dark.background};
    --foreground: ${theme.dark.foreground};
    --primary: ${theme.dark.primary};
    --primary-foreground: ${theme.dark.primaryForeground};
    --secondary: ${theme.dark.secondary};
    --secondary-foreground: ${theme.dark.secondaryForeground};
    --muted: ${theme.dark.muted};
    --muted-foreground: ${theme.dark.mutedForeground};
    --accent: ${theme.dark.accent};
    --accent-foreground: ${theme.dark.accentForeground};
    --card: ${theme.dark.card};
    --card-foreground: ${theme.dark.cardForeground};
    --border: ${theme.dark.border};
    --input: ${theme.dark.input};
    --ring: ${theme.dark.ring};
  }
}`;
}
