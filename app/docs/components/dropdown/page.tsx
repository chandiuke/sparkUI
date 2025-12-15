"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  DropdownDivider,
  DropdownLabel,
  DropdownSplitButton,
} from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";
import { useState } from "react";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variants", title: "Trigger Variants" },
  { id: "menu-variants", title: "Menu Variants" },
  { id: "split-button", title: "Split Button" },
  { id: "placements", title: "Placements" },
  { id: "triggers", title: "Triggers" },
  { id: "with-icons", title: "With Icons" },
  { id: "with-shortcuts", title: "With Shortcuts" },
  { id: "with-descriptions", title: "With Descriptions" },
  { id: "sections", title: "Sections & Dividers" },
  { id: "colors", title: "Colors" },
  { id: "item-colors", title: "Item Colors" },
  { id: "disabled", title: "Disabled Items" },
  { id: "danger", title: "Danger Items" },
  { id: "selectable", title: "Selectable Items" },
  { id: "navbar", title: "Navbar Example" },
  { id: "keyboard", title: "Keyboard Navigation" },
  { id: "props", title: "Props" },
];

// Icons
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function DropdownPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
          <div className="flex gap-16">
        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Dropdown</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A versatile dropdown menu component for navbars, context menus, and action lists.
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-16">
            {/* Installation */}
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock language="bash" code="npx sparkui-cli add dropdown" />
            </section>

            {/* Usage */}
            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="outline">
                        Open Menu <ChevronDownIcon />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem>Profile</DropdownItem>
                      <DropdownItem>Settings</DropdownItem>
                      <DropdownItem>Help</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem danger>Logout</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownDivider } from "@/components/ui/dropdown";

<Dropdown>
  <DropdownTrigger>
    <Button variant="outline">Open Menu</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Help</DropdownItem>
    <DropdownDivider />
    <DropdownItem danger>Logout</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
              />
            </section>

            {/* Trigger Variants */}
            <section id="variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Trigger Variants</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use any Button variant as the dropdown trigger.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Dropdown>
                      <DropdownTrigger><Button variant="solid">Solid <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem><DropdownItem>Option 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger><Button variant="outline">Outline <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem><DropdownItem>Option 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger><Button variant="bordered">Bordered <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem><DropdownItem>Option 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger><Button variant="flat">Flat <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem><DropdownItem>Option 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger><Button variant="ghost">Ghost <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem><DropdownItem>Option 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownTrigger><Button variant="faded">Faded <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem><DropdownItem>Option 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                  </div>
                }
                code={`<Dropdown>
  <DropdownTrigger>
    <Button variant="solid">Solid</Button>
  </DropdownTrigger>
  <DropdownMenu>...</DropdownMenu>
</Dropdown>

// Available variants: solid, outline, bordered, flat, ghost, faded, shadow`}
              />
            </section>

            {/* Menu Variants */}
            <section id="menu-variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Menu Variants</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Customize the dropdown menu appearance with different variants.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Dropdown>
                      <DropdownTrigger><Button variant="outline">Default <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu variant="default">
                        <DropdownItem>Option 1</DropdownItem>
                        <DropdownItem>Option 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown color="primary">
                      <DropdownTrigger><Button color="primary">Solid <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu variant="solid">
                        <DropdownItem>Option 1</DropdownItem>
                        <DropdownItem>Option 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown color="secondary">
                      <DropdownTrigger><Button color="secondary" variant="flat">Flat <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu variant="flat">
                        <DropdownItem>Option 1</DropdownItem>
                        <DropdownItem>Option 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown color="success">
                      <DropdownTrigger><Button color="success" variant="bordered">Bordered <ChevronDownIcon /></Button></DropdownTrigger>
                      <DropdownMenu variant="bordered">
                        <DropdownItem>Option 1</DropdownItem>
                        <DropdownItem>Option 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                }
                code={`// Default - card background with border
<DropdownMenu variant="default">...</DropdownMenu>

// Solid - filled with dropdown color
<Dropdown color="primary">
  <DropdownMenu variant="solid">...</DropdownMenu>
</Dropdown>

// Flat - subtle background with blur
<DropdownMenu variant="flat">...</DropdownMenu>

// Bordered - transparent with colored border
<DropdownMenu variant="bordered">...</DropdownMenu>`}
              />
              <p className="text-muted-foreground mt-6 mb-4">
                You can also pass custom classes for full control:
              </p>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger><Button variant="outline">Custom Style <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50">
                      <DropdownItem>Gradient Menu</DropdownItem>
                      <DropdownItem>Custom Styled</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<DropdownMenu className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50">
  <DropdownItem>Gradient Menu</DropdownItem>
