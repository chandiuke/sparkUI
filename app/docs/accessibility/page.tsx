"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";

export default function AccessibilityPage() {
  const [demoError, setDemoError] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastResult = useRef<"error" | "success">("success"); // Track last result to alternate

  const triggerDemo = () => {
    setDemoError(false);
    setDemoSuccess(false);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      // Alternate between error and success for demo purposes
      if (lastResult.current === "success") {
        setDemoError(true);
        lastResult.current = "error";
      } else {
        setDemoSuccess(true);
        lastResult.current = "success";
      }
    }, 1500);
  };

  return (
          <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Accessibility</h1>
        <p className="text-lg text-muted-foreground mb-8">
          SparkUI is built with accessibility in mind. All components include proper ARIA attributes, 
          keyboard navigation, and screen reader support — with zero performance overhead.
        </p>

        {/* Philosophy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Zero Performance Cost</h3>
              <p className="text-sm text-muted-foreground">
                All accessibility features are HTML attributes — no extra JavaScript, no dependencies, no re-renders.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Built-in, Not Bolted-on</h3>
              <p className="text-sm text-muted-foreground">
                Accessibility is part of every component from the start — you get it automatically.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Keyboard First</h3>
              <p className="text-sm text-muted-foreground">
                Full keyboard navigation support. Tab, Enter, Escape, Arrow keys — all work as expected.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-lg bg-warning/10 text-warning flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Screen Reader Friendly</h3>
              <p className="text-sm text-muted-foreground">
                Dynamic announcements for errors, loading states, and content changes.
              </p>
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Live Demo: Screen Reader Announcements</h2>
          <p className="text-muted-foreground mb-4">
            Turn on your screen reader (VoiceOver, NVDA, or JAWS) and click the button. 
            You'll hear the error and success messages announced automatically.
          </p>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1">
                <Input
                  label="Email"
                  placeholder="test@example.com"
                  invalid={demoError}
                  valid={demoSuccess}
                  loading={loading}
                  errorMessage="This email is already taken"
                  successMessage="Email is available!"
                  color={loading ? "warning" : demoError ? "danger" : demoSuccess ? "success" : "default"}
                  variant={loading || demoError || demoSuccess ? "flat" : "default"}
                />
              </div>
              <Button onClick={triggerDemo} disabled={loading} color="primary" className="sm:mt-7">
                {loading ? "Checking..." : "Check Availability"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Click multiple times to see alternating states: Loading → Error → Loading → Success.
              The error message uses <code className="px-1 py-0.5 rounded bg-muted text-xs">role="alert"</code> and{" "}
              <code className="px-1 py-0.5 rounded bg-muted text-xs">aria-live="assertive"</code> for immediate announcement.
            </p>
          </div>
        </section>

        {/* Features by Component */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Accessibility Features by Component</h2>
          
          <div className="space-y-6">
            {/* Form Components */}
            <div className="p-5 rounded-xl border border-border">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Input, Textarea, DatePicker
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-invalid</code> — Indicates validation state to assistive tech</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-describedby</code> — Links input to helper/error text</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">role="alert"</code> — Error messages announced immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-live="polite"</code> — Success messages announced without interrupting</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span>Proper <code className="text-foreground">label</code> association with <code className="text-foreground">htmlFor</code></span>
                </li>
              </ul>
            </div>

            {/* DatePicker Keyboard */}
            <div className="p-5 rounded-xl border border-border">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                DatePicker Keyboard Navigation
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Navigation</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">→</kbd> Previous/next day</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">↓</kbd> Previous/next week</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Home</kbd> First day of month</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">End</kbd> Last day of month</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Actions</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Enter</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Space</kbd> Select date</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Escape</kbd> Close calendar</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">PageUp</kbd> Previous month</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Shift</kbd>+<kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">PageUp</kbd> Previous year</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="p-5 rounded-xl border border-border">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                Button
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-busy</code> — Indicates loading state</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-disabled</code> — Proper disabled state for links-as-buttons</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span>Screen reader announces "Loading" during loading state</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span>Focus visible ring for keyboard navigation</span>
                </li>
              </ul>
            </div>

            {/* Accordion */}
            <div className="p-5 rounded-xl border border-border">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-warning" />
                Accordion
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-expanded</code> — Indicates open/closed state</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-controls</code> — Links trigger to content panel</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">role="region"</code> — Content panel is a landmark</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-labelledby</code> — Content labeled by trigger</span>
                </li>
              </ul>
            </div>

            {/* FileUpload */}
            <div className="p-5 rounded-xl border border-border">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-danger" />
                File Upload
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">aria-live="polite"</code> — Announces file count changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><code className="text-foreground">role="alert"</code> — Error messages announced immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span>Proper label association and description linking</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Utility Classes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Accessibility Utility Classes</h2>
          <p className="text-muted-foreground mb-4">
            SparkUI includes utility classes in <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">sparkui.css</code> for common accessibility patterns:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Class</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4"><code className="text-primary">.sr-only</code></td>
                  <td className="py-3 px-4 text-muted-foreground">Visually hidden but accessible to screen readers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4"><code className="text-primary">.not-sr-only</code></td>
                  <td className="py-3 px-4 text-muted-foreground">Undo sr-only, make element visible again</td>
                </tr>
                <tr>
                  <td className="py-3 px-4"><code className="text-primary">.focus-visible-only</code></td>
                  <td className="py-3 px-4 text-muted-foreground">Show focus ring only on keyboard navigation</td>
                </tr>
                <tr>
                  <td className="py-3 px-4"><code className="text-primary">.skip-link</code></td>
                  <td className="py-3 px-4 text-muted-foreground">Skip navigation link (appears on focus)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Reduced Motion */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Reduced Motion Support</h2>
          <p className="text-muted-foreground mb-4">
            SparkUI respects the user's motion preferences. When <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">prefers-reduced-motion: reduce</code> is set, 
            all animations are automatically disabled.
          </p>
          <pre className="p-4 rounded-xl bg-muted overflow-x-auto text-sm font-mono">
            <code>{`/* Included in sparkui.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}</code>
          </pre>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <div className="space-y-4">
            <div className="flex gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
              <svg className="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-success">Always use labels</p>
                <p className="text-sm text-muted-foreground">Every form input should have a visible label or aria-label for screen readers.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
              <svg className="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-success">Provide error messages</p>
                <p className="text-sm text-muted-foreground">Use the errorMessage prop — it's automatically announced to screen readers.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
              <svg className="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-success">Test with keyboard</p>
                <p className="text-sm text-muted-foreground">Navigate your app using only Tab, Enter, and Escape. Everything should be reachable.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
              <svg className="w-5 h-5 text-warning shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-medium text-warning">Don't rely on color alone</p>
                <p className="text-sm text-muted-foreground">Always pair color with text or icons. SparkUI's validation shows both color AND icons/messages.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
