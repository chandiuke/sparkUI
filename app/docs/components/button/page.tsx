"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variants", title: "Variants" },
  { id: "colors", title: "Colors" },
  { id: "sizes", title: "Sizes" },
  { id: "icon-sizes", title: "Icon Sizes" },
  { id: "radius", title: "Radius" },
  { id: "with-icons", title: "With Icons" },
  { id: "loading", title: "Loading State" },
  { id: "disabled", title: "Disabled" },
  { id: "full-width", title: "Full Width" },
  { id: "as-link", title: "As Link" },
  { id: "button-group", title: "Button Group" },
  { id: "icon-only", title: "Icon Only" },
  { id: "custom-styles", title: "Custom Styles" },
  { id: "accessibility", title: "Accessibility" },
  { id: "props", title: "Props" },
];

export default function ButtonPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex gap-16">
        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Button</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A versatile button component with multiple variants, colors, sizes, and states.
            </p>
          </header>

          <div className="space-y-16">
            {/* Installation */}
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui add button" language="bash" />
            </section>

            {/* Usage */}
            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface MyButtonProps extends ButtonProps {
  label: string;
}

export default function Example({ label }: MyButtonProps): JSX.Element {
  const handleClick = (): void => {
    console.log("Button clicked!");
  };

  return (
    <Button onClick={handleClick}>
      {label}
    </Button>
  )
}`}
              />
            </section>

            {/* Variants */}
            <section id="variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Variants</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Seven visual styles to match your design: solid (filled), bordered (thick border), outline (thin border), faded (border that fills on hover), flat (subtle background), ghost (transparent), and shadow (elevated with shadow).
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="solid" color="primary">Solid</Button>
                    <Button variant="bordered" color="primary">Bordered</Button>
                    <Button variant="outline" color="primary">Outline</Button>
                    <Button variant="faded" color="primary">Faded</Button>
                    <Button variant="flat" color="primary">Flat</Button>
                    <Button variant="ghost" color="primary">Ghost</Button>
                    <Button variant="shadow" color="primary">Shadow</Button>
                  </div>
                }
                code={`<Button variant="solid" color="primary">Solid</Button>
<Button variant="bordered" color="primary">Bordered</Button>
<Button variant="outline" color="primary">Outline</Button>
<Button variant="faded" color="primary">Faded</Button>
<Button variant="flat" color="primary">Flat</Button>
<Button variant="ghost" color="primary">Ghost</Button>
<Button variant="shadow" color="primary">Shadow</Button>`}
              />
            </section>

            {/* Colors */}
            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Six semantic color options: default (neutral), primary (main action), secondary (alternative), success (positive), warning (caution), and danger (destructive).
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button color="default">Default</Button>
                    <Button color="primary">Primary</Button>
                    <Button color="secondary">Secondary</Button>
                    <Button color="success">Success</Button>
                    <Button color="warning">Warning</Button>
                    <Button color="danger">Danger</Button>
                  </div>
                }
                code={`<Button color="default">Default</Button>
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>`}
              />
            </section>

            {/* Sizes */}
            <section id="sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Three text button sizes: sm (32px), md (40px default), and lg (48px). For icon-only buttons, use the dedicated icon sizes.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm" color="primary">Small</Button>
                    <Button size="md" color="primary">Medium</Button>
                    <Button size="lg" color="primary">Large</Button>
                  </div>
                }
                code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
              />
            </section>

            {/* Icon Sizes */}
            <section id="icon-sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Icon Sizes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Dedicated sizes for icon-only buttons: icon-sm (32px), icon (40px), and icon-lg (48px).
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="icon-sm" color="primary">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
                    <Button size="icon" color="primary">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
                    <Button size="icon-lg" color="primary">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
                  </div>
                }
                code={`<Button size="icon-sm"><PlusIcon className="w-4 h-4" /></Button>