</DropdownMenu>`}
              />
            </section>

            {/* Split Button */}
            <section id="split-button">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Split Button</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A button group with a main action and a dropdown trigger for additional options.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Dropdown>
                      <DropdownSplitButton onClick={() => alert("Save clicked!")}>
                        Save
                      </DropdownSplitButton>
                      <DropdownMenu>
                        <DropdownItem>Save as Draft</DropdownItem>
                        <DropdownItem>Save and Publish</DropdownItem>
                        <DropdownItem>Save as Template</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownSplitButton color="primary" onClick={() => alert("Deploy clicked!")}>
                        Deploy
                      </DropdownSplitButton>
                      <DropdownMenu>
                        <DropdownItem>Deploy to Production</DropdownItem>
                        <DropdownItem>Deploy to Staging</DropdownItem>
                        <DropdownItem>Deploy to Preview</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownSplitButton color="success" variant="flat">
                        Download
                      </DropdownSplitButton>
                      <DropdownMenu>
                        <DropdownItem>Download as PDF</DropdownItem>
                        <DropdownItem>Download as PNG</DropdownItem>
                        <DropdownItem>Download as SVG</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                }
                code={`<Dropdown>
  <DropdownSplitButton color="primary" onClick={() => console.log("Main action")}>
    Deploy
  </DropdownSplitButton>
  <DropdownMenu>
    <DropdownItem>Deploy to Production</DropdownItem>
    <DropdownItem>Deploy to Staging</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
              />
              <p className="text-muted-foreground mt-6 mb-4">
                Split button supports all colors and variants:
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Dropdown>
                      <DropdownSplitButton color="primary" variant="solid">Solid</DropdownSplitButton>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownSplitButton color="primary" variant="bordered">Bordered</DropdownSplitButton>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownSplitButton color="primary" variant="flat">Flat</DropdownSplitButton>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                      <DropdownSplitButton color="primary" variant="ghost">Ghost</DropdownSplitButton>
                      <DropdownMenu><DropdownItem>Option 1</DropdownItem></DropdownMenu>
                    </Dropdown>
                  </div>
                }
                code={`<DropdownSplitButton color="primary" variant="solid">Solid</DropdownSplitButton>
<DropdownSplitButton color="primary" variant="bordered">Bordered</DropdownSplitButton>
<DropdownSplitButton color="primary" variant="flat">Flat</DropdownSplitButton>
<DropdownSplitButton color="primary" variant="ghost">Ghost</DropdownSplitButton>`}
              />
            </section>

            {/* Placements */}
            <section id="placements">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Placements</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Control where the dropdown appears relative to the trigger.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Dropdown placement="bottom-start">
                      <DropdownTrigger><Button variant="outline" size="sm">Bottom Start</Button></DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Item 1</DropdownItem>
                        <DropdownItem>Item 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger><Button variant="outline" size="sm">Bottom End</Button></DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Item 1</DropdownItem>
                        <DropdownItem>Item 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown placement="top-start">
                      <DropdownTrigger><Button variant="outline" size="sm">Top Start</Button></DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Item 1</DropdownItem>
                        <DropdownItem>Item 2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                }
                code={`<Dropdown placement="bottom-start">...</Dropdown>
<Dropdown placement="bottom-end">...</Dropdown>
<Dropdown placement="top-start">...</Dropdown>
<Dropdown placement="right-start">...</Dropdown>`}
              />
            </section>

            {/* Triggers */}
            <section id="triggers">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Triggers</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Open dropdown on click (default) or hover.
              </p>
              <CodePreview
                preview={
                  <div className="flex gap-3">
                    <Dropdown trigger="click">
                      <DropdownTrigger><Button variant="outline">Click Me</Button></DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Opened on click</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown trigger="hover">
                      <DropdownTrigger><Button variant="outline">Hover Me</Button></DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Opened on hover</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                }
                code={`<Dropdown trigger="click">...</Dropdown>
<Dropdown trigger="hover">...</Dropdown>`}
              />
            </section>

            {/* With Icons */}
            <section id="with-icons">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Icons</h2>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger><Button variant="outline">Actions <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem icon={<UserIcon />}>Profile</DropdownItem>
                      <DropdownItem icon={<SettingsIcon />}>Settings</DropdownItem>
                      <DropdownItem icon={<EditIcon />}>Edit</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem icon={<LogoutIcon />} danger>Logout</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<DropdownItem icon={<UserIcon />}>Profile</DropdownItem>
