"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/page-transition";
import { Chip, AnimatePresence } from "@/components/ui/chip";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variants", title: "Variants" },
  { id: "colors", title: "Colors" },
  { id: "sizes", title: "Sizes" },
  { id: "radius", title: "Radius" },
  { id: "with-avatar", title: "With Avatar" },
  { id: "closeable", title: "Closeable" },
  { id: "selectable", title: "Selectable" },
  { id: "clickable", title: "Clickable" },
  { id: "as-link", title: "As Link" },
  { id: "with-icons", title: "With Icons" },
  { id: "disabled", title: "Disabled" },
  { id: "props", title: "Props" },
];

const initialChips = ["React", "Vue", "Angular", "Svelte"];
const filterOptions = ["All", "Active", "Completed", "Archived"];

export default function ChipPage() {
  const [chips, setChips] = useState(initialChips);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"]);

  const removeChip = (chip: string) => {
    setChips(chips.filter((c) => c !== chip));
  };

  const resetChips = () => {
    setChips(initialChips);
  };

  const toggleFilter = (filter: string) => {
    if (filter === "All") {
      setSelectedFilters(["All"]);
    } else {
      const newFilters = selectedFilters.includes(filter)
        ? selectedFilters.filter((f) => f !== filter)
        : [...selectedFilters.filter((f) => f !== "All"), filter];
      setSelectedFilters(newFilters.length === 0 ? ["All"] : newFilters);
    }
  };

  return (
    <PageWrapper>
      <div className="flex gap-16">
        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Chip</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A compact element for displaying tags, labels, or status indicators.
            </p>
          </header>

          <div className="space-y-16">
            {/* Installation */}
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui add chip" language="bash" />
            </section>

            {/* Usage */}
            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { useState } from "react"
import { Chip, AnimatePresence } from "@/components/ui/chip"

interface Tag {
  id: number;
  label: string;
  color: "primary" | "secondary" | "success";
}

export default function TagList(): JSX.Element {
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, label: "React", color: "primary" },
    { id: 2, label: "TypeScript", color: "secondary" },
  ]);

  const removeTag = (id: number): void => {
    setTags((prev: Tag[]) => prev.filter((tag: Tag) => tag.id !== id));
  };

  return (
    <div className="flex gap-2">
      <AnimatePresence>
        {tags.map((tag: Tag) => (
          <Chip 
            key={tag.id} 
            color={tag.color}
            onClose={() => removeTag(tag.id)}
          >
            {tag.label}
          </Chip>
        ))}
      </AnimatePresence>
    </div>
  )
}`}
              />
            </section>

            {/* Variants */}
            <section id="variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Variants</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Chip variant="solid" color="primary">Solid</Chip>
                    <Chip variant="bordered" color="primary">Bordered</Chip>
                    <Chip variant="flat" color="primary">Flat</Chip>
                    <Chip variant="faded" color="primary">Faded</Chip>
                    <Chip variant="dot" color="primary">Dot</Chip>
                  </div>
                }
                code={`<Chip variant="solid" color="primary">Solid</Chip>
<Chip variant="bordered" color="primary">Bordered</Chip>
<Chip variant="flat" color="primary">Flat</Chip>
<Chip variant="faded" color="primary">Faded</Chip>
<Chip variant="dot" color="primary">Dot</Chip>`}
              />
            </section>

            {/* Colors */}
            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Chip color="default">Default</Chip>
                    <Chip color="primary">Primary</Chip>
                    <Chip color="secondary">Secondary</Chip>
                    <Chip color="success">Success</Chip>
                    <Chip color="warning">Warning</Chip>
                    <Chip color="danger">Danger</Chip>
                  </div>
                }
                code={`<Chip color="default">Default</Chip>
<Chip color="primary">Primary</Chip>
<Chip color="secondary">Secondary</Chip>
<Chip color="success">Success</Chip>
<Chip color="warning">Warning</Chip>
<Chip color="danger">Danger</Chip>`}
              />
            </section>

            {/* Sizes */}
            <section id="sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center gap-3">
                    <Chip size="sm" color="primary">Small</Chip>
                    <Chip size="md" color="primary">Medium</Chip>
                    <Chip size="lg" color="primary">Large</Chip>
                  </div>
                }
                code={`<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`}
              />
            </section>

            {/* Radius */}
            <section id="radius">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Radius</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Chip radius="none" color="primary">None</Chip>
                    <Chip radius="sm" color="primary">Small</Chip>
                    <Chip radius="md" color="primary">Medium</Chip>
                    <Chip radius="lg" color="primary">Large</Chip>
                    <Chip radius="full" color="primary">Full</Chip>
                  </div>
                }
                code={`<Chip radius="none">None</Chip>
