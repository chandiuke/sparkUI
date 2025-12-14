"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/page-transition";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionPlusIcon,
} from "@/components/ui/accordion";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variants", title: "Variants" },
  { id: "single-multiple", title: "Single vs Multiple" },
  { id: "default-expanded", title: "Default Expanded" },
  { id: "controlled", title: "Controlled" },
  { id: "with-subtitle", title: "With Subtitle" },
  { id: "custom-indicator", title: "Custom Indicator" },
  { id: "hide-indicator", title: "Hide Indicator" },
  { id: "disabled", title: "Disabled Items" },
  { id: "custom-content", title: "Custom Content" },
  { id: "props", title: "Props" },
];

const faqItems = [
  {
    question: "What is SparkUI?",
    answer: "SparkUI is a modern React component library built with Tailwind CSS and Framer Motion. It provides beautiful, accessible, and customizable components.",
  },
  {
    question: "Is SparkUI free to use?",
    answer: "Yes! SparkUI is completely free and open source. You can use it in personal and commercial projects.",
  },
  {
    question: "Does SparkUI support dark mode?",
    answer: "Absolutely! All components are designed with dark mode support out of the box using CSS variables and next-themes.",
  },
  {
    question: "Can I customize the components?",
    answer: "Yes, all components are highly customizable. You can override styles using className, modify the theme colors, or even copy the source code directly.",
  },
];

function ControlledAccordionDemo() {
  const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-2">
        <button
          onClick={() => setExpanded(["ctrl-1"])}
          className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Open First
        </button>
        <button
          onClick={() => setExpanded(["ctrl-1", "ctrl-2"])}
          className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
        >
          Open All
        </button>
        <button
          onClick={() => setExpanded([])}
          className="px-3 py-1.5 text-sm rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
        >
          Close All
        </button>
      </div>
      <Accordion 
        type="multiple"
        value={expanded} 
        onValueChange={setExpanded}
        variant="bordered"
      >
        <AccordionItem value="ctrl-1">
          <AccordionTrigger>First Item</AccordionTrigger>
          <AccordionContent>This accordion is controlled externally.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="ctrl-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>Use the buttons above to control the state.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="text-xs text-muted-foreground">
        Current state: {expanded.length > 0 ? expanded.join(", ") : "none"}
      </p>
    </div>
  );
}