<DropdownItem icon={<SettingsIcon />}>Settings</DropdownItem>
<DropdownItem icon={<LogoutIcon />} danger>Logout</DropdownItem>`}
              />
            </section>

            {/* With Shortcuts */}
            <section id="with-shortcuts">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Shortcuts</h2>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger><Button variant="outline">Edit <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem icon={<CopyIcon />} shortcut="⌘C">Copy</DropdownItem>
                      <DropdownItem icon={<EditIcon />} shortcut="⌘E">Edit</DropdownItem>
                      <DropdownItem icon={<TrashIcon />} shortcut="⌘⌫" danger>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<DropdownItem icon={<CopyIcon />} shortcut="⌘C">Copy</DropdownItem>
<DropdownItem icon={<EditIcon />} shortcut="⌘E">Edit</DropdownItem>
<DropdownItem icon={<TrashIcon />} shortcut="⌘⌫" danger>Delete</DropdownItem>`}
              />
            </section>

            {/* With Descriptions */}
            <section id="with-descriptions">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Descriptions</h2>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger><Button variant="outline">Account <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem icon={<UserIcon />} description="View your profile">Profile</DropdownItem>
                      <DropdownItem icon={<SettingsIcon />} description="Manage preferences">Settings</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<DropdownItem icon={<UserIcon />} description="View your profile">
  Profile
</DropdownItem>`}
              />
            </section>

            {/* Sections */}
            <section id="sections">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sections & Dividers</h2>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger><Button variant="outline">Menu <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu>
                      <DropdownLabel>Account</DropdownLabel>
                      <DropdownItem icon={<UserIcon />}>Profile</DropdownItem>
                      <DropdownItem icon={<SettingsIcon />}>Settings</DropdownItem>
                      <DropdownSection title="Actions">
                        <DropdownItem icon={<CopyIcon />}>Copy</DropdownItem>
                        <DropdownItem icon={<EditIcon />}>Edit</DropdownItem>
                      </DropdownSection>
                      <DropdownDivider />
                      <DropdownItem icon={<LogoutIcon />} danger>Logout</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<DropdownLabel>Account</DropdownLabel>
<DropdownItem>Profile</DropdownItem>
<DropdownSection title="Actions">
  <DropdownItem>Copy</DropdownItem>
</DropdownSection>
<DropdownDivider />`}
              />
            </section>

            {/* Colors */}
            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Dropdown color="primary">
                      <DropdownTrigger><Button color="primary">Primary</Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Item 1</DropdownItem><DropdownItem>Item 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown color="secondary">
                      <DropdownTrigger><Button color="secondary">Secondary</Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Item 1</DropdownItem><DropdownItem>Item 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                    <Dropdown color="success">
                      <DropdownTrigger><Button color="success">Success</Button></DropdownTrigger>
                      <DropdownMenu><DropdownItem>Item 1</DropdownItem><DropdownItem>Item 2</DropdownItem></DropdownMenu>
                    </Dropdown>
                  </div>
                }
                code={`<Dropdown color="primary">...</Dropdown>
<Dropdown color="secondary">...</Dropdown>
<Dropdown color="success">...</Dropdown>`}
              />
            </section>

            {/* Item Colors */}
            <section id="item-colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Item Colors</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Individual items can have their own colors, independent of the dropdown color.
              </p>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger><Button variant="outline">Actions <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem color="primary" icon={<EditIcon />}>Edit (Primary)</DropdownItem>
                      <DropdownItem color="success" icon={<CopyIcon />}>Duplicate (Success)</DropdownItem>
                      <DropdownItem color="warning" icon={<SettingsIcon />}>Archive (Warning)</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem color="danger" icon={<TrashIcon />}>Delete (Danger)</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<DropdownItem color="primary" icon={<EditIcon />}>Edit</DropdownItem>
