"use client";

import { Select, MultiSelect } from "@/components/ui/select";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";
import { useState } from "react";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variants", title: "Variants" },
  { id: "colors", title: "Colors" },
  { id: "sizes", title: "Sizes" },
  { id: "with-icons", title: "With Icons" },
  { id: "with-descriptions", title: "With Descriptions" },
  { id: "grouped", title: "Grouped Options" },
  { id: "searchable", title: "Searchable" },
  { id: "clearable", title: "Clearable" },
  { id: "disabled-options", title: "Disabled Options" },
  { id: "states", title: "States" },
  { id: "flat-colors", title: "Flat Variant Colors" },
  { id: "menu-variants", title: "Menu Variants" },
  { id: "multi-select", title: "Multi Select" },
  { id: "multi-searchable", title: "Multi Select Searchable" },
  { id: "keyboard", title: "Keyboard Navigation" },
  { id: "props", title: "Props" },
];

// Sample data
const fruits = [
  { value: "apple", label: "Apple", icon: <span>🍎</span> },
  { value: "banana", label: "Banana", icon: <span>🍌</span> },
  { value: "orange", label: "Orange", icon: <span>🍊</span> },
  { value: "grape", label: "Grape", icon: <span>🍇</span> },
  { value: "strawberry", label: "Strawberry", icon: <span>🍓</span> },
  { value: "watermelon", label: "Watermelon", icon: <span>🍉</span> },
];

const countries = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "fr", label: "France", description: "Europe" },
  { value: "au", label: "Australia", description: "Oceania" },
];

const groupedOptions = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue", group: "Frontend" },
  { value: "angular", label: "Angular", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "python", label: "Python", group: "Backend" },
  { value: "go", label: "Go", group: "Backend" },
  { value: "postgres", label: "PostgreSQL", group: "Database" },
  { value: "mongodb", label: "MongoDB", group: "Database" },
];

const statusOptions = [
  { value: "active", label: "Active", icon: <span className="w-2 h-2 rounded-full bg-success" /> },
  { value: "pending", label: "Pending", icon: <span className="w-2 h-2 rounded-full bg-warning" /> },
  { value: "inactive", label: "Inactive", icon: <span className="w-2 h-2 rounded-full bg-danger" /> },
  { value: "archived", label: "Archived", disabled: true, icon: <span className="w-2 h-2 rounded-full bg-muted-foreground" /> },
];

