"use client";

import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonImage,
  SkeletonButton,
  SkeletonInput,
  SkeletonProfile,
  SkeletonArticle,
  SkeletonComment,
  SkeletonProduct,
  SkeletonStat,
  SkeletonForm,
  SkeletonNav,
} from "@/components/ui/skeleton";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "animations", title: "Animations" },
  { id: "colors", title: "Colors" },
  { id: "basic", title: "Basic Shapes" },
  { id: "text", title: "Text" },
  { id: "avatar", title: "Avatar" },
  { id: "card", title: "Card" },
  { id: "table", title: "Table" },
  { id: "list", title: "List" },
  { id: "presets", title: "Presets" },
  { id: "props", title: "Props" },
];

export default function SkeletonPage() {
  return (
          <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Skeleton</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Loading placeholders that mimic content structure. Multiple animations and presets for every use case.
            </p>
          </header>

          <div className="space-y-16">
            {/* Installation */}
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui add skeleton" language="bash" />
            </section>


            {/* Usage */}
            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton"

// Basic skeleton
<Skeleton className="h-4 w-full" />

// With isLoaded prop for conditional rendering
<Skeleton isLoaded={isLoaded}>
  <p>Content loads here</p>
</Skeleton>

// Preset components
<SkeletonCard />
<SkeletonText lines={3} />`}
              />
            </section>

            {/* Animations */}
            <section id="animations">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Animations</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Four animation styles: pulse (default), wave, shimmer, and none.
              </p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Pulse</p>
                      <Skeleton animation="pulse" className="h-12 w-full" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Wave</p>
                      <Skeleton animation="wave" className="h-12 w-full" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Shimmer</p>
                      <Skeleton animation="shimmer" className="h-12 w-full" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">None</p>
                      <Skeleton animation="none" className="h-12 w-full" />
                    </div>
                  </div>
                }
                code={`<Skeleton animation="pulse" />
<Skeleton animation="wave" />
<Skeleton animation="shimmer" />
<Skeleton animation="none" />`}
              />
            </section>

            {/* Colors */}
            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use theme colors or custom colors for branded loading states.
              </p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Default</p>
                      <Skeleton color="default" className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Primary</p>
                      <Skeleton color="primary" className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Secondary</p>
                      <Skeleton color="secondary" className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Success</p>
                      <Skeleton color="success" className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Warning</p>
                      <Skeleton color="warning" className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Danger</p>
                      <Skeleton color="danger" className="h-10 w-full" />
                    </div>
                    <div className="space-y-2 col-span-3">
                      <p className="text-xs text-muted-foreground">Custom Color</p>
                      <Skeleton color="custom" customColor="rgba(139, 92, 246, 0.3)" className="h-10 w-full" />
                    </div>
                  </div>
                }
                code={`<Skeleton color="default" />
<Skeleton color="primary" />
<Skeleton color="secondary" />
<Skeleton color="success" />
<Skeleton color="warning" />
<Skeleton color="danger" />
<Skeleton color="custom" customColor="rgba(139, 92, 246, 0.3)" />`}
              />
            </section>

            {/* Basic Shapes */}
            <section id="basic">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Basic Shapes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Create any shape with width, height, and radius props.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap items-end gap-4">
                    <Skeleton width={100} height={100} radius="none" />
                    <Skeleton width={100} height={100} radius="md" />
                    <Skeleton width={100} height={100} radius="xl" />
                    <Skeleton width={100} height={100} radius="full" />
                    <Skeleton width={200} height={40} radius="lg" />
                  </div>
                }
                code={`<Skeleton width={100} height={100} radius="none" />
<Skeleton width={100} height={100} radius="md" />
<Skeleton width={100} height={100} radius="xl" />
<Skeleton width={100} height={100} radius="full" />
<Skeleton width={200} height={40} radius="lg" />`}
              />
            </section>

            {/* Text */}
            <section id="text">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Text</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Multi-line text placeholder with customizable line count.
              </p>
              <CodePreview
                preview={
                  <div className="space-y-8 max-w-md">
                    <SkeletonText lines={2} />
                    <SkeletonText lines={4} lastLineWidth="40%" />
                  </div>
                }
                code={`<SkeletonText lines={2} />
<SkeletonText lines={4} lastLineWidth="40%" />`}
              />
            </section>

            {/* Avatar */}
            <section id="avatar">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Avatar</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Circular avatar placeholders in multiple sizes.
              </p>
              <CodePreview
                preview={
                  <div className="flex items-end gap-4">
                    <SkeletonAvatar size="xs" />
                    <SkeletonAvatar size="sm" />
                    <SkeletonAvatar size="md" />
                    <SkeletonAvatar size="lg" />
                    <SkeletonAvatar size="xl" />
                    <SkeletonAvatar size="2xl" />
                  </div>
                }
                code={`<SkeletonAvatar size="xs" />
<SkeletonAvatar size="sm" />
<SkeletonAvatar size="md" />
<SkeletonAvatar size="lg" />
<SkeletonAvatar size="xl" />
<SkeletonAvatar size="2xl" />`}
              />
            </section>

            {/* Card */}
            <section id="card">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Card</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Complete card skeleton with image, text, and actions.
              </p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4 max-w-2xl">
                    <SkeletonCard />
                    <SkeletonCard hasImage={false} hasAvatar={true} />
                  </div>
                }
                code={`<SkeletonCard />
<SkeletonCard hasImage={false} hasAvatar={true} />`}
              />
            </section>

            {/* Table */}
            <section id="table">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Table</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Table skeleton with configurable rows and columns.
              </p>
              <CodePreview
                preview={<SkeletonTable rows={4} columns={4} />}
                code={`<SkeletonTable rows={4} columns={4} />`}
              />
            </section>

            {/* List */}
            <section id="list">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">List</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                List skeleton with optional avatar and action button.
              </p>
              <CodePreview
                preview={
                  <div className="max-w-md">
                    <SkeletonList items={4} hasAction={true} />
                  </div>
                }
                code={`<SkeletonList items={4} hasAction={true} />`}
              />
            </section>


            {/* Presets */}
            <section id="presets">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Presets</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Ready-to-use skeleton presets for common UI patterns.
              </p>
              
              <div className="space-y-12">
                <CodePreview
                  preview={
                    <div className="max-w-md border border-border rounded-xl overflow-hidden">
                      <SkeletonProfile />
                    </div>
                  }
                  code={`<SkeletonProfile />

// Props
interface SkeletonProfileProps {
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />

                <CodePreview
                  preview={
                    <div className="max-w-2xl">
                      <SkeletonArticle />
                    </div>
                  }
                  code={`<SkeletonArticle />

// Props
interface SkeletonArticleProps {
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />

                <CodePreview
                  preview={
                    <div className="max-w-xl space-y-6">
                      <SkeletonComment hasReplies={true} />
                      <SkeletonComment />
                    </div>
                  }
                  code={`<SkeletonComment hasReplies={true} />
<SkeletonComment />

// Props
interface SkeletonCommentProps {
  hasReplies?: boolean;
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />

                <CodePreview
                  preview={
                    <div className="grid grid-cols-3 gap-4">
                      <SkeletonProduct />
                      <SkeletonProduct />
                      <SkeletonProduct />
                    </div>
                  }
                  code={`<SkeletonProduct />

// Props
interface SkeletonProductProps {
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />

                <CodePreview
                  preview={
                    <div className="grid grid-cols-3 gap-4">
                      <SkeletonStat />
                      <SkeletonStat />
                      <SkeletonStat />
                    </div>
                  }
                  code={`<SkeletonStat />

// Props
interface SkeletonStatProps {
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />

                <CodePreview
                  preview={
                    <div className="max-w-md">
                      <SkeletonForm fields={3} />
                    </div>
                  }
                  code={`<SkeletonForm fields={3} />

// Props
interface SkeletonFormProps {
  fields?: number;
  hasSubmit?: boolean;
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />

                <CodePreview
                  preview={
                    <div className="border border-border rounded-xl">
                      <SkeletonNav />
                    </div>
                  }
                  code={`<SkeletonNav />

// Props
interface SkeletonNavProps {
  items?: number;
  hasLogo?: boolean;
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />

                <CodePreview
                  preview={<SkeletonImage aspectRatio="16/9" className="w-full max-w-md" />}
                  code={`<SkeletonImage aspectRatio="16/9" />

// Props
interface SkeletonImageProps {
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}`}
                />

                <CodePreview
                  preview={
                    <div className="flex gap-3">
                      <SkeletonButton size="sm" />
                      <SkeletonButton size="md" />
                      <SkeletonButton size="lg" />
                    </div>
                  }
                  code={`<SkeletonButton size="sm" />
<SkeletonButton size="md" />
<SkeletonButton size="lg" />

// Props
interface SkeletonButtonProps {
  size?: "sm" | "md" | "lg";
  width?: string | number;
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />

                <CodePreview
                  preview={
                    <div className="max-w-sm">
                      <SkeletonInput hasLabel={true} />
                    </div>
                  }
                  code={`<SkeletonInput hasLabel={true} />

// Props
interface SkeletonInputProps {
  hasLabel?: boolean;
  className?: string;
  animation?: "pulse" | "wave" | "shimmer" | "none";
}`}
                />
              </div>
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
                      <td className="py-4 px-5 font-mono text-foreground text-sm">animation</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">pulse | wave | shimmer | none</td>
                      <td className="py-4 px-5 font-mono text-xs">pulse</td>
                      <td className="py-4 px-5">Animation style</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">radius</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">none | sm | md | lg | xl | full</td>
                      <td className="py-4 px-5 font-mono text-xs">md</td>
                      <td className="py-4 px-5">Border radius</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">width</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string | number</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Width (px or CSS value)</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">height</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string | number</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Height (px or CSS value)</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">color</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">default | primary | secondary | success | warning | danger | custom</td>
                      <td className="py-4 px-5 font-mono text-xs">default</td>
                      <td className="py-4 px-5">Theme color</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">customColor</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Custom background color (use with color=&quot;custom&quot;)</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">isLoaded</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Show children when true</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">className</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Additional classes</td>
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
  );
}
