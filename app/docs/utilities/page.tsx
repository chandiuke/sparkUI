"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/page-transition";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";




function TransformDemo() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="spark-transition-transform bg-muted p-3 rounded-lg text-center text-sm font-medium cursor-pointer"
      style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      spark-transition-transform
    </div>
  );
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "text-gradients", title: "Text Gradients" },
  { id: "text-effects", title: "Text Effects" },
  { id: "backgrounds", title: "Backgrounds" },
  { id: "patterns", title: "Patterns" },
  { id: "glass", title: "Glass Effects" },
  { id: "borders", title: "Borders" },
  { id: "shadows", title: "Shadows" },
  { id: "animations", title: "Animations" },
  { id: "hover", title: "Hover Effects" },
  { id: "focus", title: "Focus States" },
  { id: "layout", title: "Layout" },
  { id: "cards", title: "Cards" },
  { id: "misc", title: "Miscellaneous" },
];

export default function UtilitiesPage() {
  return (
    <PageWrapper>
      <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              <span className="text-gradient">Utility Classes</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pre-built CSS utility classes for common styling patterns. Use them alongside Tailwind to create stunning UIs faster.
            </p>
          </header>

          <div className="space-y-16">
            {/* Overview */}
            <section id="overview">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Overview</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                SparkUI provides utility classes that complement Tailwind CSS. These utilities are designed to work with your theme colors and provide effects that would otherwise require multiple Tailwind classes.
              </p>
              <CodeBlock code={`// All utilities are included in sparkui.css
// They use your theme CSS variables automatically

<h1 className="text-gradient">Gradient Text</h1>
<div className="glass rounded-xl p-6">Glass Card</div>
<button className="hover-lift press-scale">Interactive</button>`} />
            </section>

            {/* Text Gradients */}
            <section id="text-gradients">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Text Gradients</h2>
              <p className="text-muted-foreground mb-6">Apply gradient colors to text. Works with all theme colors.</p>
              <CodePreview
                preview={
                  <div className="space-y-4">
                    <p className="text-gradient text-3xl font-bold">text-gradient</p>
                    <p className="text-gradient-primary text-3xl font-bold">text-gradient-primary</p>
                    <p className="text-gradient-secondary text-3xl font-bold">text-gradient-secondary</p>
                    <p className="text-gradient-success text-3xl font-bold">text-gradient-success</p>
                    <p className="text-gradient-warning text-3xl font-bold">text-gradient-warning</p>
                    <p className="text-gradient-danger text-3xl font-bold">text-gradient-danger</p>
                    <p className="text-gradient-rainbow text-3xl font-bold">text-gradient-rainbow</p>
                    <p className="text-gradient-animated text-3xl font-bold">text-gradient-animated</p>
                  </div>
                }
                code={`<h1 className="text-gradient">Primary to Secondary</h1>
<h1 className="text-gradient-primary">Primary Gradient</h1>
<h1 className="text-gradient-secondary">Secondary Gradient</h1>
<h1 className="text-gradient-success">Success Gradient</h1>
<h1 className="text-gradient-warning">Warning Gradient</h1>
<h1 className="text-gradient-danger">Danger Gradient</h1>
<h1 className="text-gradient-rainbow">Rainbow Gradient</h1>
<h1 className="text-gradient-animated">Animated Gradient</h1>`}
              />
            </section>

            {/* Text Effects */}
            <section id="text-effects">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Text Effects</h2>
              <p className="text-muted-foreground mb-6">Glow and shadow effects for text.</p>
              <CodePreview
                preview={
                  <div className="space-y-4 bg-card p-6 rounded-xl">
                    <p className="text-glow text-2xl font-bold text-primary">text-glow</p>
                    <p className="text-glow-sm text-2xl font-bold text-primary">text-glow-sm</p>
                    <p className="text-glow-lg text-2xl font-bold text-primary">text-glow-lg</p>
                    <p className="text-shadow text-2xl font-bold">text-shadow</p>
                    <p className="text-shadow-lg text-2xl font-bold">text-shadow-lg</p>
                  </div>
                }
                code={`<h1 className="text-glow text-primary">Glowing Text</h1>
<h1 className="text-glow-sm text-primary">Small Glow</h1>
<h1 className="text-glow-lg text-primary">Large Glow</h1>
<h1 className="text-shadow">Text Shadow</h1>
<h1 className="text-shadow-lg">Large Shadow</h1>`}
              />
            </section>

            {/* Backgrounds */}
            <section id="backgrounds">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Background Gradients</h2>
              <p className="text-muted-foreground mb-6">Gradient backgrounds using theme colors.</p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient h-24 rounded-xl flex items-center justify-center text-white font-medium">bg-gradient</div>
                    <div className="bg-gradient-to-r h-24 rounded-xl flex items-center justify-center text-white font-medium">bg-gradient-to-r</div>
                    <div className="bg-gradient-radial h-24 rounded-xl flex items-center justify-center font-medium">bg-gradient-radial</div>
                    <div className="bg-gradient-conic h-24 rounded-xl flex items-center justify-center text-white font-medium">bg-gradient-conic</div>
                    <div className="bg-gradient-mesh h-24 rounded-xl flex items-center justify-center font-medium col-span-2">bg-gradient-mesh</div>
                    <div className="bg-gradient-animated h-24 rounded-xl flex items-center justify-center text-white font-medium col-span-2">bg-gradient-animated</div>
                  </div>
                }
                code={`<div className="bg-gradient">Diagonal gradient</div>
<div className="bg-gradient-to-r">Horizontal gradient</div>
<div className="bg-gradient-radial">Radial gradient</div>
<div className="bg-gradient-conic">Conic gradient</div>
<div className="bg-gradient-mesh">Mesh gradient</div>
<div className="bg-gradient-animated">Animated gradient</div>`}
              />
            </section>

            {/* Patterns */}
            <section id="patterns">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Background Patterns</h2>
              <p className="text-muted-foreground mb-6">Subtle patterns for backgrounds.</p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dots h-32 rounded-xl border border-border flex items-center justify-center font-medium">bg-dots</div>
                    <div className="bg-dots-sm h-32 rounded-xl border border-border flex items-center justify-center font-medium">bg-dots-sm</div>
                    <div className="bg-grid h-32 rounded-xl border border-border flex items-center justify-center font-medium">bg-grid</div>
                    <div className="bg-grid-sm h-32 rounded-xl border border-border flex items-center justify-center font-medium">bg-grid-sm</div>
                    <div className="bg-stripes h-32 rounded-xl border border-border flex items-center justify-center font-medium col-span-2">bg-stripes</div>
                  </div>
                }
                code={`<div className="bg-dots">Dot pattern</div>
<div className="bg-dots-sm">Small dots</div>
<div className="bg-grid">Grid pattern</div>
<div className="bg-grid-sm">Small grid</div>
<div className="bg-stripes">Stripe pattern</div>`}
              />
            </section>


            {/* Glass Effects */}
            <section id="glass">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Glass Effects</h2>
              <p className="text-muted-foreground mb-6">Frosted glass / glassmorphism effects with backdrop blur. Works best over colorful backgrounds.</p>
              <CodePreview
                preview={
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Background image */}
                    <img 
                      src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80" 
                      alt="City street background"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Glass cards */}
                    <div className="relative p-6 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="glass p-4 rounded-xl text-center">
                          <p className="font-semibold text-sm">glass</p>
                          <p className="text-xs opacity-70">16px blur</p>
                        </div>
                        <div className="glass-sm p-4 rounded-xl text-center">
                          <p className="font-semibold text-sm">glass-sm</p>
                          <p className="text-xs opacity-70">8px blur</p>
                        </div>
                        <div className="glass-lg p-4 rounded-xl text-center">
                          <p className="font-semibold text-sm">glass-lg</p>
                          <p className="text-xs opacity-70">24px blur</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="glass-primary p-4 rounded-xl text-center">
                          <p className="font-semibold text-sm">glass-primary</p>
                        </div>
                        <div className="glass-secondary p-4 rounded-xl text-center">
                          <p className="font-semibold text-sm">glass-secondary</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="glass-dark p-4 rounded-xl text-center text-white">
                          <p className="font-semibold text-sm">glass-dark</p>
                        </div>
                        <div className="glass-light p-4 rounded-xl text-center text-black">
                          <p className="font-semibold text-sm">glass-light</p>
                        </div>
                        <div className="glass-adaptive p-4 rounded-xl text-center">
                          <p className="font-semibold text-sm">glass-adaptive</p>
                          <p className="text-xs opacity-70">theme-aware</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                code={`// Blur intensity variants
<div className="glass">Default (16px blur)</div>
<div className="glass-sm">Light (8px blur)</div>
<div className="glass-lg">Heavy (24px blur)</div>

// Color tinted glass
<div className="glass-primary">Primary tint</div>
<div className="glass-secondary">Secondary tint</div>
<div className="glass-success">Success tint</div>
<div className="glass-warning">Warning tint</div>
<div className="glass-danger">Danger tint</div>

// Light/Dark variants
<div className="glass-dark">Dark glass</div>
<div className="glass-light">Light glass</div>

// Theme-aware (light in light mode, dark in dark mode)
<div className="glass-adaptive">Adapts to theme</div>`}
              />
            </section>

            {/* Borders */}
            <section id="borders">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Border Effects</h2>
              <p className="text-muted-foreground mb-6">Gradient borders and glowing border effects.</p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-gradient p-4 rounded-xl text-center font-medium">border-gradient</div>
                    <div className="border-gradient-primary p-4 rounded-xl text-center font-medium">border-gradient-primary</div>
                    <div className="border-gradient-rainbow p-4 rounded-xl text-center font-medium">border-gradient-rainbow</div>
                    <div className="border-glow p-4 rounded-xl text-center font-medium">border-glow</div>
                    <div className="border-glow-sm p-4 rounded-xl text-center font-medium">border-glow-sm</div>
                    <div className="border-glow-lg p-4 rounded-xl text-center font-medium">border-glow-lg</div>
                  </div>
                }
                code={`<div className="border-gradient rounded-xl">Gradient border</div>
<div className="border-gradient-primary rounded-xl">Primary gradient</div>
<div className="border-gradient-rainbow rounded-xl">Rainbow gradient</div>
<div className="border-glow rounded-xl">Glowing border</div>
<div className="border-glow-sm rounded-xl">Small glow</div>
<div className="border-glow-lg rounded-xl">Large glow</div>
<div className="border-glow-success rounded-xl">Success glow</div>
<div className="border-glow-danger rounded-xl">Danger glow</div>`}
              />
            </section>

            {/* Shadows */}
            <section id="shadows">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Shadow Effects</h2>
              <p className="text-muted-foreground mb-6">Glowing shadows and soft elevation shadows.</p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-3 gap-6 p-4">
                    <div className="shadow-glow-sm bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-glow-sm</div>
                    <div className="shadow-glow bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-glow</div>
                    <div className="shadow-glow-lg bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-glow-lg</div>
                    <div className="shadow-glow-primary bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-glow-primary</div>
                    <div className="shadow-glow-success bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-glow-success</div>
                    <div className="shadow-glow-danger bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-glow-danger</div>
                    <div className="shadow-soft bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-soft</div>
                    <div className="shadow-soft-lg bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-soft-lg</div>
                    <div className="shadow-elevation-3 bg-card p-4 rounded-xl text-center text-sm font-medium">shadow-elevation-3</div>
                  </div>
                }
                code={`// Glow shadows
<div className="shadow-glow">Default glow</div>
<div className="shadow-glow-sm">Small glow</div>
<div className="shadow-glow-lg">Large glow</div>
<div className="shadow-glow-primary">Primary glow</div>
<div className="shadow-glow-success">Success glow</div>
<div className="shadow-glow-danger">Danger glow</div>

// Soft shadows
<div className="shadow-soft">Soft shadow</div>
<div className="shadow-soft-lg">Large soft</div>

// Elevation shadows (1-5)
<div className="shadow-elevation-1">Level 1</div>
<div className="shadow-elevation-3">Level 3</div>
<div className="shadow-elevation-5">Level 5</div>`}
              />
            </section>


            {/* Animations */}
            <section id="animations">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Animations</h2>
              <p className="text-muted-foreground mb-6">Entrance animations and looping effects. Add delay classes for staggered animations.</p>
              <CodePreview
                preview={
                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4">
                      <div key="fade-in" className="animate-fade-in bg-primary/20 p-3 rounded-lg text-center text-xs font-medium">fade-in</div>
                      <div key="fade-up" className="animate-fade-up bg-primary/20 p-3 rounded-lg text-center text-xs font-medium">fade-up</div>
                      <div key="fade-down" className="animate-fade-down bg-primary/20 p-3 rounded-lg text-center text-xs font-medium">fade-down</div>
                      <div key="scale-in" className="animate-scale-in bg-primary/20 p-3 rounded-lg text-center text-xs font-medium">scale-in</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="animate-float bg-secondary/20 p-3 rounded-lg text-center text-xs font-medium">float</div>
                      <div className="animate-pulse-soft bg-secondary/20 p-3 rounded-lg text-center text-xs font-medium">pulse-soft</div>
                      <div className="animate-bounce-soft bg-secondary/20 p-3 rounded-lg text-center text-xs font-medium">bounce-soft</div>
                      <div className="animate-wiggle bg-secondary/20 p-3 rounded-lg text-center text-xs font-medium">wiggle</div>
                    </div>
                    <div className="animate-shimmer h-12 rounded-lg" />
                  </div>
                }
                code={`// Entrance animations
<div className="animate-fade-in">Fade in</div>
<div className="animate-fade-up">Fade up</div>
<div className="animate-fade-down">Fade down</div>
<div className="animate-fade-left">Fade left</div>
<div className="animate-fade-right">Fade right</div>
<div className="animate-scale-in">Scale in</div>
<div className="animate-scale-up">Scale up</div>
<div className="animate-bounce-in">Bounce in</div>
<div className="animate-rotate-in">Rotate in</div>
<div className="animate-flip-in">Flip in</div>

// Looping animations
<div className="animate-float">Float</div>
<div className="animate-float-slow">Float slow</div>
<div className="animate-pulse-soft">Pulse soft</div>
<div className="animate-pulse-glow">Pulse glow</div>
<div className="animate-bounce-soft">Bounce soft</div>
<div className="animate-wiggle">Wiggle</div>
<div className="animate-spin-slow">Spin slow</div>
<div className="animate-shimmer">Shimmer</div>

// Stagger with delays
<div className="animate-fade-up animate-delay-100">First</div>
<div className="animate-fade-up animate-delay-200">Second</div>
<div className="animate-fade-up animate-delay-300">Third</div>

// Custom duration
<div className="animate-fade-in animate-duration-700">Slower</div>`}
              />
            </section>

            {/* Hover Effects */}
            <section id="hover">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Hover Effects</h2>
              <p className="text-muted-foreground mb-6">Interactive hover and press effects for buttons and cards.</p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-3 gap-4">
                    <div className="hover-lift bg-card border border-border p-4 rounded-xl text-center font-medium cursor-pointer">hover-lift</div>
                    <div className="hover-lift-sm bg-card border border-border p-4 rounded-xl text-center font-medium cursor-pointer">hover-lift-sm</div>
                    <div className="hover-lift-lg bg-card border border-border p-4 rounded-xl text-center font-medium cursor-pointer">hover-lift-lg</div>
                    <div className="hover-scale bg-card border border-border p-4 rounded-xl text-center font-medium cursor-pointer">hover-scale</div>
                    <div className="hover-glow bg-card border border-border p-4 rounded-xl text-center font-medium cursor-pointer">hover-glow</div>
                    <div className="hover-shine bg-primary text-primary-foreground p-4 rounded-xl text-center font-medium cursor-pointer">hover-shine</div>
                    <div className="press-scale bg-card border border-border p-4 rounded-xl text-center font-medium cursor-pointer">press-scale</div>
                    <div className="interactive bg-card border border-border p-4 rounded-xl text-center font-medium">interactive</div>
                    <div className="interactive-scale bg-card border border-border p-4 rounded-xl text-center font-medium">interactive-scale</div>
                  </div>
                }
                code={`// Hover effects
<div className="hover-lift">Lift on hover</div>
<div className="hover-lift-sm">Small lift</div>
<div className="hover-lift-lg">Large lift</div>
<div className="hover-scale">Scale on hover</div>
<div className="hover-scale-lg">Large scale</div>
<div className="hover-glow">Glow on hover</div>
<div className="hover-glow-primary">Primary glow</div>
<div className="hover-shine">Shine effect</div>
<div className="hover-border-glow">Border glow</div>
<div className="hover-bg-shift">Background shift</div>

// Press/active effects
<button className="press-scale">Press to scale</button>
<button className="press-inset">Press inset</button>

// Combined interactive
<div className="interactive">Lift + shadow + press</div>
<div className="interactive-scale">Scale + press</div>`}
              />
            </section>

            {/* Focus States */}
            <section id="focus">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Focus States</h2>
              <p className="text-muted-foreground mb-6">Accessible focus ring styles. Click or Tab to see the focus states.</p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <button className="spark-focus-ring bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">spark-focus-ring</button>
                    <button className="spark-focus-ring-primary bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">primary</button>
                    <button className="spark-focus-ring-secondary bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">secondary</button>
                    <button className="spark-focus-ring-success bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">success</button>
                    <button className="spark-focus-ring-warning bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">warning</button>
                    <button className="spark-focus-ring-danger bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">danger</button>
                    <button className="spark-focus-ring-inset bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">inset</button>
                    <button className="spark-focus-glow bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">spark-focus-glow</button>
                    <button className="spark-focus-none bg-card border border-border px-4 py-2 rounded-lg font-medium text-sm">spark-focus-none</button>
                  </div>
                }
                code={`<button className="spark-focus-ring">Default ring</button>
<button className="spark-focus-ring-primary">Primary ring</button>
<button className="spark-focus-ring-secondary">Secondary ring</button>
<button className="spark-focus-ring-success">Success ring</button>
<button className="spark-focus-ring-warning">Warning ring</button>
<button className="spark-focus-ring-danger">Danger ring</button>
<button className="spark-focus-ring-inset">Inset ring</button>
<button className="spark-focus-glow">Glowing focus</button>

// Disable focus ring
<button className="spark-focus-none">No focus ring</button>`}
              />
            </section>


            {/* Layout */}
            <section id="layout">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Layout Utilities</h2>
              <p className="text-muted-foreground mb-6">
                Flexbox shortcuts for common layout patterns. All prefixed with <code className="text-primary">spark-</code> to avoid conflicts with Tailwind.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-4">Centering</h3>
              <CodePreview
                preview={
                  <div className="space-y-3">
                    <div className="spark-center h-16 bg-muted rounded-lg border-2 border-dashed border-border">
                      <span className="text-sm font-medium">spark-center</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="spark-center-x h-12 bg-muted rounded-lg border-2 border-dashed border-border">
                        <span className="text-xs">spark-center-x</span>
                      </div>
                      <div className="spark-center-y h-12 bg-muted rounded-lg border-2 border-dashed border-border">
                        <span className="text-xs">spark-center-y</span>
                      </div>
                    </div>
                  </div>
                }
                code={`<div className="spark-center">Center both axes</div>
<div className="spark-center-x">Center horizontal only</div>
<div className="spark-center-y">Center vertical only</div>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Row & Stack</h3>
              <CodePreview
                preview={
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">spark-row-4 (horizontal, gap 1rem)</p>
                      <div className="spark-row-4">
                        <div className="bg-primary/20 border border-primary/30 px-4 py-2 rounded-lg text-sm">Item 1</div>
                        <div className="bg-primary/20 border border-primary/30 px-4 py-2 rounded-lg text-sm">Item 2</div>
                        <div className="bg-primary/20 border border-primary/30 px-4 py-2 rounded-lg text-sm">Item 3</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">spark-stack-2 (vertical, gap 0.5rem)</p>
                      <div className="spark-stack-2 max-w-xs">
                        <div className="bg-secondary/20 border border-secondary/30 px-4 py-2 rounded-lg text-sm">Item 1</div>
                        <div className="bg-secondary/20 border border-secondary/30 px-4 py-2 rounded-lg text-sm">Item 2</div>
                        <div className="bg-secondary/20 border border-secondary/30 px-4 py-2 rounded-lg text-sm">Item 3</div>
                      </div>
                    </div>
                  </div>
                }
                code={`// Horizontal rows with gap
<div className="spark-row">No gap</div>
<div className="spark-row-2">Gap 0.5rem</div>
<div className="spark-row-4">Gap 1rem</div>
<div className="spark-row-6">Gap 1.5rem</div>
<div className="spark-row-8">Gap 2rem</div>

// Vertical stacks with gap
<div className="spark-stack">No gap</div>
<div className="spark-stack-2">Gap 0.5rem</div>
<div className="spark-stack-4">Gap 1rem</div>
<div className="spark-stack-6">Gap 1.5rem</div>
<div className="spark-stack-8">Gap 2rem</div>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Space Between</h3>
              <CodePreview
                preview={
                  <div className="spark-between bg-muted rounded-lg px-4 py-3">
                    <span className="text-sm font-medium">Logo</span>
                    <div className="spark-row-4 text-sm">
                      <span>Home</span>
                      <span>About</span>
                      <span>Contact</span>
                    </div>
                  </div>
                }
                code={`<div className="spark-between">
  <span>Left content</span>
  <span>Right content</span>
</div>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Containers</h3>
              <CodePreview
                preview={
                  <div className="space-y-3">
                    <div className="spark-container-narrow bg-muted/50 border border-dashed border-border rounded-lg p-3 text-center text-xs">
                      spark-container-narrow (max 640px)
                    </div>
                    <div className="spark-container-prose bg-muted/50 border border-dashed border-border rounded-lg p-3 text-center text-xs">
                      spark-container-prose (max 65ch)
                    </div>
                  </div>
                }
                code={`<div className="spark-container-narrow">Max 640px</div>
<div className="spark-container-prose">Max 65ch (ideal for reading)</div>
<div className="spark-container-wide">Max 1280px</div>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Aspect Ratios</h3>
              <CodePreview
                preview={
                  <div className="grid grid-cols-3 gap-4">
                    <div className="spark-aspect-card bg-muted rounded-lg spark-center text-xs font-medium">4:3</div>
                    <div className="spark-aspect-wide bg-muted rounded-lg spark-center text-xs font-medium">16:9</div>
                    <div className="spark-aspect-portrait bg-muted rounded-lg spark-center text-xs font-medium">3:4</div>
                  </div>
                }
                code={`<div className="spark-aspect-card">4:3 ratio</div>
<div className="spark-aspect-wide">16:9 ratio</div>
<div className="spark-aspect-portrait">3:4 ratio</div>
<div className="spark-aspect-golden">Golden ratio (1.618:1)</div>`}
              />
            </section>

            {/* Cards */}
            <section id="cards">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Card Utilities</h2>
              <p className="text-muted-foreground mb-6">Pre-styled card patterns for common use cases.</p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4">
                    <div className="spark-card-base p-4">
                      <p className="font-medium">spark-card-base</p>
                      <p className="text-sm text-muted-foreground">Basic card styling</p>
                    </div>
                    <div className="spark-card-elevated p-4">
                      <p className="font-medium">spark-card-elevated</p>
                      <p className="text-sm text-muted-foreground">With shadow</p>
                    </div>
                    <div className="spark-card-interactive p-4">
                      <p className="font-medium">spark-card-interactive</p>
                      <p className="text-sm text-muted-foreground">Hover to see effect</p>
                    </div>
                    <div className="spark-card-glass p-4 bg-gradient-mesh">
                      <p className="font-medium">spark-card-glass</p>
                      <p className="text-sm text-muted-foreground">Glassmorphism</p>
                    </div>
                  </div>
                }
                code={`<div className="spark-card-base p-4">Basic card</div>
<div className="spark-card-elevated p-4">Elevated card</div>
<div className="spark-card-interactive p-4">Interactive card</div>
<div className="spark-card-glass p-4">Glass card</div>`}
              />
            </section>

            {/* Miscellaneous */}
            <section id="misc">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Miscellaneous</h2>
              <p className="text-muted-foreground mb-6">Scrollbars, dividers, tags, and more.</p>

              <h3 className="text-lg font-medium mt-6 mb-4">Dividers</h3>
              <CodePreview
                preview={
                  <div className="space-y-6 w-full">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Horizontal</p>
                      <div className="space-y-4">
                        <div>
                          <span className="text-xs text-muted-foreground">spark-divider</span>
                          <div className="spark-divider mt-1" />
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">spark-divider-thick</span>
                          <div className="spark-divider-thick mt-1" />
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">spark-divider-gradient</span>
                          <div className="spark-divider-gradient mt-1" />
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">spark-divider-glow</span>
                          <div className="spark-divider-glow mt-1" />
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">spark-divider-dashed</span>
                          <div className="spark-divider-dashed mt-1" />
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">spark-divider-dotted</span>
                          <div className="spark-divider-dotted mt-1" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Vertical (use in flex containers)</p>
                      <div className="flex items-center gap-4 h-12">
                        <span className="text-sm">Item</span>
                        <div className="spark-divider-y h-full" />
                        <span className="text-sm">Item</span>
                        <div className="spark-divider-y-gradient h-full" />
                        <span className="text-sm">Item</span>
                        <div className="spark-divider-y-glow h-full" />
                        <span className="text-sm">Item</span>
                        <div className="spark-divider-y-dashed h-full" />
                        <span className="text-sm">Item</span>
                      </div>
                    </div>
                  </div>
                }
                code={`// Horizontal dividers
<div className="spark-divider" />
<div className="spark-divider-thick" />
<div className="spark-divider-gradient" />
<div className="spark-divider-glow" />
<div className="spark-divider-dashed" />
<div className="spark-divider-dotted" />

// Vertical dividers (set height or use h-full in flex)
<div className="spark-divider-y h-8" />
<div className="spark-divider-y-thick h-8" />
<div className="spark-divider-y-gradient h-8" />
<div className="spark-divider-y-glow h-8" />
<div className="spark-divider-y-dashed h-8" />

// Color variants (combine with base)
<div className="spark-divider spark-divider-primary" />
<div className="spark-divider spark-divider-muted" />`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Tags</h3>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-2">
                    <span className="spark-tag">Default</span>
                    <span className="spark-tag-primary">Primary</span>
                    <span className="spark-tag-success">Success</span>
                    <span className="spark-tag-warning">Warning</span>
                    <span className="spark-tag-danger">Danger</span>
                  </div>
                }
                code={`<span className="spark-tag">Default</span>
<span className="spark-tag-primary">Primary</span>
<span className="spark-tag-success">Success</span>
<span className="spark-tag-warning">Warning</span>
<span className="spark-tag-danger">Danger</span>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Scrollbar Styles</h3>
              <CodePreview
                preview={
                  <div className="flex gap-4">
                    <div className="scrollbar-thin h-24 w-40 overflow-y-auto bg-muted rounded-lg p-2">
                      <p className="text-sm">scrollbar-thin</p>
                      <p className="text-xs text-muted-foreground">Scroll me to see the thin scrollbar style. This content is long enough to scroll.</p>
                      <p className="text-xs text-muted-foreground mt-4">More content here...</p>
                      <p className="text-xs text-muted-foreground mt-4">And more...</p>
                    </div>
                    <div className="scrollbar-styled h-24 w-40 overflow-y-auto bg-muted rounded-lg p-2">
                      <p className="text-sm">scrollbar-styled</p>
                      <p className="text-xs text-muted-foreground">Scroll me to see the styled scrollbar. This content is long enough to scroll.</p>
                      <p className="text-xs text-muted-foreground mt-4">More content here...</p>
                      <p className="text-xs text-muted-foreground mt-4">And more...</p>
                    </div>
                  </div>
                }
                code={`<div className="scrollbar-hide">Hidden scrollbar</div>
<div className="scrollbar-thin">Thin scrollbar</div>
<div className="scrollbar-styled">Styled scrollbar</div>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Transitions</h3>
              <p className="text-muted-foreground mb-4">Hover over the boxes to see different transition speeds.</p>
              <CodePreview
                preview={
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Duration presets (hover to see):</p>
                    <div className="flex gap-3">
                      <div className="spark-transition-fast bg-muted hover:bg-primary hover:text-primary-foreground p-3 rounded-lg text-center text-sm font-medium cursor-pointer">
                        spark-transition-fast<br/><span className="text-xs opacity-70">150ms</span>
                      </div>
                      <div className="spark-transition-normal bg-muted hover:bg-primary hover:text-primary-foreground p-3 rounded-lg text-center text-sm font-medium cursor-pointer">
                        spark-transition-normal<br/><span className="text-xs opacity-70">200ms</span>
                      </div>
                      <div className="spark-transition-slow bg-muted hover:bg-primary hover:text-primary-foreground p-3 rounded-lg text-center text-sm font-medium cursor-pointer">
                        spark-transition-slow<br/><span className="text-xs opacity-70">300ms</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">Property-specific (hover to see):</p>
                    <div className="flex gap-3">
                      <div className="spark-transition-colors bg-muted hover:bg-secondary hover:text-secondary-foreground p-3 rounded-lg text-center text-sm font-medium cursor-pointer">
                        spark-transition-colors
                      </div>
                      <TransformDemo />
                      <div className="spark-transition-shadow hover:shadow-lg bg-muted p-3 rounded-lg text-center text-sm font-medium cursor-pointer">
                        spark-transition-shadow
                      </div>
                    </div>
                  </div>
                }
                code={`// Duration presets (all properties)
<div className="spark-transition-fast hover:bg-primary">150ms</div>
<div className="spark-transition-normal hover:bg-primary">200ms</div>
<div className="spark-transition-slow hover:bg-primary">300ms</div>

// Property-specific
<div className="spark-transition-colors hover:bg-secondary">Colors only</div>
<div className="spark-transition-transform hover:scale-110">Transform only</div>
<div className="spark-transition-shadow hover:shadow-lg">Shadow only</div>
<div className="spark-transition-opacity hover:opacity-50">Opacity only</div>

// Or use Tailwind's built-in:
<div className="transition duration-200 hover:scale-105">Tailwind transition</div>`}
              />
            </section>
          </div>
        </div>

        <div className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-6">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}