export default function SelectPage() {
  const [basicValue, setBasicValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);

  return (
          <div className="flex gap-10">
        <div className="flex-1 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Select</h1>
          <p className="text-lg text-muted-foreground mb-8">
            A customizable dropdown select component with search, groups, icons, and multi-select support.
          </p>

          {/* Installation */}
          <section id="installation" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Installation</h2>
            <CodeBlock language="bash" code="npx sparkui-cli add select" />
          </section>

          {/* Usage */}
          <section id="usage" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Usage</h2>
            <CodePreview
              preview={
                <div className="max-w-xs w-full">
                  <Select
                    options={fruits}
                    label="Favorite Fruit"
                    placeholder="Choose a fruit"
                    value={basicValue}
                    onChange={(v) => setBasicValue(v)}
                  />
                  {basicValue && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Selected: <span className="text-foreground font-medium">{basicValue}</span>
                    </p>
                  )}
                </div>
              }
              code={`import { Select } from "@/components/ui/select";

const fruits = [
  { value: "apple", label: "Apple", icon: <span>🍎</span> },
  { value: "banana", label: "Banana", icon: <span>🍌</span> },
  { value: "orange", label: "Orange", icon: <span>🍊</span> },
];

<Select
  options={fruits}
  label="Favorite Fruit"
  placeholder="Choose a fruit"
  value={value}
  onChange={(v) => setValue(v)}
/>`}
            />
          </section>

          {/* Variants */}
          <section id="variants" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Variants</h2>
            <CodePreview
              preview={
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
                  <Select options={fruits} variant="default" label="Default" placeholder="Select..." />
                  <Select options={fruits} variant="filled" label="Filled" placeholder="Select..." />
                  <Select options={fruits} variant="flat" label="Flat" placeholder="Select..." />
                  <Select options={fruits} variant="underline" label="Underline" placeholder="Select..." />
                  <Select options={fruits} variant="ghost" label="Ghost" placeholder="Select..." />
                </div>
              }
              code={`<Select options={options} variant="default" label="Default" />
<Select options={options} variant="filled" label="Filled" />
<Select options={options} variant="flat" label="Flat" />
<Select options={options} variant="underline" label="Underline" />
<Select options={options} variant="ghost" label="Ghost" />`}
            />
          </section>

          {/* Colors */}
          <section id="colors" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Colors</h2>
            <CodePreview
              preview={
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
                  <Select options={fruits} color="default" label="Default" placeholder="Select..." />
                  <Select options={fruits} color="primary" label="Primary" placeholder="Select..." />
                  <Select options={fruits} color="secondary" label="Secondary" placeholder="Select..." />
                  <Select options={fruits} color="success" label="Success" placeholder="Select..." />
                  <Select options={fruits} color="warning" label="Warning" placeholder="Select..." />
                  <Select options={fruits} color="danger" label="Danger" placeholder="Select..." />
                </div>
              }
              code={`<Select options={options} color="default" label="Default" />
<Select options={options} color="primary" label="Primary" />
<Select options={options} color="secondary" label="Secondary" />
<Select options={options} color="success" label="Success" />
<Select options={options} color="warning" label="Warning" />
<Select options={options} color="danger" label="Danger" />`}
            />
          </section>

          {/* Sizes */}
          <section id="sizes" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <CodePreview
              preview={
                <div className="grid gap-6 sm:grid-cols-3 w-full">
                  <Select options={fruits} size="sm" label="Small" placeholder="Select..." />
                  <Select options={fruits} size="md" label="Medium" placeholder="Select..." />
                  <Select options={fruits} size="lg" label="Large" placeholder="Select..." />
                </div>
              }
              code={`<Select options={options} size="sm" label="Small" />
<Select options={options} size="md" label="Medium" />
<Select options={options} size="lg" label="Large" />`}
            />
          </section>

          {/* With Icons */}
          <section id="with-icons" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
            <p className="text-muted-foreground mb-4">
              Options can include icons that display in both the dropdown and selected value.
            </p>
            <CodePreview
              preview={
                <div className="max-w-xs w-full">
                  <Select options={fruits} label="Select with Icons" placeholder="Choose a fruit" />
                </div>
              }
              code={`const fruits = [
  { value: "apple", label: "Apple", icon: <span>🍎</span> },
  { value: "banana", label: "Banana", icon: <span>🍌</span> },
  { value: "orange", label: "Orange", icon: <span>🍊</span> },
];

<Select options={fruits} label="Select with Icons" />`}
            />
          </section>

          {/* With Descriptions */}
          <section id="with-descriptions" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">With Descriptions</h2>
            <p className="text-muted-foreground mb-4">
              Add descriptions to options for additional context.
            </p>
            <CodePreview
              preview={
                <div className="max-w-xs w-full">
                  <Select options={countries} label="Country" placeholder="Select a country" />
                </div>
              }
              code={`const countries = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
];

<Select options={countries} label="Country" />`}
            />
          </section>

          {/* Grouped Options */}
          <section id="grouped" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Grouped Options</h2>
            <p className="text-muted-foreground mb-4">
              Organize options into groups using the <code className="px-1.5 py-0.5 rounded bg-muted text-sm">group</code> property.
            </p>
            <CodePreview
              preview={
                <div className="max-w-xs w-full">
                  <Select options={groupedOptions} label="Technology Stack" placeholder="Select technology" />
                </div>
              }
              code={`const options = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "python", label: "Python", group: "Backend" },
];

<Select options={options} label="Technology Stack" />`}
            />
          </section>

          {/* Searchable */}
          <section id="searchable" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Searchable</h2>
            <p className="text-muted-foreground mb-4">
              Enable search to filter options as you type.
            </p>
            <CodePreview
              preview={
                <div className="max-w-xs w-full">
                  <Select options={countries} searchable label="Search Countries" placeholder="Type to search..." />
                </div>
              }
              code={`<Select
  options={countries}
  searchable
  label="Search Countries"
  placeholder="Type to search..."
/>`}
            />
          </section>

          {/* Clearable */}
          <section id="clearable" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Clearable</h2>
            <p className="text-muted-foreground mb-4">
              Allow users to clear the selection with a clear button.
            </p>
            <CodePreview
              preview={
                <div className="max-w-xs w-full">
                  <Select options={fruits} clearable label="Clearable Select" placeholder="Select a fruit" defaultValue="apple" />
                </div>
              }
              code={`<Select
  options={fruits}
  clearable
  label="Clearable Select"
  defaultValue="apple"
/>`}
            />
          </section>

          {/* Disabled Options */}
          <section id="disabled-options" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Disabled Options</h2>
            <p className="text-muted-foreground mb-4">
              Individual options can be disabled.
            </p>
            <CodePreview
              preview={
                <div className="max-w-xs w-full">
                  <Select options={statusOptions} label="Status" placeholder="Select status" />
                </div>
              }
              code={`const options = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived", disabled: true },
];

<Select options={options} label="Status" />`}
            />
          </section>

          {/* States */}
          <section id="states" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">States</h2>
            <CodePreview
              preview={
                <div className="grid gap-6 sm:grid-cols-2 w-full">
                  <Select options={fruits} label="Disabled" placeholder="Select..." disabled />
                  <Select options={fruits} label="Loading" placeholder="Loading..." loading />
                  <Select options={fruits} label="Invalid" placeholder="Select..." invalid errorMessage="Please select an option" />
                  <Select options={fruits} label="With Description" placeholder="Select..." description="Choose your favorite fruit" />
                </div>
              }
              code={`<Select options={options} label="Disabled" disabled />
<Select options={options} label="Loading" loading />
<Select
  options={options}
  label="Invalid"
  invalid
  errorMessage="Please select an option"
/>
<Select
  options={options}
  label="With Description"
  description="Choose your favorite fruit"
/>`}
            />
          </section>

          {/* Flat Variant Colors */}
          <section id="flat-colors" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Flat Variant Colors</h2>
            <p className="text-muted-foreground mb-4">
              The flat variant with different colors creates a beautiful, subtle look with matching text colors.
            </p>
            <CodePreview
              preview={
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
                  <Select options={statusOptions} variant="flat" color="primary" label="Primary" defaultValue="active" />
                  <Select options={statusOptions} variant="flat" color="secondary" label="Secondary" defaultValue="active" />
                  <Select options={statusOptions} variant="flat" color="success" label="Success" defaultValue="active" />
                  <Select options={statusOptions} variant="flat" color="warning" label="Warning" defaultValue="pending" />
                  <Select options={statusOptions} variant="flat" color="danger" label="Danger" defaultValue="inactive" />
                </div>
              }
              code={`<Select options={options} variant="flat" color="primary" defaultValue="active" />
<Select options={options} variant="flat" color="secondary" defaultValue="active" />
<Select options={options} variant="flat" color="success" defaultValue="active" />
<Select options={options} variant="flat" color="warning" defaultValue="pending" />
<Select options={options} variant="flat" color="danger" defaultValue="inactive" />`}
            />
          </section>

          {/* Menu Variants */}
          <section id="menu-variants" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Menu Variants</h2>
            <p className="text-muted-foreground mb-4">
              Customize the dropdown menu appearance with different variants. The menu supports floating highlight animation on hover.
            </p>
            <CodePreview
              preview={
                <div className="grid gap-6 sm:grid-cols-2 w-full">
                  <Select options={fruits} menuVariant="default" color="primary" label="Default Menu" placeholder="Select..." />
                  <Select options={fruits} menuVariant="solid" color="primary" label="Solid Menu" placeholder="Select..." />
                  <Select options={fruits} menuVariant="flat" color="primary" label="Flat Menu" placeholder="Select..." />
                  <Select options={fruits} menuVariant="bordered" color="primary" label="Bordered Menu" placeholder="Select..." />
                </div>
              }
              code={`<Select options={options} menuVariant="default" label="Default Menu" />
<Select options={options} menuVariant="solid" label="Solid Menu" />
<Select options={options} menuVariant="flat" label="Flat Menu" />
<Select options={options} menuVariant="bordered" label="Bordered Menu" />`}
            />
            <p className="text-muted-foreground mt-4 mb-4">
              Menu variants work with all colors:
            </p>
            <CodePreview
              preview={
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
                  <Select options={fruits} menuVariant="solid" color="primary" label="Primary Solid" placeholder="Select..." />
                  <Select options={fruits} menuVariant="solid" color="secondary" label="Secondary Solid" placeholder="Select..." />
                  <Select options={fruits} menuVariant="solid" color="success" label="Success Solid" placeholder="Select..." />
                  <Select options={fruits} menuVariant="flat" color="warning" label="Warning Flat" placeholder="Select..." />
                  <Select options={fruits} menuVariant="flat" color="danger" label="Danger Flat" placeholder="Select..." />
                  <Select options={fruits} menuVariant="bordered" color="primary" label="Primary Bordered" placeholder="Select..." />
                </div>
              }
              code={`<Select options={options} menuVariant="solid" color="primary" />
<Select options={options} menuVariant="solid" color="secondary" />
<Select options={options} menuVariant="solid" color="success" />
<Select options={options} menuVariant="flat" color="warning" />
<Select options={options} menuVariant="flat" color="danger" />
<Select options={options} menuVariant="bordered" color="primary" />`}
            />
          </section>

          {/* Multi Select */}
          <section id="multi-select" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Multi Select</h2>
            <p className="text-muted-foreground mb-4">
              Allow selecting multiple options with the <code className="px-1.5 py-0.5 rounded bg-muted text-sm">MultiSelect</code> component.
            </p>
            <CodePreview
              preview={
                <div className="max-w-md w-full">
                  <MultiSelect
                    options={fruits}
                    label="Select Multiple Fruits"
                    placeholder="Choose fruits..."
                    value={multiValue}
                    onChange={(values) => setMultiValue(values)}
                  />
                  {multiValue.length > 0 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Selected: <span className="text-foreground font-medium">{multiValue.join(", ")}</span>
                    </p>
                  )}
                </div>
              }
              code={`import { MultiSelect } from "@/components/ui/select";

<MultiSelect
  options={fruits}
  label="Select Multiple Fruits"
  placeholder="Choose fruits..."
  value={values}
  onChange={(values) => setValues(values)}
/>`}
            />
          </section>

          {/* Multi Select Searchable */}
          <section id="multi-searchable" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Multi Select with Search</h2>
            <CodePreview
              preview={
                <div className="max-w-md w-full">
                  <MultiSelect options={groupedOptions} searchable label="Select Technologies" placeholder="Search and select..." />
                </div>
              }
              code={`<MultiSelect
  options={technologies}
  searchable
  label="Select Technologies"
  placeholder="Search and select..."
/>`}
            />
          </section>

          {/* Keyboard Navigation */}
          <section id="keyboard" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
            <div className="p-5 rounded-xl border border-border">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Navigation</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">↓</kbd> Navigate options</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Home</kbd> First option</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">End</kbd> Last option</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Actions</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Enter</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Space</kbd> Select option</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Escape</kbd> Close dropdown</li>
                    <li><kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">Backspace</kbd> Remove last (multi)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Props */}
          <section id="props">
            <h2 className="text-2xl font-semibold mb-4">Props</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="py-3 px-4"><code className="text-primary">options</code></td><td className="py-3 px-4 text-muted-foreground">SelectOption[]</td><td className="py-3 px-4 text-muted-foreground">required</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">variant</code></td><td className="py-3 px-4 text-muted-foreground">"default" | "filled" | "flat" | "underline" | "ghost"</td><td className="py-3 px-4 text-muted-foreground">"default"</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">color</code></td><td className="py-3 px-4 text-muted-foreground">"default" | "primary" | "secondary" | "success" | "warning" | "danger"</td><td className="py-3 px-4 text-muted-foreground">"primary"</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">menuVariant</code></td><td className="py-3 px-4 text-muted-foreground">"default" | "solid" | "flat" | "bordered"</td><td className="py-3 px-4 text-muted-foreground">"default"</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">size</code></td><td className="py-3 px-4 text-muted-foreground">"sm" | "md" | "lg"</td><td className="py-3 px-4 text-muted-foreground">"md"</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">searchable</code></td><td className="py-3 px-4 text-muted-foreground">boolean</td><td className="py-3 px-4 text-muted-foreground">false</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">clearable</code></td><td className="py-3 px-4 text-muted-foreground">boolean</td><td className="py-3 px-4 text-muted-foreground">false</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">disabled</code></td><td className="py-3 px-4 text-muted-foreground">boolean</td><td className="py-3 px-4 text-muted-foreground">false</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">loading</code></td><td className="py-3 px-4 text-muted-foreground">boolean</td><td className="py-3 px-4 text-muted-foreground">false</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">invalid</code></td><td className="py-3 px-4 text-muted-foreground">boolean</td><td className="py-3 px-4 text-muted-foreground">false</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">renderOption</code></td><td className="py-3 px-4 text-muted-foreground">(option, isSelected, isHighlighted) =&gt; ReactNode</td><td className="py-3 px-4 text-muted-foreground">-</td></tr>
                  <tr><td className="py-3 px-4"><code className="text-primary">renderValue</code></td><td className="py-3 px-4 text-muted-foreground">(option) =&gt; ReactNode</td><td className="py-3 px-4 text-muted-foreground">-</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <TableOfContents items={tocItems} />
      </div>
  );
}
