"use client";

import { useState } from "react";
import { Badge, BadgeLabel, StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variants", title: "Variants" },
  { id: "colors", title: "Colors" },
  { id: "sizes", title: "Sizes" },
  { id: "placement", title: "Placement" },
  { id: "with-avatar", title: "With Avatar" },
  { id: "with-button", title: "With Button" },
  { id: "numeric", title: "Numeric Content" },
  { id: "dot", title: "Dot Badge" },
  { id: "ping", title: "Ping Animation" },
  { id: "glow", title: "Glow Effect" },
  { id: "invisible", title: "Invisible" },
  { id: "badge-label", title: "Badge Label" },
  { id: "status-badge", title: "Status Badge" },
  { id: "props", title: "Props" },
];

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default function BadgePage() {
  const [count, setCount] = useState(5);
  const [visible, setVisible] = useState(true);

  return (
          <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Badge</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Display notification counts, status indicators, and labels with style.
            </p>
          </header>

          <div className="space-y-16">
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui-cli add badge" language="bash" />
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { Badge, BadgeLabel, StatusBadge } from "@/components/ui/badge"

export default function Example() {
  return (
    <Badge content={5}>
      <Avatar src="..." />
    </Badge>
  )
}`}
              />
            </section>

            <section id="variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Variants</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge content={5} variant="solid" color="primary">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <BellIcon />
                      </div>
                    </Badge>
                    <Badge content={5} variant="flat" color="primary">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <BellIcon />
                      </div>
                    </Badge>
                    <Badge content={5} variant="bordered" color="primary">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <BellIcon />
                      </div>
                    </Badge>
                    <Badge content={5} variant="glow" color="primary">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <BellIcon />
                      </div>
                    </Badge>
                    <Badge content={5} variant="glass" color="primary">
                      <div className="w-12 h-12 rounded-xl bg-gradient flex items-center justify-center">
                        <BellIcon />
                      </div>
                    </Badge>
                  </div>
                }
                code={`<Badge content={5} variant="solid">...</Badge>
<Badge content={5} variant="flat">...</Badge>
<Badge content={5} variant="bordered">...</Badge>
<Badge content={5} variant="glow">...</Badge>
<Badge content={5} variant="glass">...</Badge>`}
              />
            </section>

            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge content={3} color="default">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                    <Badge content={3} color="primary">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                    <Badge content={3} color="secondary">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                    <Badge content={3} color="success">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                    <Badge content={3} color="warning">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                    <Badge content={3} color="danger">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                  </div>
                }
                code={`<Badge content={3} color="default">...</Badge>
<Badge content={3} color="primary">...</Badge>
<Badge content={3} color="secondary">...</Badge>
<Badge content={3} color="success">...</Badge>
<Badge content={3} color="warning">...</Badge>
<Badge content={3} color="danger">...</Badge>`}
              />
            </section>

            <section id="sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge content={9} size="sm" color="primary">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                    <Badge content={9} size="md" color="primary">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                    <Badge content={9} size="lg" color="primary">
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    </Badge>
                  </div>
                }
                code={`<Badge content={9} size="sm">...</Badge>
<Badge content={9} size="md">...</Badge>
<Badge content={9} size="lg">...</Badge>`}
              />
            </section>

            <section id="placement">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Placement</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-8">
                    <Badge content={1} placement="top-right" color="danger">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                    <Badge content={2} placement="top-left" color="danger">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                    <Badge content={3} placement="bottom-right" color="danger">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                    <Badge content={4} placement="bottom-left" color="danger">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                  </div>
                }
                code={`<Badge content={1} placement="top-right">...</Badge>
<Badge content={2} placement="top-left">...</Badge>
<Badge content={3} placement="bottom-right">...</Badge>
<Badge content={4} placement="bottom-left">...</Badge>`}
              />
            </section>


            <section id="with-avatar">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Avatar</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge content={3} color="danger">
                      <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" size="lg" />
                    </Badge>
                    <Badge variant="dot" color="success">
                      <Avatar src="https://randomuser.me/api/portraits/men/44.jpg" size="lg" />
                    </Badge>
                    <Badge content="NEW" color="primary" size="sm">
                      <Avatar src="https://randomuser.me/api/portraits/women/45.jpg" size="lg" />
                    </Badge>
                  </div>
                }
                code={`<Badge content={3} color="danger">
  <Avatar src="..." size="lg" />
</Badge>
<Badge variant="dot" color="success">
  <Avatar src="..." size="lg" />
</Badge>
<Badge content="NEW" color="primary" size="sm">
  <Avatar src="..." size="lg" />
</Badge>`}
              />
            </section>

            <section id="with-button">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Button</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge content={5} color="danger">
                      <Button size="icon" variant="ghost">
                        <BellIcon />
                      </Button>
                    </Badge>
                    <Badge content={12} color="primary">
                      <Button size="icon" variant="bordered">
                        <MailIcon />
                      </Button>
                    </Badge>
                    <Badge content={3} color="success">
                      <Button size="icon" variant="flat" color="success">
                        <CartIcon />
                      </Button>
                    </Badge>
                  </div>
                }
                code={`<Badge content={5} color="danger">
  <Button size="icon" variant="ghost"><BellIcon /></Button>
</Badge>
<Badge content={12} color="primary">
  <Button size="icon" variant="bordered"><MailIcon /></Button>
</Badge>`}
              />
            </section>

            <section id="numeric">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Numeric Content</h2>
              <p className="text-muted-foreground mb-6">Numbers over max (default 99) show as 99+. Use showZero to display zero.</p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge content={count} color="danger">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <BellIcon />
                      </div>
                    </Badge>
                    <Badge content={150} color="danger">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <MailIcon />
                      </div>
                    </Badge>
                    <Badge content={0} showZero color="primary">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <CartIcon />
                      </div>
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setCount(Math.max(0, count - 1))}>-</Button>
                      <Button size="sm" onClick={() => setCount(count + 1)}>+</Button>
                    </div>
                  </div>
                }
                code={`<Badge content={5}>...</Badge>
<Badge content={150}>...</Badge>  {/* Shows 99+ */}
<Badge content={0} showZero>...</Badge>
<Badge content={100} max={999}>...</Badge>  {/* Custom max */}`}
              />
            </section>

            <section id="dot">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Dot Badge</h2>
              <p className="text-muted-foreground mb-6">Simple dot indicator without content.</p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge variant="dot" color="success">
                      <Avatar src="https://randomuser.me/api/portraits/women/46.jpg" />
                    </Badge>
                    <Badge variant="dot" color="warning">
                      <Avatar src="https://randomuser.me/api/portraits/men/46.jpg" />
                    </Badge>
                    <Badge variant="dot" color="danger">
                      <Avatar src="https://randomuser.me/api/portraits/women/47.jpg" />
                    </Badge>
                    <Badge variant="dot" color="primary">
                      <Button size="icon" variant="ghost"><BellIcon /></Button>
                    </Badge>
                  </div>
                }
                code={`<Badge variant="dot" color="success">
  <Avatar src="..." />
</Badge>
<Badge variant="dot" color="warning">
  <Avatar src="..." />
</Badge>
<Badge variant="dot" color="danger">
  <Avatar src="..." />
</Badge>`}
              />
            </section>

            <section id="ping">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Ping Animation</h2>
              <p className="text-muted-foreground mb-6">Add attention-grabbing ping animation.</p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge content={3} ping color="danger">
                      <Button size="icon" variant="ghost"><BellIcon /></Button>
                    </Badge>
                    <Badge variant="dot" ping color="success">
                      <Avatar src="https://randomuser.me/api/portraits/men/47.jpg" size="lg" />
                    </Badge>
                    <Badge content="LIVE" ping color="danger" size="sm">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                  </div>
                }
                code={`<Badge content={3} ping color="danger">
  <Button size="icon"><BellIcon /></Button>
</Badge>
<Badge variant="dot" ping color="success">
  <Avatar src="..." />
</Badge>
<Badge content="LIVE" ping color="danger">
  ...
</Badge>`}
              />
            </section>

            <section id="glow">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Glow Effect</h2>
              <p className="text-muted-foreground mb-6">Add a glowing shadow effect to make badges pop.</p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge content={5} variant="glow" color="primary">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                    <Badge content={5} variant="glow" color="secondary">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                    <Badge content={5} variant="glow" color="success">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                    <Badge content={5} variant="glow" color="danger">
                      <div className="w-12 h-12 rounded-xl bg-muted" />
                    </Badge>
                  </div>
                }
                code={`<Badge content={5} variant="glow" color="primary">...</Badge>
<Badge content={5} variant="glow" color="secondary">...</Badge>
<Badge content={5} variant="glow" color="success">...</Badge>
<Badge content={5} variant="glow" color="danger">...</Badge>`}
              />
            </section>

            <section id="invisible">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Invisible</h2>
              <p className="text-muted-foreground mb-6">Toggle badge visibility without removing it from DOM.</p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <Badge content={5} invisible={!visible} color="danger">
                      <Button size="icon" variant="ghost"><BellIcon /></Button>
                    </Badge>
                    <Button size="sm" onClick={() => setVisible(!visible)}>
                      {visible ? "Hide" : "Show"} Badge
                    </Button>
                  </div>
                }
                code={`<Badge content={5} invisible={!visible}>
  <Button size="icon"><BellIcon /></Button>
</Badge>`}
              />
            </section>

            <section id="badge-label">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Badge Label</h2>
              <p className="text-muted-foreground mb-6">Standalone inline badges for tags, labels, and status indicators.</p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <BadgeLabel color="default">Default</BadgeLabel>
                    <BadgeLabel color="primary">Primary</BadgeLabel>
                    <BadgeLabel color="secondary">Secondary</BadgeLabel>
                    <BadgeLabel color="success">Success</BadgeLabel>
                    <BadgeLabel color="warning">Warning</BadgeLabel>
                    <BadgeLabel color="danger">Danger</BadgeLabel>
                  </div>
                }
                code={`<BadgeLabel color="default">Default</BadgeLabel>
<BadgeLabel color="primary">Primary</BadgeLabel>
<BadgeLabel color="secondary">Secondary</BadgeLabel>
<BadgeLabel color="success">Success</BadgeLabel>
<BadgeLabel color="warning">Warning</BadgeLabel>
<BadgeLabel color="danger">Danger</BadgeLabel>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Label Variants</h3>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <BadgeLabel variant="solid" color="primary">Solid</BadgeLabel>
                    <BadgeLabel variant="flat" color="primary">Flat</BadgeLabel>
                    <BadgeLabel variant="bordered" color="primary">Bordered</BadgeLabel>
                  </div>
                }
                code={`<BadgeLabel variant="solid">Solid</BadgeLabel>
<BadgeLabel variant="flat">Flat</BadgeLabel>
<BadgeLabel variant="bordered">Bordered</BadgeLabel>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">With Dot & Close</h3>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <BadgeLabel dot color="success">Online</BadgeLabel>
                    <BadgeLabel dot ping color="danger">Live</BadgeLabel>
                    <BadgeLabel color="primary" onClose={() => alert("Closed!")}>Removable</BadgeLabel>
                    <BadgeLabel dot color="warning" onClose={() => {}}>Tag</BadgeLabel>
                  </div>
                }
                code={`<BadgeLabel dot color="success">Online</BadgeLabel>
<BadgeLabel dot ping color="danger">Live</BadgeLabel>
<BadgeLabel color="primary" onClose={() => {}}>Removable</BadgeLabel>
<BadgeLabel dot color="warning" onClose={() => {}}>Tag</BadgeLabel>`}
              />
            </section>

            <section id="status-badge">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Status Badge</h2>
              <p className="text-muted-foreground mb-6">Pre-configured status indicators for common use cases.</p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <StatusBadge status="online" />
                      <span className="text-sm">Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status="away" />
                      <span className="text-sm">Away</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status="busy" />
                      <span className="text-sm">Busy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status="offline" />
                      <span className="text-sm">Offline</span>
                    </div>
                  </div>
                }
                code={`<StatusBadge status="online" />
<StatusBadge status="away" />
<StatusBadge status="busy" />
<StatusBadge status="offline" />`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">With Labels</h3>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status="online" showLabel />
                    <StatusBadge status="away" showLabel />
                    <StatusBadge status="busy" showLabel />
                    <StatusBadge status="offline" showLabel />
                  </div>
                }
                code={`<StatusBadge status="online" showLabel />
<StatusBadge status="away" showLabel />
<StatusBadge status="busy" showLabel />
<StatusBadge status="offline" showLabel />`}
              />
            </section>


            <section id="props">
              <h2 className="text-xl font-semibold mb-6 scroll-mt-6">Props</h2>
              
              <h3 className="text-lg font-medium mb-4">Badge</h3>
              <div className="overflow-x-auto rounded-xl border border-border bg-card mb-8">
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
                    {[
                      ["children", "ReactNode", "-", "Element to badge"],
                      ["content", "ReactNode", "-", "Badge content (number/text)"],
                      ["variant", "solid | flat | bordered | dot | glow | glass", "solid", "Visual style"],
                      ["color", "default | primary | secondary | success | warning | danger", "danger", "Badge color"],
                      ["size", "sm | md | lg", "md", "Badge size"],
                      ["radius", "none | sm | md | lg | full", "full", "Border radius"],
                      ["placement", "top-right | top-left | bottom-right | bottom-left", "top-right", "Badge position"],
                      ["invisible", "boolean", "false", "Hide badge"],
                      ["showZero", "boolean", "false", "Show when content is 0"],
                      ["max", "number", "99", "Max number before showing +"],
                      ["ping", "boolean", "false", "Ping animation"],
                      ["outline", "boolean", "true", "Show outline border"],
                      ["badgeClassName", "string", "-", "Custom badge classes"],
                    ].map(([prop, type, def, desc]) => (
                      <tr key={prop} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-5 font-mono text-foreground text-sm">{prop}</td>
                        <td className="py-4 px-5 font-mono text-xs text-primary/80">{type}</td>
                        <td className="py-4 px-5 font-mono text-xs">{def}</td>
                        <td className="py-4 px-5 text-xs">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium mb-4">BadgeLabel</h3>
              <div className="overflow-x-auto rounded-xl border border-border bg-card mb-8">
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
                    {[
                      ["children", "ReactNode", "-", "Label text"],
                      ["variant", "solid | flat | bordered | glow | glass", "solid", "Visual style"],
                      ["color", "default | primary | secondary | success | warning | danger", "default", "Label color"],
                      ["size", "sm | md | lg", "md", "Label size"],
                      ["radius", "none | sm | md | lg | full", "full", "Border radius"],
                      ["dot", "boolean", "false", "Show status dot"],
                      ["ping", "boolean", "false", "Ping animation on dot"],
                      ["outline", "boolean", "false", "Show outline border"],
                      ["startContent", "ReactNode", "-", "Content before text"],
                      ["endContent", "ReactNode", "-", "Content after text"],
                      ["onClose", "() => void", "-", "Close button handler"],
                    ].map(([prop, type, def, desc]) => (
                      <tr key={prop} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-5 font-mono text-foreground text-sm">{prop}</td>
                        <td className="py-4 px-5 font-mono text-xs text-primary/80">{type}</td>
                        <td className="py-4 px-5 font-mono text-xs">{def}</td>
                        <td className="py-4 px-5 text-xs">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium mb-4">StatusBadge</h3>
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
                    {[
                      ["status", "online | offline | away | busy | invisible", "-", "Status type"],
                      ["size", "sm | md | lg", "md", "Badge size"],
                      ["showLabel", "boolean", "false", "Show status text"],
                    ].map(([prop, type, def, desc]) => (
                      <tr key={prop} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-5 font-mono text-foreground text-sm">{prop}</td>
                        <td className="py-4 px-5 font-mono text-xs text-primary/80">{type}</td>
                        <td className="py-4 px-5 font-mono text-xs">{def}</td>
                        <td className="py-4 px-5 text-xs">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        <div className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-6">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
  );
}