<DropdownItem color="success" icon={<CopyIcon />}>Duplicate</DropdownItem>
<DropdownItem color="warning" icon={<SettingsIcon />}>Archive</DropdownItem>
<DropdownItem color="danger" icon={<TrashIcon />}>Delete</DropdownItem>`}
              />
            </section>

            {/* Disabled */}
            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled Items</h2>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger><Button variant="outline">Options <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem>Available</DropdownItem>
                      <DropdownItem disabled>Disabled</DropdownItem>
                      <DropdownItem>Another Option</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<DropdownItem disabled>Disabled</DropdownItem>`}
              />
            </section>

            {/* Danger */}
            <section id="danger">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Danger Items</h2>
              <CodePreview
                preview={
                  <Dropdown>
                    <DropdownTrigger><Button variant="outline">Actions <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem icon={<EditIcon />}>Edit</DropdownItem>
                      <DropdownItem icon={<CopyIcon />}>Duplicate</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem icon={<TrashIcon />} danger>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<DropdownItem icon={<TrashIcon />} danger>Delete</DropdownItem>`}
              />
            </section>

            {/* Selectable */}
            <section id="selectable">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Selectable Items</h2>
              <CodePreview
                preview={
                  <Dropdown closeOnSelect={false}>
                    <DropdownTrigger><Button variant="outline">Select Theme <ChevronDownIcon /></Button></DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem showCheck selected={selected === "light"} onClick={() => setSelected("light")}>Light</DropdownItem>
                      <DropdownItem showCheck selected={selected === "dark"} onClick={() => setSelected("dark")}>Dark</DropdownItem>
                      <DropdownItem showCheck selected={selected === "system"} onClick={() => setSelected("system")}>System</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                }
                code={`<Dropdown closeOnSelect={false}>
  <DropdownMenu>
    <DropdownItem showCheck selected={selected === "light"} onClick={() => setSelected("light")}>
      Light
    </DropdownItem>
  </DropdownMenu>
</Dropdown>`}
              />
            </section>

            {/* Navbar Example */}
            <section id="navbar">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Navbar Example</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Perfect for navigation menus with hover trigger.
              </p>
              <CodePreview
                preview={
                  <nav className="flex items-center gap-6 p-4 bg-card rounded-xl border border-border">
                    <span className="font-bold">Logo</span>
                    <Dropdown trigger="hover" placement="bottom-start">
                      <DropdownTrigger>
                        <span className="flex items-center gap-1 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                          Products <ChevronDownIcon />
                        </span>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem description="Build amazing UIs">Components</DropdownItem>
                        <DropdownItem description="Ready-made layouts">Templates</DropdownItem>
                        <DropdownItem description="Design resources">Icons</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown trigger="hover" placement="bottom-start">
                      <DropdownTrigger>
                        <span className="flex items-center gap-1 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                          Resources <ChevronDownIcon />
                        </span>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Documentation</DropdownItem>
                        <DropdownItem>Blog</DropdownItem>
                        <DropdownItem>Support</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Pricing</span>
                  </nav>
                }
                code={`<Dropdown trigger="hover" placement="bottom-start">
  <DropdownTrigger>
    <span className="flex items-center gap-1 cursor-pointer">
      Products <ChevronDownIcon />
    </span>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem description="Build amazing UIs">Components</DropdownItem>
    <DropdownItem description="Ready-made layouts">Templates</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
              />
            </section>

            {/* Keyboard Navigation */}
            <section id="keyboard">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Keyboard Navigation</h2>
              <div className="p-6 rounded-xl border border-border bg-card/50">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium mb-3 text-foreground">Navigation</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded-md bg-muted text-xs font-mono">↑</kbd>
                        <kbd className="px-2 py-1 rounded-md bg-muted text-xs font-mono">↓</kbd>
                        <span>Navigate items</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded-md bg-muted text-xs font-mono">Home</kbd>
                        <span>First item</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded-md bg-muted text-xs font-mono">End</kbd>
                        <span>Last item</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-3 text-foreground">Actions</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded-md bg-muted text-xs font-mono">Enter</kbd>
                        <kbd className="px-2 py-1 rounded-md bg-muted text-xs font-mono">Space</kbd>
                        <span>Select item</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded-md bg-muted text-xs font-mono">Escape</kbd>
                        <span>Close dropdown</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Props */}
            <section id="props">
              <h2 className="text-xl font-semibold mb-6 scroll-mt-6">Props</h2>
              <div className="space-y-8">
                {/* Dropdown Props */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Dropdown</h3>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left py-3 px-4 font-semibold">Prop</th>
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Default</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">placement</code></td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;bottom&quot; | &quot;bottom-start&quot; | &quot;bottom-end&quot; | &quot;top&quot; | ...</td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;bottom-start&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">trigger</code></td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;click&quot; | &quot;hover&quot;</td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;click&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">color</code></td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;default&quot; | &quot;primary&quot; | &quot;secondary&quot; | ...</td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;default&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">closeOnSelect</code></td>
                          <td className="py-3 px-4 text-muted-foreground">boolean</td>
                          <td className="py-3 px-4 text-muted-foreground">true</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">disabled</code></td>
                          <td className="py-3 px-4 text-muted-foreground">boolean</td>
                          <td className="py-3 px-4 text-muted-foreground">false</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DropdownMenu Props */}
                <div>
                  <h3 className="text-lg font-medium mb-4">DropdownMenu</h3>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left py-3 px-4 font-semibold">Prop</th>
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Default</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">variant</code></td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;default&quot; | &quot;solid&quot; | &quot;flat&quot; | &quot;bordered&quot;</td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;default&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">className</code></td>
                          <td className="py-3 px-4 text-muted-foreground">string</td>
                          <td className="py-3 px-4 text-muted-foreground">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DropdownItem Props */}
                <div>
                  <h3 className="text-lg font-medium mb-4">DropdownItem</h3>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left py-3 px-4 font-semibold">Prop</th>
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Default</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">color</code></td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;default&quot; | &quot;primary&quot; | &quot;secondary&quot; | ...</td>
                          <td className="py-3 px-4 text-muted-foreground">-</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">icon</code></td>
                          <td className="py-3 px-4 text-muted-foreground">ReactNode</td>
                          <td className="py-3 px-4 text-muted-foreground">-</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">shortcut</code></td>
                          <td className="py-3 px-4 text-muted-foreground">string</td>
                          <td className="py-3 px-4 text-muted-foreground">-</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">description</code></td>
                          <td className="py-3 px-4 text-muted-foreground">string</td>
                          <td className="py-3 px-4 text-muted-foreground">-</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">disabled</code></td>
                          <td className="py-3 px-4 text-muted-foreground">boolean</td>
                          <td className="py-3 px-4 text-muted-foreground">false</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">danger</code></td>
                          <td className="py-3 px-4 text-muted-foreground">boolean</td>
                          <td className="py-3 px-4 text-muted-foreground">false</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">selected</code></td>
                          <td className="py-3 px-4 text-muted-foreground">boolean</td>
                          <td className="py-3 px-4 text-muted-foreground">false</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">showCheck</code></td>
                          <td className="py-3 px-4 text-muted-foreground">boolean</td>
                          <td className="py-3 px-4 text-muted-foreground">false</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">href</code></td>
                          <td className="py-3 px-4 text-muted-foreground">string</td>
                          <td className="py-3 px-4 text-muted-foreground">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DropdownSplitButton Props */}
                <div>
                  <h3 className="text-lg font-medium mb-4">DropdownSplitButton</h3>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left py-3 px-4 font-semibold">Prop</th>
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Default</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">color</code></td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;default&quot; | &quot;primary&quot; | &quot;secondary&quot; | ...</td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;default&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">variant</code></td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;solid&quot; | &quot;bordered&quot; | &quot;flat&quot; | &quot;ghost&quot;</td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;solid&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">size</code></td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                          <td className="py-3 px-4 text-muted-foreground">&quot;md&quot;</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">disabled</code></td>
                          <td className="py-3 px-4 text-muted-foreground">boolean</td>
                          <td className="py-3 px-4 text-muted-foreground">false</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4"><code className="text-primary">onClick</code></td>
                          <td className="py-3 px-4 text-muted-foreground">() =&gt; void</td>
                          <td className="py-3 px-4 text-muted-foreground">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* TOC Sidebar */}
        <div className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-6">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
  );
}
