"use client";

import { PageWrapper } from "@/components/page-transition";
import { useSparkTheme } from "@/components/theme-provider";
import { themes } from "@/config/themes";
import { clsx } from "clsx";

export default function ThemingPage() {
  const { theme, setTheme, radius, setRadius } = useSparkTheme();

  return (
    <PageWrapper>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Theming</h1>
        <p className="text-lg text-muted-foreground mb-8">
          SparkUI uses CSS variables for theming. Customize colors, radius, and more.
          Click the paint brush button in the bottom left to open the theme customizer.
        </p>

        {/* Theme Selector */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Color Themes</h2>
          <p className="text-muted-foreground mb-4">
            Choose a color theme. Changes are saved automatically.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                onClick={() => setTheme(key as keyof typeof themes)}
                className={clsx(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                  theme === key
                    ? "border-primary bg-primary/10 ring-2 ring-primary"
                    : "border-border hover:bg-muted"
                )}
              >
                <div
                  className="w-10 h-10 rounded-full shadow-lg"
                  style={{ backgroundColor: `hsl(${t.dark.primary})` }}
                />
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Border Radius</h2>
          <p className="text-muted-foreground mb-4">
            Adjust the border radius for all components.
          </p>
          <div className="flex gap-2">
            {[0, 0.3, 0.5, 0.75, 1].map((r) => (
              <button
                key={r}
                onClick={() => setRadius(r)}
                className={clsx(
                  "w-12 h-12 border transition-all flex items-center justify-center text-sm",
                  radius === r
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:bg-muted"
                )}
                style={{ borderRadius: `${r}rem` }}
              >
                {r}
              </button>
            ))}
          </div>
        </section>

        {/* Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex flex-wrap gap-3 mb-4">
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                Primary
              </button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground">
                Secondary
              </button>
              <button className="px-4 py-2 rounded-lg bg-success text-success-foreground">
                Success
              </button>
              <button className="px-4 py-2 rounded-lg bg-warning text-warning-foreground">
                Warning
              </button>
              <button className="px-4 py-2 rounded-lg bg-danger text-danger-foreground">
                Danger
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <button className="px-4 py-2 rounded-lg border-2 border-primary text-primary">
                Outlined
              </button>
              <button className="px-4 py-2 rounded-lg bg-muted text-muted-foreground">
                Muted
              </button>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-muted-foreground text-sm">
                This is a muted content area with muted foreground text.
              </p>
            </div>
          </div>
        </section>

        {/* CSS Variables */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">CSS Variables</h2>
          <p className="text-muted-foreground mb-4">
            Add these to your <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">globals.css</code>:
          </p>
          <pre className="p-4 rounded-xl bg-muted overflow-x-auto text-sm font-mono">
            <code>{`:root {
  --background: ${themes[theme].light.background};
  --foreground: ${themes[theme].light.foreground};
  --primary: ${themes[theme].light.primary};
  --primary-foreground: ${themes[theme].light.primaryForeground};
  --secondary: ${themes[theme].light.secondary};
  --secondary-foreground: ${themes[theme].light.secondaryForeground};
  --muted: ${themes[theme].light.muted};
  --muted-foreground: ${themes[theme].light.mutedForeground};
  --card: ${themes[theme].light.card};
  --card-foreground: ${themes[theme].light.cardForeground};
  --border: ${themes[theme].light.border};
  --ring: ${themes[theme].light.ring};
  --radius: ${radius}rem;
}

.dark {
  --background: ${themes[theme].dark.background};
  --foreground: ${themes[theme].dark.foreground};
  --primary: ${themes[theme].dark.primary};
  --primary-foreground: ${themes[theme].dark.primaryForeground};
  --secondary: ${themes[theme].dark.secondary};
  --secondary-foreground: ${themes[theme].dark.secondaryForeground};
  --muted: ${themes[theme].dark.muted};
  --muted-foreground: ${themes[theme].dark.mutedForeground};
  --card: ${themes[theme].dark.card};
  --card-foreground: ${themes[theme].dark.cardForeground};
  --border: ${themes[theme].dark.border};
  --ring: ${themes[theme].dark.ring};
}`}</code>
          </pre>
        </section>

        {/* Tailwind Config */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tailwind Config</h2>
          <p className="text-muted-foreground mb-4">
            Map CSS variables to Tailwind classes:
          </p>
          <pre className="p-4 rounded-xl bg-muted overflow-x-auto text-sm font-mono">
            <code>{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  darkMode: "class",
}`}</code>
          </pre>
        </section>
      </div>
    </PageWrapper>
  );
}