<Chip radius="sm">Small</Chip>
<Chip radius="md">Medium</Chip>
<Chip radius="lg">Large</Chip>
<Chip radius="full">Full</Chip>`}
              />
            </section>

            {/* With Avatar */}
            <section id="with-avatar">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Avatar</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Chip
                      color="primary"
                      avatar={
                        <img
                          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      }
                    >
                      John Doe
                    </Chip>
                    <Chip
                      variant="bordered"
                      color="secondary"
                      avatar={
                        <img
                          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      }
                    >
                      Jane Smith
                    </Chip>
                    <Chip
                      variant="flat"
                      color="success"
                      avatar={
                        <span className="w-full h-full bg-success text-success-foreground flex items-center justify-center text-xs font-bold">
                          AB
                        </span>
                      }
                    >
                      Alex Brown
                    </Chip>
                  </div>
                }
                code={`<Chip avatar={<img src="..." alt="Avatar" />}>
  John Doe
</Chip>

<Chip avatar={<span className="...">AB</span>}>
  Alex Brown
</Chip>`}
              />
            </section>

            {/* Closeable */}
            <section id="closeable">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Closeable</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Add an onClose handler to make chips dismissible. Wrap with AnimatePresence for smooth exit animations.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <AnimatePresence mode="popLayout">
                        {chips.map((chip) => (
                          <Chip
                            key={chip}
                            color="primary"
                            onClose={() => removeChip(chip)}
                          >
                            {chip}
                          </Chip>
                        ))}
                      </AnimatePresence>
                    </div>
                    {chips.length < initialChips.length && (
                      <button
                        onClick={resetChips}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reset
                      </button>
                    )}
                  </div>
                }
                code={`import { useState } from "react"
import { Chip, AnimatePresence } from "@/components/ui/chip"

type ChipLabel = string;

export default function CloseableChips(): JSX.Element {
  const [chips, setChips] = useState<ChipLabel[]>(["React", "Vue", "Angular"]);

  const removeChip = (chipToRemove: ChipLabel): void => {
    setChips((prev: ChipLabel[]) => prev.filter((c: ChipLabel) => c !== chipToRemove));
  };

  return (
    <AnimatePresence mode="popLayout">
      {chips.map((chip: ChipLabel) => (
        <Chip
          key={chip}
          onClose={() => removeChip(chip)}
        >
          {chip}
        </Chip>
      ))}
    </AnimatePresence>
  )
}`}
              />
            </section>

            {/* Selectable */}
            <section id="selectable">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Selectable</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use isSelected with onClick to create filter chips. Selected chips show a checkmark and ring indicator.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    {filterOptions.map((filter) => (
                      <Chip
                        key={filter}
                        color="primary"
                        variant="flat"
                        isSelected={selectedFilters.includes(filter)}
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter}
                      </Chip>
                    ))}
                  </div>
                }
                code={`import { useState } from "react"
import { Chip } from "@/components/ui/chip"

type FilterOption = "All" | "Active" | "Completed" | "Archived";

const filters: FilterOption[] = ["All", "Active", "Completed", "Archived"];