<Button size="icon"><PlusIcon className="w-5 h-5" /></Button>
<Button size="icon-lg"><PlusIcon className="w-6 h-6" /></Button>`}
              />
            </section>

            {/* Radius */}
            <section id="radius">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Radius</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Control border radius: none (sharp corners), sm, md (default), lg, or full (pill shape).
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button radius="none" color="primary">None</Button>
                    <Button radius="sm" color="primary">Small</Button>
                    <Button radius="md" color="primary">Medium</Button>
                    <Button radius="lg" color="primary">Large</Button>
                    <Button radius="full" color="primary">Full</Button>
                  </div>
                }
                code={`<Button radius="none">None</Button>
<Button radius="sm">Small</Button>
<Button radius="md">Medium</Button>
<Button radius="lg">Large</Button>
<Button radius="full">Full</Button>`}
              />
            </section>

            {/* With Icons */}
            <section id="with-icons">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Icons</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Add icons before or after the button text using startContent and endContent props. For icon-only buttons, use the icon size variants.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button
                      color="primary"
                      startContent={
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      }
                    >
                      Add Item
                    </Button>
                    <Button
                      color="secondary"
                      endContent={
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      }
                    >
                      Continue
                    </Button>
                    <Button color="primary" size="icon" radius="full">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
                  </div>
                }
                code={`<Button startContent={<PlusIcon />}>Add Item</Button>
<Button endContent={<ArrowIcon />}>Continue</Button>
<Button size="icon" radius="full"><PlusIcon /></Button>`}
              />
            </section>

            {/* Loading */}
            <section id="loading">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Loading State</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Add a loading spinner and disable interactions while an async operation is in progress. The button automatically shows a spinner and prevents clicks.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button color="primary" loading>Loading</Button>
                    <Button color="primary" loading={isLoading} onClick={handleLoadingClick}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                }
                code={`<Button loading>Loading</Button>
<Button loading={isLoading} onClick={handleClick}>
  {isLoading ? "Saving..." : "Save Changes"}
</Button>`}
              />
            </section>

            {/* Disabled */}
            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Disable the button to prevent user interaction. Disabled buttons have reduced opacity and no hover effects.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Disabled</Button>
                    <Button color="primary" disabled>Primary Disabled</Button>
                    <Button variant="bordered" disabled>Bordered Disabled</Button>
                  </div>
                }
                code={`<Button disabled>Disabled</Button>
<Button color="primary" disabled>Primary Disabled</Button>
<Button variant="bordered" disabled>Bordered Disabled</Button>`}
              />
            </section>

            {/* Full Width */}
            <section id="full-width">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Full Width</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Make the button span the full width of its container. Great for mobile layouts and form submit buttons.
              </p>
              <CodePreview
                preview={<Button color="primary" fullWidth>Full Width Button</Button>}
                code={`<Button fullWidth>Full Width Button</Button>`}
              />
            </section>

            {/* As Link */}
            <section id="as-link">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">As Link</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Render the button as an anchor tag for navigation. Maintains button styling while being semantically correct for links.
              </p>
              <CodePreview
                preview={
                  <Button as="a" href="https://github.com" color="primary">
                    Go to GitHub
                  </Button>
                }
                code={`<Button as="a" href="https://github.com">Go to GitHub</Button>`}
              />
            </section>

            {/* Button Group */}
            <section id="button-group">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Button Group</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Create connected button groups by removing radius and adding custom border classes. Perfect for segmented controls and toolbars.
              </p>
              <CodePreview
                preview={
                  <div className="flex">
                    <Button color="primary" radius="none" className="rounded-l-lg">Left</Button>
                    <Button color="primary" radius="none" className="border-l border-primary-foreground/20">Center</Button>
                    <Button color="primary" radius="none" className="rounded-r-lg border-l border-primary-foreground/20">Right</Button>
                  </div>
                }
                code={`<div className="flex">
  <Button color="primary" radius="none" className="rounded-l-lg">Left</Button>
  <Button color="primary" radius="none" className="border-l border-primary-foreground/20">Center</Button>
  <Button color="primary" radius="none" className="rounded-r-lg border-l border-primary-foreground/20">Right</Button>
