"use client";

import { useState } from "react";
import { PageWrapper } from "@/components/page-transition";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "variants", title: "Variants" },
  { id: "sizes", title: "Sizes" },
  { id: "colors", title: "Colors" },
  { id: "with-label", title: "With Label" },
  { id: "description", title: "Description" },
  { id: "min-max-date", title: "Min/Max Date" },
  { id: "controlled", title: "Controlled Mode" },
  { id: "validation", title: "Validation" },
  { id: "custom-validation", title: "Custom Validation Styling" },
  { id: "disabled", title: "Disabled" },
  { id: "custom-border", title: "Custom Border" },
  { id: "borderless", title: "Borderless" },
  { id: "props", title: "Props" },
];

// Custom Validation Styling Demo
function CustomValidationDemo() {
  const [date, setDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const checkDate = async (value: Date | null) => {
    if (!value) {
      setResult({ valid: false, message: "Please select a date" });
      return;
    }

    setLoading(true);
    setResult(null);
    await new Promise(resolve => setTimeout(resolve, 800));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isWeekend = value.getDay() === 0 || value.getDay() === 6;
    const isPast = value < today;

    if (isPast) {
      setResult({ valid: false, message: "Date must be in the future" });
    } else if (isWeekend) {
      setResult({ valid: false, message: "Weekends are not available" });
    } else {
      setResult({ valid: true, message: "Date is available!" });
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    checkDate(date);
  };

  const handleReset = () => {
    setDate(null);
    setSubmitted(false);
    setResult(null);
  };

  // Color logic: checking = warning, error = danger, success = success
  const getColor = () => {
    if (loading) return "warning";
    if (submitted && result) return result.valid ? "success" : "danger";
    return "primary";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <DatePicker
        label="Appointment Date"
        placeholder="Select a date"
        value={date}
        onChange={(d) => {
          setDate(d);
          if (submitted) {
            setSubmitted(false);
            setResult(null);
          }
        }}
        variant="flat"
        color={getColor()}
        invalid={submitted && result?.valid === false}
        errorMessage={submitted && result?.valid === false ? result.message : undefined}
      />
      {submitted && result?.valid && (
        <p className="text-sm text-success">{result.message}</p>
      )}
      <div className="flex gap-2">
        <Button type="submit" color="primary" loading={loading} className="flex-1">
          Check Availability
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Try: selecting a weekend or past date to see error
      </p>
    </form>
  );
}

export default function DatePickerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <PageWrapper>
      <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Date Picker</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A beautiful date picker component with calendar view, month/year selection, and smooth animations. 
              Follows the same styling system as the Input component for consistency.
            </p>
          </header>

          <div className="space-y-16">
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui-cli add date-picker" language="bash" />
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <p className="text-muted-foreground mb-6">
                Import the DatePicker component and use it with controlled or uncontrolled state.
              </p>
              <CodeBlock
                code={`import { DatePicker } from "@/components/ui/date-picker"

export default function Example() {
  const [date, setDate] = useState<Date | null>(null)
  
  return (
    <DatePicker
      label="Select date"
      value={date}
      onChange={setDate}
    />
  )
}`}
              />
            </section>

            <section id="variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Variants</h2>
              <p className="text-muted-foreground mb-6">
                Five visual variants to match your design: default (bordered), filled (background), flat (soft colored), underline (minimal), and ghost (transparent).
              </p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <DatePicker variant="default" label="Default" placeholder="Select date" />
                    <DatePicker variant="filled" label="Filled" placeholder="Select date" />
                    <DatePicker variant="flat" color="primary" label="Flat Primary" placeholder="Select date" />
                    <DatePicker variant="underline" label="Underline" placeholder="Select date" />
                    <DatePicker variant="ghost" label="Ghost" placeholder="Select date" />
                  </div>
                }
                code={`<DatePicker variant="default" label="Default" />
<DatePicker variant="filled" label="Filled" />
<DatePicker variant="flat" color="primary" label="Flat Primary" />
<DatePicker variant="underline" label="Underline" />
<DatePicker variant="ghost" label="Ghost" />`}
              />
            </section>

            <section id="sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
              <p className="text-muted-foreground mb-6">
                Three sizes available: sm (36px), md (44px), and lg (56px). The label and text scale accordingly.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker size="sm" label="Small" placeholder="Select date" />
                    <DatePicker size="md" label="Medium (default)" placeholder="Select date" />
                    <DatePicker size="lg" label="Large" placeholder="Select date" />
                  </div>
                }
                code={`<DatePicker size="sm" label="Small" />
<DatePicker size="md" label="Medium (default)" />
<DatePicker size="lg" label="Large" />`}
              />
            </section>

            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <p className="text-muted-foreground mb-6">
                Six color options that affect the focus ring, border highlight, and calendar accent colors. Click to see the focus state.
              </p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <DatePicker color="default" label="Default" placeholder="Select date" />
                    <DatePicker color="primary" label="Primary" placeholder="Select date" />
                    <DatePicker color="secondary" label="Secondary" placeholder="Select date" />
                    <DatePicker color="success" label="Success" placeholder="Select date" />
                    <DatePicker color="warning" label="Warning" placeholder="Select date" />
                    <DatePicker color="danger" label="Danger" placeholder="Select date" />
                  </div>
                }
                code={`<DatePicker color="default" label="Default" />
<DatePicker color="primary" label="Primary" />
<DatePicker color="secondary" label="Secondary" />
<DatePicker color="success" label="Success" />
<DatePicker color="warning" label="Warning" />
<DatePicker color="danger" label="Danger" />`}
              />
            </section>

            <section id="with-label">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Label</h2>
              <p className="text-muted-foreground mb-6">
                Add a label above the input. Use the required prop to show a red asterisk.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker label="Birth Date" color="primary" />
                    <DatePicker label="Event Date" color="secondary" required />
                    <DatePicker label="Optional Date" />
                  </div>
                }
                code={`<DatePicker label="Birth Date" color="primary" />
<DatePicker label="Event Date" color="secondary" required />
<DatePicker label="Optional Date" />`}
              />
            </section>

            <section id="description">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Description</h2>
              <p className="text-muted-foreground mb-6">
                Add helper text below the input using the description prop.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker 
                      label="Deadline" 
                      description="Select a deadline for this task"
                      color="primary"
                    />
                    <DatePicker 
                      label="Start Date" 
                      description="When should the project begin?"
                      color="secondary"
                    />
                  </div>
                }
                code={`<DatePicker 
  label="Deadline" 
  description="Select a deadline for this task"
/>
<DatePicker 
  label="Start Date" 
  description="When should the project begin?"
/>`}
              />
            </section>

            <section id="min-max-date">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Min/Max Date</h2>
              <p className="text-muted-foreground mb-6">
                Restrict date selection to a specific range. Dates outside the range are disabled and grayed out.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker 
                      label="Future dates only" 
                      description="Only dates from today onwards"
                      minDate={new Date()} 
                      color="primary"
                    />
                    <DatePicker 
                      label="Past dates only" 
                      description="Only dates up to today"
                      maxDate={new Date()} 
                      color="secondary"
                    />
                    <DatePicker 
                      label="This month only" 
                      description="Restricted to current month"
                      minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                      maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
                      color="success"
                    />
                  </div>
                }
                code={`// Future dates only
<DatePicker 
  label="Future dates only" 
  minDate={new Date()} 
/>

// Past dates only
<DatePicker 
  label="Past dates only" 
  maxDate={new Date()} 
/>

// This month only
<DatePicker 
  label="This month only" 
  minDate={new Date(year, month, 1)}
  maxDate={new Date(year, month + 1, 0)}
/>`}
              />
            </section>

            <section id="controlled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Controlled Mode</h2>
              <p className="text-muted-foreground mb-6">
                Use value and onChange for controlled state. The component also supports uncontrolled mode with defaultValue.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker
                      label="Controlled Date"
                      value={selectedDate}
                      onChange={setSelectedDate}
                      color="primary"
                    />
                    <div className="p-3 rounded-lg bg-muted/50 text-sm">
                      <span className="text-muted-foreground">Selected: </span>
                      <span className="text-foreground font-mono">
                        {selectedDate ? selectedDate.toLocaleDateString("en-US", { 
                          weekday: "long", 
                          year: "numeric", 
                          month: "long", 
                          day: "numeric" 
                        }) : "No date selected"}
                      </span>
                    </div>
                  </div>
                }
                code={`const [date, setDate] = useState<Date | null>(null)

<DatePicker
  label="Controlled Date"
  value={date}
  onChange={setDate}
/>

// Display selected date
<p>Selected: {date?.toLocaleDateString()}</p>`}
              />
            </section>

            <section id="validation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Validation</h2>
              <p className="text-muted-foreground mb-6">
                Use invalid and errorMessage props to show validation errors. The border and label turn red.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker
                      label="Required Date"
                      invalid
                      errorMessage="Please select a date"
                      required
                    />
                    <DatePicker
                      label="Invalid Selection"
                      invalid
                      errorMessage="Date must be in the future"
                      defaultValue={new Date(2020, 0, 1)}
                    />
                  </div>
                }
                code={`<DatePicker
  label="Required Date"
  invalid
  errorMessage="Please select a date"
  required
/>

<DatePicker
  label="Invalid Selection"
  invalid
  errorMessage="Date must be in the future"
/>`}
              />
            </section>

            <section id="custom-validation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Custom Validation Styling</h2>
              <div className="p-4 rounded-xl border-2 border-primary/30 bg-primary/5 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-lg">💡</span>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Important Note</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      By default, <code className="text-primary">invalid</code> uses danger color.
                      However, you can fully customize the validation appearance by setting a custom <code className="text-primary">color</code> or <code className="text-primary">variant</code>.
                      When you set a color other than "primary" (the default), it will be used instead of the automatic danger color.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Static examples showing different validation styles:
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker
                      label="Default Invalid (danger)"
                      invalid
                      errorMessage="Uses danger color automatically"
                    />
                    <DatePicker
                      label="Custom Invalid (warning flat)"
                      variant="flat"
                      color="warning"
                      invalid
                      errorMessage="Soft warning style"
                    />
                    <DatePicker
                      label="Custom Invalid (danger flat)"
                      variant="flat"
                      color="danger"
                      invalid
                      errorMessage="Flat danger style"
                    />
                  </div>
                }
                code={`// Default behavior - uses danger color automatically
<DatePicker invalid errorMessage="Error message" />

// Custom validation styling - use any color/variant combo
<DatePicker 
  variant="flat"
  color="warning"
  invalid 
  errorMessage="Soft warning style" 
/>

<DatePicker 
  variant="flat"
  color="danger"
  invalid 
  errorMessage="Flat danger style" 
/>`}
              />
              <p className="text-muted-foreground mt-8 mb-6">
                Interactive example with submit and loading state:
              </p>
              <CodePreview
                preview={<CustomValidationDemo />}
                code={`const [date, setDate] = useState(null);
const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [result, setResult] = useState(null);

const checkDate = async (value) => {
  if (!value) {
    setResult({ valid: false, message: "Please select a date" });
    return;
  }
  
  setLoading(true);
  await new Promise(r => setTimeout(r, 800)); // API call
  
  const isWeekend = value.getDay() === 0 || value.getDay() === 6;
  const isPast = value < new Date();
  
  if (isPast) {
    setResult({ valid: false, message: "Date must be in the future" });
  } else if (isWeekend) {
    setResult({ valid: false, message: "Weekends not available" });
  } else {
    setResult({ valid: true, message: "Date is available!" });
  }
  setLoading(false);
};

// Color: checking = warning, error = danger, success = success
const getColor = () => {
  if (loading) return "warning";
  if (submitted && result) return result.valid ? "success" : "danger";
  return "primary";
};

<DatePicker
  label="Appointment Date"
  value={date}
  onChange={(d) => {
    setDate(d);
    if (submitted) { setSubmitted(false); setResult(null); }
  }}
  variant="flat"
  color={getColor()}
  invalid={submitted && result?.valid === false}
  errorMessage={submitted && !result?.valid ? result?.message : undefined}
/>
<Button type="submit" loading={loading}>Check Availability</Button>`}
              />
            </section>

            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled</h2>
              <p className="text-muted-foreground mb-6">
                Disable the date picker to prevent interaction. The component becomes semi-transparent.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker label="Disabled (empty)" disabled />
                    <DatePicker label="Disabled (with value)" disabled defaultValue={new Date()} />
                  </div>
                }
                code={`<DatePicker label="Disabled (empty)" disabled />
<DatePicker label="Disabled (with value)" disabled defaultValue={new Date()} />`}
              />
            </section>

            <section id="custom-border">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Custom Border</h2>
              <p className="text-muted-foreground mb-6">
                Override the default border and focus ring with custom Tailwind classes using the border and focusRing props.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker 
                      label="Pink Border" 
                      border="border-2 border-pink-500"
                      focusRing="ring-[3px] ring-pink-500/40"
                    />
                    <DatePicker 
                      label="Purple Border" 
                      border="border-2 border-purple-500"
                      focusRing="ring-[3px] ring-purple-500/40"
                    />
                    <DatePicker 
                      label="Cyan Border" 
                      border="border-2 border-cyan-500"
                      focusRing="ring-[3px] ring-cyan-500/40"
                    />
                  </div>
                }
                code={`<DatePicker 
  label="Pink Border" 
  border="border-2 border-pink-500"
  focusRing="ring-[3px] ring-pink-500/40"
/>

<DatePicker 
  label="Purple Border" 
  border="border-2 border-purple-500"
  focusRing="ring-[3px] ring-purple-500/40"
/>

<DatePicker 
  label="Cyan Border" 
  border="border-2 border-cyan-500"
  focusRing="ring-[3px] ring-cyan-500/40"
/>`}
              />
            </section>

            <section id="borderless">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Borderless</h2>
              <p className="text-muted-foreground mb-6">
                Remove all borders with the borderless prop. Works great with filled or ghost variants.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <DatePicker 
                      label="Borderless Default" 
                      borderless
                    />
                    <DatePicker 
                      label="Borderless Filled" 
                      borderless
                      variant="filled"
                    />
                    <DatePicker 
                      label="Borderless Ghost" 
                      borderless
                      variant="ghost"
                    />
                  </div>
                }
                code={`<DatePicker label="Borderless Default" borderless />
<DatePicker label="Borderless Filled" borderless variant="filled" />
<DatePicker label="Borderless Ghost" borderless variant="ghost" />`}
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
                      <th className="text-left py-4 px-5 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      ["value", "Date | null", "-", "Controlled value"],
                      ["defaultValue", "Date | null", "null", "Initial value (uncontrolled)"],
                      ["onChange", "(date: Date | null) => void", "-", "Called when date changes"],
                      ["variant", "default | filled | flat | underline | ghost", "default", "Visual style variant"],
                      ["size", "sm | md | lg", "md", "Input size"],
                      ["color", "default | primary | secondary | success | warning | danger", "primary", "Color theme"],
                      ["label", "string", "-", "Label text above input"],
                      ["placeholder", "string", '"Select date"', "Placeholder text"],
                      ["description", "string", "-", "Helper text below input"],
                      ["minDate", "Date", "-", "Minimum selectable date"],
                      ["maxDate", "Date", "-", "Maximum selectable date"],
                      ["disabled", "boolean", "false", "Disable the input"],
                      ["required", "boolean", "false", "Show required asterisk"],
                      ["invalid", "boolean", "false", "Show error state"],
                      ["borderless", "boolean", "false", "Remove all borders"],
                      ["border", "string", "-", "Custom border classes"],
                      ["focusRing", "string", "-", "Custom focus ring classes"],
                      ["errorMessage", "ReactNode", "-", "Error message text"],
                      ["className", "string", "-", "Additional CSS classes"],
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
    </PageWrapper>
  );
}