export default function AccordionPage() {
  return (
    <PageWrapper>
      <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Accordion</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A vertically stacked set of interactive headings that reveal or hide content.
            </p>
          </header>

          <div className="space-y-16">
            {/* Installation */}
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui add accordion" language="bash" />
            </section>

            {/* Usage */}
            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The Accordion is composed of four parts: <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">Accordion</code> (root), <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">AccordionItem</code> (wrapper for each section), <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">AccordionTrigger</code> (clickable header), and <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">AccordionContent</code> (collapsible body). Each item needs a unique <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">value</code> prop.
              </p>
              <CodePreview
                preview={
                  <Accordion variant="bordered" className="w-full">
                    <AccordionItem value="usage-1">
                      <AccordionTrigger>What makes SparkUI different?</AccordionTrigger>
                      <AccordionContent>
                        SparkUI is built with pure Tailwind CSS and Framer Motion. No external UI dependencies - just copy, paste, and customize.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="usage-2">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes! All components follow WAI-ARIA guidelines with proper keyboard navigation, focus management, and screen reader support.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="usage-3">
                      <AccordionTrigger>Can I customize the animations?</AccordionTrigger>
                      <AccordionContent>
                        Absolutely. The accordion uses Framer Motion under the hood, so you can easily adjust timing, easing, and spring physics.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                }
                code={`import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion"

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What makes SparkUI different?",
    answer: "SparkUI is built with pure Tailwind CSS and Framer Motion."
  },
  {
    question: "Is it accessible?",
    answer: "Yes! All components follow WAI-ARIA guidelines."
  }
];

export default function FAQ(): JSX.Element {
  return (
    <Accordion variant="bordered">
      {faqData.map((item: FAQItem, index: number) => (
        <AccordionItem key={index} value={\`item-\${index}\`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}`}
              />
            </section>

            {/* Variants */}
            <section id="variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Variants</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Four visual styles: default, bordered, splitted, and shadow with hover effects.
              </p>
              <CodePreview
                preview={
                  <div className="space-y-8 w-full">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Default</p>
                      <Accordion variant="default">
                        <AccordionItem value="d1">
                          <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                          <AccordionContent>We offer a 30-day money-back guarantee on all purchases.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="d2">
                          <AccordionTrigger>How do I contact support?</AccordionTrigger>
                          <AccordionContent>You can reach us via email at support@example.com.</AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Bordered</p>
                      <Accordion variant="bordered">
                        <AccordionItem value="b1">
                          <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                          <AccordionContent>We offer a 30-day money-back guarantee on all purchases.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="b2">
                          <AccordionTrigger>How do I contact support?</AccordionTrigger>
                          <AccordionContent>You can reach us via email at support@example.com.</AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Splitted</p>
                      <Accordion variant="splitted">
                        <AccordionItem value="s1">
                          <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                          <AccordionContent>We offer a 30-day money-back guarantee on all purchases.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="s2">
                          <AccordionTrigger>How do I contact support?</AccordionTrigger>
                          <AccordionContent>You can reach us via email at support@example.com.</AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Shadow</p>
                      <Accordion variant="shadow">
                        <AccordionItem value="sh1">
                          <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                          <AccordionContent>We offer a 30-day money-back guarantee on all purchases.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sh2">
                          <AccordionTrigger>How do I contact support?</AccordionTrigger>
                          <AccordionContent>You can reach us via email at support@example.com.</AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                }
                code={`<Accordion variant="default">...</Accordion>
<Accordion variant="bordered">...</Accordion>
<Accordion variant="splitted">...</Accordion>
<Accordion variant="shadow">...</Accordion>`}
              />
            </section>

            {/* Single vs Multiple */}
            <section id="single-multiple">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Single vs Multiple</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Control how many items can be expanded at once using the <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">type</code> prop. 
                Use <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">single</code> (default) for FAQ-style accordions where only one answer is visible at a time. 
                Use <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm">multiple</code> when users need to compare content across sections or view several items simultaneously.
              </p>
              <CodePreview
                preview={
                  <div className="space-y-8 w-full">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">Single</span>
                        <span className="text-sm text-muted-foreground">Only one item open at a time</span>
                      </div>
                      <Accordion type="single" variant="bordered">
                        <AccordionItem value="s1">
                          <AccordionTrigger>How do I get started?</AccordionTrigger>
                          <AccordionContent>Install SparkUI via npm and import the components you need. Opening another item will close this one.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="s2">
                          <AccordionTrigger>What frameworks are supported?</AccordionTrigger>
                          <AccordionContent>SparkUI works with Next.js, Remix, and any React-based framework. Try clicking here - the first item closes automatically.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="s3">
                          <AccordionTrigger>Is TypeScript supported?</AccordionTrigger>
                          <AccordionContent>Yes! All components are written in TypeScript with full type definitions included.</AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground">Multiple</span>
                        <span className="text-sm text-muted-foreground">Multiple items can stay open</span>
                      </div>
                      <Accordion type="multiple" variant="bordered">
                        <AccordionItem value="m1">
                          <AccordionTrigger>Frontend Technologies</AccordionTrigger>
                          <AccordionContent>React, Vue, Angular, Svelte - compare by opening multiple sections at once.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="m2">
                          <AccordionTrigger>Backend Technologies</AccordionTrigger>
                          <AccordionContent>Node.js, Python, Go, Rust - this stays open while you explore other sections.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="m3">
                          <AccordionTrigger>Database Options</AccordionTrigger>
                          <AccordionContent>PostgreSQL, MongoDB, Redis - all three sections can be open simultaneously for easy comparison.</AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                }
                code={`// Single mode (default) - FAQ style, one item at a time
<Accordion type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2</AccordionTrigger>
    <AccordionContent>Answer 2</AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple mode - compare content, multiple open
<Accordion type="multiple">
  <AccordionItem value="section-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="section-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>`}
              />
            </section>

            {/* Default Expanded */}
            <section id="default-expanded">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Default Expanded</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use defaultExpanded to set which items are open by default.
              </p>
              <CodePreview
                preview={
                  <Accordion variant="bordered" defaultExpanded={["faq-1"]}>
                    {faqItems.slice(0, 3).map((item, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                }
                code={`<Accordion defaultExpanded={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>This is open by default</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>`}
              />
            </section>

            {/* Controlled */}
            <section id="controlled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Controlled</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use value and onValueChange for controlled state. Perfect for syncing with external state.
              </p>
              <CodePreview
                preview={
                  <ControlledAccordionDemo />
                }
                code={`import { useState } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

type AccordionValue = string[];

export default function ControlledAccordion(): JSX.Element {
  const [expanded, setExpanded] = useState<AccordionValue>([]);

  const handleOpenFirst = (): void => {
    setExpanded(["item-1"]);
  };

  const handleOpenAll = (): void => {
    setExpanded(["item-1", "item-2"]);
  };

  const handleCloseAll = (): void => {
    setExpanded([]);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={handleOpenFirst}>Open First</button>
        <button onClick={handleOpenAll}>Open All</button>
        <button onClick={handleCloseAll}>Close All</button>
      </div>
      
      <Accordion 
        type="multiple"
        value={expanded} 
        onValueChange={(value: AccordionValue) => setExpanded(value)}
        variant="bordered"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>First Item</AccordionTrigger>
          <AccordionContent>Content for first item</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>Content for second item</AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <p>Current: {expanded.length > 0 ? expanded.join(", ") : "none"}</p>
    </div>
  )
}`}
              />
            </section>

            {/* With Subtitle */}
            <section id="with-subtitle">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Subtitle</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Add secondary text to triggers using the subtitle prop.
              </p>
              <CodePreview
                preview={
                  <Accordion variant="shadow">
                    <AccordionItem value="sub1">
                      <AccordionTrigger subtitle="Learn about our return process">
                        Refund Policy
                      </AccordionTrigger>
                      <AccordionContent>We offer a 30-day money-back guarantee on all purchases. No questions asked.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sub2">
                      <AccordionTrigger subtitle="Multiple ways to reach us">
                        Contact Support
                      </AccordionTrigger>
                      <AccordionContent>Email us at support@example.com or use our live chat feature.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sub3">
                      <AccordionTrigger subtitle="Express and standard options">
                        Shipping Information
                      </AccordionTrigger>
                      <AccordionContent>Free shipping on orders over $50. Express delivery available for $9.99.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                }
                code={`<AccordionTrigger subtitle="Learn about our return process">
  Refund Policy
</AccordionTrigger>`}
              />
            </section>

            {/* Custom Indicator */}
            <section id="custom-indicator">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Custom Indicator</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use the indicator prop to customize the expand/collapse icon. Built-in AccordionPlusIcon available.
              </p>
              <CodePreview
                preview={
                  <Accordion variant="shadow">
                    <AccordionItem value="plus1">
                      <AccordionTrigger indicator={<AccordionPlusIcon className="text-primary" />}>
                        Plus/Minus indicator
                      </AccordionTrigger>
                      <AccordionContent>This uses the plus/minus icon style instead of chevron.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="plus2">
                      <AccordionTrigger indicator={<AccordionPlusIcon className="text-primary" />}>
                        Another item
                      </AccordionTrigger>
                      <AccordionContent>The plus transforms into a minus when expanded.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                }
                code={`import { AccordionPlusIcon } from "@/components/ui/accordion"

<AccordionTrigger indicator={<AccordionPlusIcon />}>
  Plus/Minus indicator
</AccordionTrigger>`}
              />
            </section>

            {/* Hide Indicator */}
            <section id="hide-indicator">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Hide Indicator</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use hideIndicator to remove the chevron entirely for a cleaner look.
              </p>
              <CodePreview
                preview={
                  <Accordion variant="bordered" hideIndicator>
                    <AccordionItem value="hide1">
                      <AccordionTrigger>Click anywhere to expand</AccordionTrigger>
                      <AccordionContent>No indicator icon - the entire row is clickable.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="hide2">
                      <AccordionTrigger>Another clean item</AccordionTrigger>
                      <AccordionContent>Perfect for minimal designs.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                }
                code={`<Accordion hideIndicator>
  <AccordionItem value="item-1">
    <AccordionTrigger>Click anywhere</AccordionTrigger>
    <AccordionContent>No indicator shown</AccordionContent>
  </AccordionItem>
</Accordion>`}
              />
            </section>

            {/* Disabled */}
            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled Items</h2>
              <CodePreview
                preview={
                  <Accordion variant="bordered">
                    <AccordionItem value="enabled">
                      <AccordionTrigger>Enabled item</AccordionTrigger>
                      <AccordionContent>This item can be expanded.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="disabled" isDisabled>
                      <AccordionTrigger>Disabled item</AccordionTrigger>
                      <AccordionContent>This content is hidden.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="another">
                      <AccordionTrigger>Another enabled item</AccordionTrigger>
                      <AccordionContent>This item works normally.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                }
                code={`<AccordionItem value="disabled" isDisabled>
  <AccordionTrigger>Disabled item</AccordionTrigger>
  <AccordionContent>Hidden content</AccordionContent>
</AccordionItem>`}
              />
            </section>

            {/* Custom Content */}
            <section id="custom-content">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Custom Content</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Accordion content can contain any React elements - forms, images, cards, and more.
              </p>
              <CodePreview
                preview={
                  <Accordion variant="shadow" type="multiple">
                    {/* Pricing Cards */}
                    <AccordionItem value="pricing">
                      <AccordionTrigger subtitle="Choose the plan that fits your needs">
                        Pricing Plans
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-muted border border-border/50 text-center hover:bg-muted/80 transition-colors cursor-pointer">
                            <p className="font-semibold text-foreground">Free</p>
                            <p className="text-3xl font-bold mt-1">$0</p>
                            <p className="text-xs text-muted-foreground mt-1">Forever</p>
                          </div>
                          <div className="p-4 rounded-xl bg-primary text-primary-foreground text-center relative overflow-hidden">
                            <span className="absolute top-1 right-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">Popular</span>
                            <p className="font-semibold">Pro</p>
                            <p className="text-3xl font-bold mt-1">$19</p>
                            <p className="text-xs opacity-80 mt-1">/month</p>
                          </div>
                          <div className="p-4 rounded-xl bg-muted border border-border/50 text-center hover:bg-muted/80 transition-colors cursor-pointer">
                            <p className="font-semibold text-foreground">Enterprise</p>
                            <p className="text-3xl font-bold mt-1">$99</p>
                            <p className="text-xs text-muted-foreground mt-1">/month</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Team Members */}
                    <AccordionItem value="team">
                      <AccordionTrigger subtitle="Meet the people behind SparkUI">
                        Team Members
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex gap-4">
                          {[
                            { name: "Alex", role: "Founder", avatar: "A" },
                            { name: "Sarah", role: "Designer", avatar: "S" },
                            { name: "Mike", role: "Developer", avatar: "M" },
                          ].map((member) => (
                            <div key={member.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border/50 flex-1">
                              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                {member.avatar}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Features with Progress */}
                    <AccordionItem value="features">
                      <AccordionTrigger subtitle="What you get with SparkUI">
                        Features
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {[
                            { name: "Components", value: 85, color: "bg-primary" },
                            { name: "Animations", value: 70, color: "bg-secondary" },
                            { name: "Accessibility", value: 95, color: "bg-success" },
                          ].map((item) => (
                            <div key={item.name}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-foreground">{item.name}</span>
                                <span className="text-muted-foreground">{item.value}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                                  style={{ width: `${item.value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Contact Form */}
                    <AccordionItem value="contact">
                      <AccordionTrigger subtitle="Get in touch with us">
                        Contact Form
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            placeholder="Your name" 
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                          />
                          <input 
                            type="email" 
                            placeholder="Email address" 
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                          />
                          <textarea 
                            placeholder="Your message" 
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                          />
                          <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                            Send Message
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                }
                code={`<AccordionContent>
  {/* Pricing Cards */}
  <div className="grid grid-cols-3 gap-4">
    <PricingCard />
  </div>

  {/* Team Members */}
  <div className="flex gap-4">
    <TeamMember name="Alex" role="Founder" />
  </div>

  {/* Progress Bars */}
  <ProgressBar label="Components" value={85} />

  {/* Contact Form */}
  <form>
    <input placeholder="Name" />
    <textarea placeholder="Message" />
    <button>Send</button>
  </form>
</AccordionContent>`}
              />
            </section>

            {/* Props */}
            <section id="props">
              <h2 className="text-xl font-semibold mb-6 scroll-mt-6">Props</h2>
              
              <h3 className="text-lg font-medium mb-3">Accordion</h3>
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
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">type</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">single | multiple</td>
                      <td className="py-4 px-5 font-mono text-xs">single</td>
                      <td className="py-4 px-5">Allow one or multiple items open</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">variant</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">default | bordered | splitted | shadow</td>
                      <td className="py-4 px-5 font-mono text-xs">default</td>
                      <td className="py-4 px-5">Visual style variant</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">defaultExpanded</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string[]</td>
                      <td className="py-4 px-5 font-mono text-xs">[]</td>
                      <td className="py-4 px-5">Items open by default (uncontrolled)</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">value</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string[]</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Controlled expanded items</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">onValueChange</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">(value: string[]) =&gt; void</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Callback when expanded items change</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">hideIndicator</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Hide the expand/collapse indicator</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">className</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium mb-3">AccordionItem</h3>
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
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">value</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">required</td>
                      <td className="py-4 px-5">Unique identifier for the item</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">isDisabled</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Disable the item</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">className</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium mb-3">AccordionTrigger</h3>
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
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">children</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">required</td>
                      <td className="py-4 px-5">Trigger label content</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">subtitle</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Secondary text below the title</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">indicator</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">Chevron</td>
                      <td className="py-4 px-5">Custom expand/collapse indicator</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">className</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-medium mb-3">AccordionContent</h3>
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
                      <td className="py-4 px-5 font-mono text-foreground text-sm">children</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">required</td>
                      <td className="py-4 px-5">Content to display when expanded</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">className</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-6">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