</div>`}
              />
            </section>

            {/* Icon Only */}
            <section id="icon-only">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Icon Only</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Square buttons for icons. Use aria-label for accessibility since there&apos;s no visible text.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="icon" color="primary">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </Button>
                    <Button size="icon" variant="bordered" color="primary">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </Button>
                    <Button size="icon" variant="flat" color="danger">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                    <Button size="icon" radius="full" color="success">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </Button>
                  </div>
                }
                code={`<Button size="icon" color="primary"><HeartIcon /></Button>
<Button size="icon" variant="bordered" color="primary"><ShareIcon /></Button>
<Button size="icon" variant="flat" color="danger"><TrashIcon /></Button>
<Button size="icon" radius="full" color="success"><CheckIcon /></Button>`}
              />
            </section>

            {/* Custom Styles */}
            <section id="custom-styles">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Custom Styles</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Override default styles with custom Tailwind classes. Add gradients, custom borders, or any other styling.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0">Gradient</Button>
                    <Button variant="bordered" className="border-dashed">Dashed Border</Button>
                    <Button color="primary" className="uppercase tracking-wider">Uppercase</Button>
                  </div>
                }
                code={`<Button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0">Gradient</Button>
<Button variant="bordered" className="border-dashed">Dashed Border</Button>
<Button color="primary" className="uppercase tracking-wider">Uppercase</Button>`}
              />
            </section>

            {/* Accessibility */}
            <section id="accessibility">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Accessibility</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Built-in accessibility features: aria-disabled, aria-busy, role=button for links, focus-visible ring.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button color="primary" aria-label="Save document">Save</Button>
                    <Button size="icon" color="danger" aria-label="Delete item">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                    <Button color="primary" loading>Loading...</Button>
                  </div>
                }
                code={`// Icon buttons need aria-label
<Button size="icon" aria-label="Delete item"><TrashIcon /></Button>

// Loading adds aria-busy automatically
<Button loading>Loading...</Button>`}
              />
            </section>

            {/* Props */}
            <section id="props">
              <h2 className="text-xl font-semibold mb-6 scroll-mt-6">Props</h2>
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left py-4 px-5 font-medium">Prop</th>
                      <th className="text-left py-4 px-5 font-medium">Type</th>
                      <th className="text-left py-4 px-5 font-medium">Default</th>
                      <th className="text-left py-4 px-5 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">variant</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">solid | bordered | outline | faded | flat | ghost | shadow</td>
                      <td className="py-4 px-5 font-mono text-xs">solid</td>
                      <td className="py-4 px-5">Button style variant</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">color</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">default | primary | secondary | success | warning | danger</td>
                      <td className="py-4 px-5 font-mono text-xs">default</td>
                      <td className="py-4 px-5">Button color scheme</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">size</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">sm | md | lg | icon | icon-sm | icon-lg</td>
                      <td className="py-4 px-5 font-mono text-xs">md</td>
                      <td className="py-4 px-5">Button size</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">radius</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">none | sm | md | lg | full</td>
                      <td className="py-4 px-5 font-mono text-xs">md</td>
                      <td className="py-4 px-5">Border radius</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">disabled</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Disable the button</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">loading</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Show loading spinner</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">startContent</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Content before children</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">endContent</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Content after children</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">fullWidth</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Make button full width</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">as</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">&quot;button&quot; | &quot;a&quot;</td>
                      <td className="py-4 px-5 font-mono text-xs">button</td>
                      <td className="py-4 px-5">Render as anchor tag</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">href</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">URL when as=&quot;a&quot;</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">className</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Additional CSS classes</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">children</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Button content</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">ref</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">Ref</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Forward ref to DOM element</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* Table of Contents - Right Side */}
        <div className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-6">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
  );
}
