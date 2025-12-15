"use client";

import { Avatar, AvatarGroup, AvatarWithBadge } from "@/components/ui/avatar";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "sizes", title: "Sizes" },
  { id: "radius", title: "Radius" },
  { id: "colors", title: "Colors" },
  { id: "bordered", title: "Bordered" },
  { id: "gradient-border", title: "Gradient Border" },
  { id: "zoomed", title: "Zoomed" },
  { id: "clickable", title: "Clickable" },
  { id: "fallbacks", title: "Fallbacks" },
  { id: "with-badge", title: "With Badge" },
  { id: "avatar-group", title: "Avatar Group" },
  { id: "disabled", title: "Disabled" },
  { id: "props", title: "Props" },
];

export default function AvatarPage() {
  return (
          <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Avatar</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Display user profile images with fallbacks, status badges, and grouping support.
            </p>
          </header>

          <div className="space-y-16">
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui-cli add avatar" language="bash" />
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { Avatar } from "@/components/ui/avatar"

export default function Example() {
  return (
    <Avatar 
      src="https://i.pravatar.cc/150?u=1" 
      name="John Doe"
    />
  )
}`}
              />
            </section>

            <section id="sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
              <CodePreview
                preview={
                  <div className="flex items-end gap-4">
                    <Avatar src="https://randomuser.me/api/portraits/women/1.jpg" size="xs" />
                    <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" size="sm" />
                    <Avatar src="https://randomuser.me/api/portraits/women/2.jpg" size="md" />
                    <Avatar src="https://randomuser.me/api/portraits/men/2.jpg" size="lg" />
                    <Avatar src="https://randomuser.me/api/portraits/women/3.jpg" size="xl" />
                  </div>
                }
                code={`<Avatar src="..." size="xs" />
<Avatar src="..." size="sm" />
<Avatar src="..." size="md" />
<Avatar src="..." size="lg" />
<Avatar src="..." size="xl" />`}
              />
            </section>

            <section id="radius">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Radius</h2>
              <CodePreview
                preview={
                  <div className="flex items-center gap-4">
                    <Avatar src="https://randomuser.me/api/portraits/men/3.jpg" radius="none" />
                    <Avatar src="https://randomuser.me/api/portraits/women/4.jpg" radius="sm" />
                    <Avatar src="https://randomuser.me/api/portraits/men/4.jpg" radius="md" />
                    <Avatar src="https://randomuser.me/api/portraits/women/5.jpg" radius="lg" />
                    <Avatar src="https://randomuser.me/api/portraits/men/5.jpg" radius="full" />
                  </div>
                }
                code={`<Avatar src="..." radius="none" />
<Avatar src="..." radius="sm" />
<Avatar src="..." radius="md" />
<Avatar src="..." radius="lg" />
<Avatar src="..." radius="full" />`}
              />
            </section>

            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <p className="text-muted-foreground mb-6">Colors apply to the fallback background when no image is provided.</p>
              <CodePreview
                preview={
                  <div className="flex items-center gap-4">
                    <Avatar name="Default" color="default" />
                    <Avatar name="Primary" color="primary" />
                    <Avatar name="Secondary" color="secondary" />
                    <Avatar name="Success" color="success" />
                    <Avatar name="Warning" color="warning" />
                    <Avatar name="Danger" color="danger" />
                  </div>
                }
                code={`<Avatar name="Default" color="default" />
<Avatar name="Primary" color="primary" />
<Avatar name="Secondary" color="secondary" />
<Avatar name="Success" color="success" />
<Avatar name="Warning" color="warning" />
<Avatar name="Danger" color="danger" />`}
              />
            </section>

            <section id="bordered">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Bordered</h2>
              <CodePreview
                preview={
                  <div className="flex items-center gap-4">
                    <Avatar src="https://randomuser.me/api/portraits/women/6.jpg" bordered />
                    <Avatar src="https://randomuser.me/api/portraits/men/6.jpg" color="primary" bordered />
                    <Avatar src="https://randomuser.me/api/portraits/women/7.jpg" color="secondary" bordered />
                    <Avatar src="https://randomuser.me/api/portraits/men/7.jpg" color="success" bordered />
                  </div>
                }
                code={`<Avatar src="..." bordered />
<Avatar src="..." color="primary" bordered />
<Avatar src="..." color="secondary" bordered />
<Avatar src="..." color="success" bordered />`}
              />
            </section>

            <section id="gradient-border">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Gradient Border</h2>
              <p className="text-muted-foreground mb-6">Add a fancy gradient border around the avatar.</p>
              <CodePreview
                preview={
                  <div className="flex items-center gap-4">
                    <Avatar src="https://randomuser.me/api/portraits/women/30.jpg" gradientBorder color="primary" />
                    <Avatar src="https://randomuser.me/api/portraits/men/30.jpg" gradientBorder color="secondary" />
                    <Avatar src="https://randomuser.me/api/portraits/women/31.jpg" gradientBorder color="success" />
                    <Avatar src="https://randomuser.me/api/portraits/men/31.jpg" gradientBorder color="warning" />
                    <Avatar src="https://randomuser.me/api/portraits/women/32.jpg" gradientBorder color="danger" />
                  </div>
                }
                code={`<Avatar src="..." gradientBorder color="primary" />
<Avatar src="..." gradientBorder color="secondary" />
<Avatar src="..." gradientBorder color="success" />
<Avatar src="..." gradientBorder color="warning" />
<Avatar src="..." gradientBorder color="danger" />`}
              />
            </section>

            <section id="zoomed">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Zoomed</h2>
              <p className="text-muted-foreground mb-6">Image zooms in on hover - great for profile cards.</p>
              <CodePreview
                preview={
                  <div className="flex items-center gap-4">
                    <Avatar src="https://randomuser.me/api/portraits/women/33.jpg" size="lg" zoomed />
                    <Avatar src="https://randomuser.me/api/portraits/men/33.jpg" size="lg" zoomed bordered color="primary" />
                    <Avatar src="https://randomuser.me/api/portraits/women/34.jpg" size="lg" zoomed gradientBorder color="danger" />
                  </div>
                }
                code={`<Avatar src="..." size="lg" zoomed />
<Avatar src="..." size="lg" zoomed bordered color="primary" />
<Avatar src="..." size="lg" zoomed gradientBorder color="danger" />`}
              />
            </section>

            <section id="clickable">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Clickable</h2>
              <p className="text-muted-foreground mb-6">Add onClick handler for interactive avatars.</p>
              <CodePreview
                preview={
                  <div className="flex items-center gap-4">
                    <Avatar 
                      src="https://randomuser.me/api/portraits/women/35.jpg" 
                      size="lg"
                      onClick={() => alert("Avatar clicked!")} 
                    />
                    <Avatar 
                      src="https://randomuser.me/api/portraits/men/35.jpg" 
                      size="lg"
                      zoomed
                      gradientBorder
                      color="primary"
                      onClick={() => alert("Profile clicked!")} 
                    />
                  </div>
                }
                code={`<Avatar 
  src="..." 
  size="lg"
  onClick={() => console.log("clicked")} 
/>
<Avatar 
  src="..." 
  size="lg"
  zoomed
  gradientBorder
  color="primary"
  onClick={() => console.log("profile clicked")} 
/>`}
              />
            </section>

            <section id="fallbacks">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Fallbacks</h2>
              <p className="text-muted-foreground mb-6">When no image is provided, shows initials from name, custom icon, or default user icon.</p>
              <CodePreview
                preview={
                  <div className="flex items-center gap-4">
                    <Avatar name="John Doe" color="primary" />
                    <Avatar name="Jane Smith" color="secondary" />
                    <Avatar name="A" color="success" />
                    <Avatar color="warning" />
                    <Avatar 
                      color="danger"
                      fallback={<span className="text-lg">✦</span>}
                    />
                  </div>
                }
                code={`// Initials from name
<Avatar name="John Doe" color="primary" />
<Avatar name="Jane Smith" color="secondary" />

// Single letter
<Avatar name="A" color="success" />

// Default icon (no name)
<Avatar color="warning" />

// Custom fallback
<Avatar color="danger" fallback={<span>✦</span>} />`}
              />
            </section>

            <section id="with-badge">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Badge</h2>
              <p className="text-muted-foreground mb-6">Show online/offline/away/busy status with a badge indicator.</p>
              <CodePreview
                preview={
                  <div className="flex items-center gap-6">
                    <AvatarWithBadge status="online">
                      <Avatar src="https://randomuser.me/api/portraits/women/8.jpg" />
                    </AvatarWithBadge>
                    <AvatarWithBadge status="away">
                      <Avatar src="https://randomuser.me/api/portraits/men/8.jpg" />
                    </AvatarWithBadge>
                    <AvatarWithBadge status="busy">
                      <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" />
                    </AvatarWithBadge>
                    <AvatarWithBadge status="offline">
                      <Avatar src="https://randomuser.me/api/portraits/men/9.jpg" />
                    </AvatarWithBadge>
                  </div>
                }
                code={`<AvatarWithBadge status="online">
  <Avatar src="..." />
</AvatarWithBadge>
<AvatarWithBadge status="away">
  <Avatar src="..." />
</AvatarWithBadge>
<AvatarWithBadge status="busy">
  <Avatar src="..." />
</AvatarWithBadge>
<AvatarWithBadge status="offline">
  <Avatar src="..." />
</AvatarWithBadge>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Custom Badge Content</h3>
              <p className="text-muted-foreground mb-6">Show numbers, icons, or any custom content in the badge.</p>
              <CodePreview
                preview={
                  <div className="flex items-center gap-6">
                    <AvatarWithBadge badge="3" badgeColor="danger">
                      <Avatar src="https://randomuser.me/api/portraits/women/40.jpg" size="lg" />
                    </AvatarWithBadge>
                    <AvatarWithBadge badge="99+" badgeColor="primary">
                      <Avatar src="https://randomuser.me/api/portraits/men/40.jpg" size="lg" />
                    </AvatarWithBadge>
                    <AvatarWithBadge badge="✓" badgeColor="success">
                      <Avatar src="https://randomuser.me/api/portraits/women/41.jpg" size="lg" />
                    </AvatarWithBadge>
                    <AvatarWithBadge badge="★" badgeColor="warning" placement="top-right">
                      <Avatar src="https://randomuser.me/api/portraits/men/41.jpg" size="lg" />
                    </AvatarWithBadge>
                  </div>
                }
                code={`<AvatarWithBadge badge="3" badgeColor="danger">
  <Avatar src="..." size="lg" />
</AvatarWithBadge>
<AvatarWithBadge badge="99+" badgeColor="primary">
  <Avatar src="..." size="lg" />
</AvatarWithBadge>
<AvatarWithBadge badge="✓" badgeColor="success">
  <Avatar src="..." size="lg" />
</AvatarWithBadge>
<AvatarWithBadge badge="★" badgeColor="warning" placement="top-right">
  <Avatar src="..." size="lg" />
</AvatarWithBadge>`}
              />
            </section>

            <section id="avatar-group">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Avatar Group</h2>
              <p className="text-muted-foreground mb-6">Stack multiple avatars with overflow count. Hover over avatars to see them pop up!</p>
              <CodePreview
                preview={
                  <div className="space-y-6">
                    <AvatarGroup max={4}>
                      <Avatar src="https://randomuser.me/api/portraits/women/10.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/men/10.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/women/11.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/men/11.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/women/12.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/men/12.jpg" />
                    </AvatarGroup>
                    
                    <AvatarGroup max={3} size="lg">
                      <Avatar src="https://randomuser.me/api/portraits/women/13.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/men/13.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/women/14.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/men/14.jpg" />
                      <Avatar src="https://randomuser.me/api/portraits/women/15.jpg" />
                    </AvatarGroup>
                  </div>
                }
                code={`<AvatarGroup max={4}>
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
</AvatarGroup>

<AvatarGroup max={3} size="lg">
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
</AvatarGroup>`}
              />

              <h3 className="text-lg font-medium mt-8 mb-4">Blur on Hover</h3>
              <p className="text-muted-foreground mb-6">Focus on one avatar by blurring the rest when hovering.</p>
              <CodePreview
                preview={
                  <AvatarGroup max={5} blurOnHover>
                    <Avatar src="https://randomuser.me/api/portraits/women/20.jpg" />
                    <Avatar src="https://randomuser.me/api/portraits/men/20.jpg" />
                    <Avatar src="https://randomuser.me/api/portraits/women/21.jpg" />
                    <Avatar src="https://randomuser.me/api/portraits/men/21.jpg" />
                    <Avatar src="https://randomuser.me/api/portraits/women/22.jpg" />
                  </AvatarGroup>
                }
                code={`<AvatarGroup max={5} blurOnHover>
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
</AvatarGroup>`}
              />
            </section>

            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled</h2>
              <CodePreview
                preview={
                  <div className="flex items-center gap-4">
                    <Avatar src="https://randomuser.me/api/portraits/men/15.jpg" disabled />
                    <Avatar src="https://randomuser.me/api/portraits/women/16.jpg" disabled />
                  </div>
                }
                code={`<Avatar src="..." disabled />
<Avatar src="..." disabled />`}
              />
            </section>

            <section id="props">
              <h2 className="text-xl font-semibold mb-6 scroll-mt-6">Props</h2>
              
              <h3 className="text-lg font-medium mb-4">Avatar</h3>
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
                      ["src", "string", "-", "Image URL"],
                      ["alt", "string", '""', "Image alt text"],
                      ["name", "string", "-", "Name for initials fallback"],
                      ["icon", "ReactNode", "-", "Custom icon fallback"],
                      ["size", "xs | sm | md | lg | xl", "md", "Avatar size"],
                      ["radius", "none | sm | md | lg | full", "full", "Border radius"],
                      ["color", "default | primary | secondary | success | warning | danger", "default", "Fallback background color"],
                      ["bordered", "boolean", "false", "Show colored border"],
                      ["gradientBorder", "boolean", "false", "Show gradient border"],
                      ["zoomed", "boolean", "false", "Zoom image on hover"],
                      ["disabled", "boolean", "false", "Disable interactions"],
                      ["showFallback", "boolean", "true", "Show fallback when no image"],
                      ["fallback", "ReactNode", "-", "Custom fallback content"],
                      ["onClick", "() => void", "-", "Click handler"],
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

              <h3 className="text-lg font-medium mb-4">AvatarGroup</h3>
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
                      ["children", "ReactNode", "-", "Avatar components"],
                      ["max", "number", "5", "Max visible avatars"],
                      ["size", "xs | sm | md | lg | xl", "md", "Size for all avatars"],
                      ["bordered", "boolean", "true", "Show border on avatars"],
                      ["blurOnHover", "boolean", "false", "Blur others on hover"],
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

              <h3 className="text-lg font-medium mb-4">AvatarWithBadge</h3>
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
                      ["children", "ReactNode", "-", "Avatar component"],
                      ["status", "online | offline | away | busy", "-", "Status indicator"],
                      ["badge", "ReactNode", "-", "Custom badge content"],
                      ["badgeColor", "default | primary | secondary | success | warning | danger", "primary", "Badge color"],
                      ["placement", "top-right | top-left | bottom-right | bottom-left", "bottom-right", "Badge position"],
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
