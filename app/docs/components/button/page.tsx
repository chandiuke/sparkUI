import { Button } from "@/components/ui/button";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";
import { LoadingDemo } from "./loading-demo";

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
  return (
    <div className="flex gap-16">
      <div className="flex-1 min-w-0 max-w-3xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Button</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A versatile button component with multiple variants, colors, sizes, and states.
          </p>
        </header>

        <div className="space-y-16">
          <section id="installation">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
            <CodeBlock code="npx sparkui add button" language="bash" />
          </section>

          <section id="usage">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
            <CodeBlock
              code={`import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button onClick={() => console.log("clicked")}>Click me</Button>
}`}
            />
          </section>


          <section id="variants">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Variants</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Seven visual styles to match your design.
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
              code={`<Button variant="solid">Solid</Button>
<Button variant="bordered">Bordered</Button>
<Button variant="outline">Outline</Button>
<Button variant="faded">Faded</Button>
<Button variant="flat">Flat</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="shadow">Shadow</Button>`}
            />
          </section>

          <section id="colors">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Six semantic color options.
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

          <section id="sizes">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
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

          <section id="icon-sizes">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Icon Sizes</h2>
            <CodePreview
              preview={
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="icon-sm" color="primary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </Button>
                  <Button size="icon" color="primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </Button>
                  <Button size="icon-lg" color="primary">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </Button>
                </div>
              }
              code={`<Button size="icon-sm"><PlusIcon /></Button>
<Button size="icon"><PlusIcon /></Button>
<Button size="icon-lg"><PlusIcon /></Button>`}
            />
          </section>

          <section id="radius">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Radius</h2>
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


          <section id="with-icons">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Icons</h2>
            <CodePreview
              preview={
                <div className="flex flex-wrap gap-3">
                  <Button color="primary" startContent={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>Add Item</Button>
                  <Button color="secondary" endContent={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}>Continue</Button>
                </div>
              }
              code={`<Button startContent={<PlusIcon />}>Add Item</Button>
<Button endContent={<ArrowIcon />}>Continue</Button>`}
            />
          </section>

          <section id="loading">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Loading State</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Add a loading spinner and disable interactions while an async operation is in progress.
            </p>
            <CodePreview
              preview={<LoadingDemo />}
              code={`const [isLoading, setIsLoading] = useState(false);

<Button loading>Loading</Button>
<Button loading={isLoading} onClick={() => setIsLoading(true)}>
  {isLoading ? "Saving..." : "Save Changes"}
</Button>`}
            />
          </section>

          <section id="disabled">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled</h2>
            <CodePreview
              preview={
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button color="primary" disabled>Primary Disabled</Button>
                  <Button variant="bordered" disabled>Bordered Disabled</Button>
                </div>
              }
              code={`<Button disabled>Disabled</Button>
<Button color="primary" disabled>Primary Disabled</Button>`}
            />
          </section>

          <section id="full-width">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Full Width</h2>
            <CodePreview
              preview={<Button color="primary" fullWidth>Full Width Button</Button>}
              code={`<Button fullWidth>Full Width Button</Button>`}
            />
          </section>

          <section id="as-link">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">As Link</h2>
            <CodePreview
              preview={<Button as="a" href="https://github.com" color="primary">Go to GitHub</Button>}
              code={`<Button as="a" href="https://github.com">Go to GitHub</Button>`}
            />
          </section>

          <section id="button-group">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Button Group</h2>
            <CodePreview
              preview={
                <div className="flex">
                  <Button color="primary" radius="none" className="rounded-l-lg">Left</Button>
                  <Button color="primary" radius="none" className="border-l border-primary-foreground/20">Center</Button>
                  <Button color="primary" radius="none" className="rounded-r-lg border-l border-primary-foreground/20">Right</Button>
                </div>
              }
              code={`<div className="flex">
  <Button radius="none" className="rounded-l-lg">Left</Button>
  <Button radius="none">Center</Button>
  <Button radius="none" className="rounded-r-lg">Right</Button>
</div>`}
            />
          </section>

          <section id="icon-only">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Icon Only</h2>
            <CodePreview
              preview={
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="icon" color="primary"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></Button>
                  <Button size="icon" variant="flat" color="danger"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></Button>
                  <Button size="icon" radius="full" color="success"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></Button>
                </div>
              }
              code={`<Button size="icon"><HeartIcon /></Button>
<Button size="icon" variant="flat" color="danger"><TrashIcon /></Button>
<Button size="icon" radius="full" color="success"><CheckIcon /></Button>`}
            />
          </section>

          <section id="custom-styles">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Custom Styles</h2>
            <CodePreview
              preview={
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0">Gradient</Button>
                  <Button variant="bordered" className="border-dashed">Dashed Border</Button>
                </div>
              }
              code={`<Button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">Gradient</Button>
<Button variant="bordered" className="border-dashed">Dashed Border</Button>`}
            />
          </section>

          <section id="accessibility">
            <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Accessibility</h2>
            <CodePreview
              preview={
                <div className="flex flex-wrap gap-3">
                  <Button color="primary" aria-label="Save document">Save</Button>
                  <Button size="icon" color="danger" aria-label="Delete item"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></Button>
                </div>
              }
              code={`<Button aria-label="Save document">Save</Button>
<Button size="icon" aria-label="Delete item"><TrashIcon /></Button>`}
            />
          </section>


          <section id="props">
            <h2 className="text-xl font-semibold mb-6 scroll-mt-6">Props</h2>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-4 px-5 font-medium">Prop</th>
                    <th className="text-left py-4 px-5 font-medium">Type</th>
                    <th className="text-left py-4 px-5 font-medium">Default</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">variant</td><td className="py-3 px-5 font-mono text-xs">solid | bordered | outline | faded | flat | ghost | shadow</td><td className="py-3 px-5">solid</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">color</td><td className="py-3 px-5 font-mono text-xs">default | primary | secondary | success | warning | danger</td><td className="py-3 px-5">default</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">size</td><td className="py-3 px-5 font-mono text-xs">sm | md | lg | icon | icon-sm | icon-lg</td><td className="py-3 px-5">md</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">radius</td><td className="py-3 px-5 font-mono text-xs">none | sm | md | lg | full</td><td className="py-3 px-5">md</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">disabled</td><td className="py-3 px-5 font-mono text-xs">boolean</td><td className="py-3 px-5">false</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">loading</td><td className="py-3 px-5 font-mono text-xs">boolean</td><td className="py-3 px-5">false</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">startContent</td><td className="py-3 px-5 font-mono text-xs">ReactNode</td><td className="py-3 px-5">-</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">endContent</td><td className="py-3 px-5 font-mono text-xs">ReactNode</td><td className="py-3 px-5">-</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 px-5 font-mono text-foreground">fullWidth</td><td className="py-3 px-5 font-mono text-xs">boolean</td><td className="py-3 px-5">false</td></tr>
                  <tr><td className="py-3 px-5 font-mono text-foreground">as</td><td className="py-3 px-5 font-mono text-xs">&quot;button&quot; | &quot;a&quot;</td><td className="py-3 px-5">button</td></tr>
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