export default function FilterChips(): JSX.Element {
  const [selected, setSelected] = useState<FilterOption[]>(["All"]);

  const toggleFilter = (filter: FilterOption): void => {
    if (filter === "All") {
      setSelected(["All"]);
    } else {
      setSelected((prev: FilterOption[]) => {
        const withoutAll = prev.filter((f: FilterOption) => f !== "All");
        return prev.includes(filter)
          ? withoutAll.filter((f: FilterOption) => f !== filter)
          : [...withoutAll, filter];
      });
    }
  };

  return (
    <div className="flex gap-2">
      {filters.map((filter: FilterOption) => (
        <Chip
          key={filter}
          variant="flat"
          isSelected={selected.includes(filter)}
          onClick={() => toggleFilter(filter)}
        >
          {filter}
        </Chip>
      ))}
    </div>
  )
}`}
              />
            </section>

            {/* Clickable */}
            <section id="clickable">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Clickable</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Add onClick to make chips interactive. Clickable chips have hover scale and press effects.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Chip color="primary" onClick={() => alert("Clicked!")}>
                      Click me
                    </Chip>
                    <Chip color="secondary" variant="bordered" onClick={() => alert("Bordered clicked!")}>
                      Bordered
                    </Chip>
                    <Chip color="success" variant="flat" onClick={() => alert("Flat clicked!")}>
                      Flat
                    </Chip>
                  </div>
                }
                code={`<Chip onClick={() => handleClick()}>Click me</Chip>
<Chip variant="bordered" onClick={() => handleClick()}>Bordered</Chip>
<Chip variant="flat" onClick={() => handleClick()}>Flat</Chip>`}
              />
            </section>

            {/* As Link */}
            <section id="as-link">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">As Link</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use as=&quot;a&quot; with href to render chips as links.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Chip as="a" href="https://github.com" color="primary">
                      GitHub
                    </Chip>
                    <Chip as="a" href="https://twitter.com" color="secondary" variant="bordered">
                      Twitter
                    </Chip>
                    <Chip as="a" href="https://discord.com" color="success" variant="flat">
                      Discord
                    </Chip>
                  </div>
                }
                code={`<Chip as="a" href="https://github.com">GitHub</Chip>
<Chip as="a" href="https://twitter.com" variant="bordered">Twitter</Chip>
<Chip as="a" href="https://discord.com" variant="flat">Discord</Chip>`}
              />
            </section>

            {/* With Icons */}
            <section id="with-icons">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Icons</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Chip
                      color="success"
                      startContent={
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      }
                    >
                      Completed
                    </Chip>
                    <Chip
                      color="warning"
                      startContent={
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                    >
                      Pending
                    </Chip>
                    <Chip
                      color="danger"
                      startContent={
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      }
                    >
                      Failed
                    </Chip>
                  </div>
                }
                code={`<Chip color="success" startContent={<CheckIcon />}>
  Completed
</Chip>
<Chip color="warning" startContent={<ClockIcon />}>
  Pending
</Chip>
<Chip color="danger" startContent={<XIcon />}>
  Failed
</Chip>`}
              />
            </section>

            {/* Disabled */}
            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Chip isDisabled>Disabled</Chip>
                    <Chip color="primary" isDisabled>Primary Disabled</Chip>
                    <Chip color="success" isDisabled onClose={() => {}}>With Close</Chip>
                  </div>
                }
                code={`<Chip isDisabled>Disabled</Chip>
<Chip color="primary" isDisabled>Primary Disabled</Chip>
<Chip isDisabled onClose={() => {}}>With Close</Chip>`}
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
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">solid | bordered | flat | faded | dot</td>
                      <td className="py-4 px-5 font-mono text-xs">solid</td>
                      <td className="py-4 px-5">Chip style variant</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">color</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">default | primary | secondary | success | warning | danger</td>
                      <td className="py-4 px-5 font-mono text-xs">default</td>
                      <td className="py-4 px-5">Chip color scheme</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">size</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">sm | md | lg</td>
                      <td className="py-4 px-5 font-mono text-xs">md</td>
                      <td className="py-4 px-5">Chip size</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">radius</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">none | sm | md | lg | full</td>
                      <td className="py-4 px-5 font-mono text-xs">full</td>
                      <td className="py-4 px-5">Border radius</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">avatar</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Avatar element at start</td>
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
                      <td className="py-4 px-5 font-mono text-foreground text-sm">onClose</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">() =&gt; void</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Close button handler</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">onClick</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">() =&gt; void</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Click handler (makes chip interactive)</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">isSelected</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Selected state with ring indicator</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">isDisabled</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Disable the chip</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">as</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">&quot;span&quot; | &quot;a&quot;</td>
                      <td className="py-4 px-5 font-mono text-xs">span</td>
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
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">children</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">ReactNode</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Chip content</td>
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
    </PageWrapper>
  );
}
