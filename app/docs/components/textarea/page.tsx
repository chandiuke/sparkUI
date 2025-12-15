"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
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
  { id: "rows", title: "Rows" },
  { id: "auto-resize", title: "Auto Resize" },
  { id: "resize-options", title: "Resize Options" },
  { id: "character-count", title: "Character Count" },
  { id: "validation", title: "Validation States" },
  { id: "custom-validation", title: "Custom Validation Styling" },
  { id: "form-validation", title: "Form Validation" },
  { id: "borderless", title: "Borderless" },
  { id: "disabled", title: "Disabled" },
  { id: "props", title: "Props" },
];

// Form Validation Demo
function FormValidationDemo() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const validate = (value: string) => {
    if (!value.trim()) return "Message is required";
    if (value.length < 10) return "Message must be at least 10 characters";
    if (value.length > 500) return "Message is too long";
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setError(validate(message));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <Textarea
        label="Your Message"
        placeholder="Tell us what you think..."
        value={message}
        onValueChange={setMessage}
        invalid={submitted && !!error}
        valid={submitted && !error && message.length > 0}
        errorMessage={error}
        successMessage="Message looks great!"
        maxLength={500}
        rows={4}
        required
      />
      <Button type="submit" color="primary">
        Submit Feedback
      </Button>
    </form>
  );
}

// Auto Resize Demo
function AutoResizeDemo() {
  const [value, setValue] = useState("");
  
  return (
    <div className="w-full max-w-md">
      <Textarea
        label="Auto-expanding textarea"
        placeholder="Start typing... I'll grow as you type!"
        value={value}
        onValueChange={setValue}
        resize="auto"
        minRows={2}
        maxRows={8}
        showCount
        description="Grows from 2 to 8 rows automatically"
      />
    </div>
  );
}

// Custom Validation Styling Demo
function CustomValidationDemo() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const checkMessage = async (value: string) => {
    if (!value.trim()) {
      setResult({ valid: false, message: "Message is required" });
      return;
    }
    if (value.length < 10) {
      setResult({ valid: false, message: "Message must be at least 10 characters" });
      return;
    }

    setLoading(true);
    setResult(null);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const hasSpam = value.toLowerCase().includes("spam");
    setResult({
      valid: !hasSpam,
      message: hasSpam ? "Message contains prohibited content" : "Message looks great!",
    });
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    checkMessage(message);
  };

  const handleReset = () => {
    setMessage("");
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <Textarea
        label="Your Message"
        placeholder="Write your message here..."
        value={message}
        onValueChange={(v) => {
          setMessage(v);
          if (submitted) {
            setSubmitted(false);
            setResult(null);
          }
        }}
        variant="flat"
        color={getColor()}
        loading={loading}
        invalid={submitted && result?.valid === false}
        valid={submitted && result?.valid === true}
        errorMessage={submitted && result?.valid === false ? result.message : undefined}
        successMessage={submitted && result?.valid === true ? result.message : undefined}
        rows={3}
        maxLength={200}
      />
      <div className="flex gap-2">
        <Button type="submit" color="primary" loading={loading} className="flex-1">
          Submit Message
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Try: typing "spam" to see error, or a valid message (10+ chars)
      </p>
    </form>
  );
}


export default function TextareaPage() {
  return (
          <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Textarea</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A multi-line text input with auto-resize, validation states, character count, and rich customization options.
            </p>
          </header>

          <div className="space-y-16">
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui-cli add textarea" language="bash" />
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { Textarea } from "@/components/ui/textarea"

export default function Example() {
  return <Textarea placeholder="Enter your message..." />
}`}
              />
            </section>

            <section id="variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Variants</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Five visual styles matching the Input component: default, filled, flat (soft colored), underline, and ghost.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea variant="default" placeholder="Default variant" rows={2} />
                    <Textarea variant="filled" placeholder="Filled variant" rows={2} />
                    <Textarea variant="flat" color="primary" placeholder="Flat Primary variant" rows={2} />
                    <Textarea variant="underline" placeholder="Underline variant" rows={2} color="primary" />
                    <Textarea variant="ghost" placeholder="Ghost variant" rows={2} />
                  </div>
                }
                code={`<Textarea variant="default" placeholder="Default" />
<Textarea variant="filled" placeholder="Filled" />
<Textarea variant="flat" color="primary" placeholder="Flat Primary" />
<Textarea variant="underline" placeholder="Underline" />
<Textarea variant="ghost" placeholder="Ghost" />`}
              />
            </section>

            <section id="sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Three sizes that affect text size and padding.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea size="sm" placeholder="Small textarea" rows={2} />
                    <Textarea size="md" placeholder="Medium textarea" rows={2} />
                    <Textarea size="lg" placeholder="Large textarea" rows={2} />
                  </div>
                }
                code={`<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />`}
              />
            </section>

            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <p className="text-muted-foreground mb-6">Colors affect the border, focus ring, and label.</p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                    <Textarea color="default" label="Default" placeholder="Focus me" rows={2} />
                    <Textarea color="primary" label="Primary" placeholder="Focus me" rows={2} />
                    <Textarea color="secondary" label="Secondary" placeholder="Focus me" rows={2} />
                    <Textarea color="success" label="Success" placeholder="Focus me" rows={2} />
                    <Textarea color="warning" label="Warning" placeholder="Focus me" rows={2} />
                    <Textarea color="danger" label="Danger" placeholder="Focus me" rows={2} />
                  </div>
                }
                code={`<Textarea color="default" label="Default" />
<Textarea color="primary" label="Primary" />
<Textarea color="secondary" label="Secondary" />
<Textarea color="success" label="Success" />
<Textarea color="warning" label="Warning" />
<Textarea color="danger" label="Danger" />`}
              />
            </section>

            <section id="with-label">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Label</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Add labels, required indicators, and helper descriptions.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea label="Bio" placeholder="Tell us about yourself" rows={3} />
                    <Textarea label="Feedback" placeholder="Your feedback" required rows={3} />
                    <Textarea label="Notes" placeholder="Additional notes" description="Optional - max 200 characters" rows={3} />
                  </div>
                }
                code={`<Textarea label="Bio" placeholder="Tell us about yourself" />
<Textarea label="Feedback" placeholder="Your feedback" required />
<Textarea label="Notes" description="Optional - max 200 characters" />`}
              />
            </section>

            <section id="rows">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Rows</h2>
              <p className="text-muted-foreground mb-6">Control the initial height with the rows prop.</p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea rows={2} placeholder="2 rows" />
                    <Textarea rows={4} placeholder="4 rows (default is 3)" />
                    <Textarea rows={6} placeholder="6 rows" />
                  </div>
                }
                code={`<Textarea rows={2} placeholder="2 rows" />
<Textarea rows={4} placeholder="4 rows" />
<Textarea rows={6} placeholder="6 rows" />`}
              />
            </section>

            <section id="auto-resize">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Auto Resize</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Set <code className="text-primary">resize="auto"</code> to make the textarea grow automatically as you type.
                Use <code className="text-primary">minRows</code> and <code className="text-primary">maxRows</code> to constrain the height.
              </p>
              <CodePreview
                preview={<AutoResizeDemo />}
                code={`const [value, setValue] = useState("");

<Textarea
  label="Auto-expanding textarea"
  placeholder="Start typing... I'll grow!"
  value={value}
  onValueChange={setValue}
  resize="auto"
  minRows={2}
  maxRows={8}
  showCount
/>`}
              />
            </section>

            <section id="resize-options">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Resize Options</h2>
              <p className="text-muted-foreground mb-6">Control how users can manually resize the textarea.</p>
              <CodePreview
                preview={
                  <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                    <Textarea resize="none" label="No resize" placeholder="Can't resize" rows={3} />
                    <Textarea resize="vertical" label="Vertical only" placeholder="Drag bottom edge" rows={3} />
                    <Textarea resize="horizontal" label="Horizontal only" placeholder="Drag right edge" rows={3} />
                    <Textarea resize="both" label="Both directions" placeholder="Drag corner" rows={3} />
                  </div>
                }
                code={`<Textarea resize="none" label="No resize" />
<Textarea resize="vertical" label="Vertical only" />
<Textarea resize="horizontal" label="Horizontal only" />
<Textarea resize="both" label="Both directions" />`}
              />
            </section>

            <section id="character-count">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Character Count</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use <code className="text-primary">showCount</code> to display character count, or <code className="text-primary">maxLength</code> to also limit input.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea showCount label="With counter" placeholder="Type to see count" rows={3} />
                    <Textarea maxLength={100} label="With limit" placeholder="Max 100 characters" rows={3} />
                    <Textarea maxLength={50} defaultValue="This text is close to the limit!" label="Near limit" rows={3} />
                  </div>
                }
                code={`<Textarea showCount label="With counter" />
<Textarea maxLength={100} label="With limit" />
<Textarea maxLength={50} defaultValue="Near limit!" />`}
              />
            </section>

            <section id="validation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Validation States</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use <code className="text-primary">invalid</code> for errors and <code className="text-primary">valid</code> for success states.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea 
                      label="Invalid State" 
                      invalid 
                      errorMessage="Message is too short" 
                      defaultValue="Hi" 
                      rows={3}
                    />
                    <Textarea 
                      label="Valid State" 
                      valid 
                      successMessage="Message looks great!" 
                      defaultValue="This is a well-written message with enough detail." 
                      rows={3}
                    />
                  </div>
                }
                code={`<Textarea 
  label="Invalid State" 
  invalid 
  errorMessage="Message is too short" 
  defaultValue="Hi" 
/>

<Textarea 
  label="Valid State" 
  valid 
  successMessage="Message looks great!" 
  defaultValue="This is a well-written message." 
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
                      By default, <code className="text-primary">invalid</code> uses danger color and <code className="text-primary">valid</code> uses success color.
                      However, you can fully customize the validation appearance by setting a custom <code className="text-primary">color</code> or <code className="text-primary">variant</code>.
                      When you set a color other than "default", it will be used instead of the automatic danger/success colors.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Static examples showing different validation styles:
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea 
                      label="Default Invalid (danger)" 
                      invalid 
                      errorMessage="Uses danger color automatically" 
                      defaultValue="Short" 
                      rows={2}
                    />
                    <Textarea 
                      label="Custom Invalid (warning flat)" 
                      variant="flat"
                      color="warning"
                      invalid 
                      errorMessage="Soft warning style" 
                      defaultValue="Warning message" 
                      rows={2}
                    />
                    <Textarea 
                      label="Custom Valid (success flat)" 
                      variant="flat"
                      color="success"
                      valid 
                      successMessage="Custom success style" 
                      defaultValue="This looks great!" 
                      rows={2}
                    />
                  </div>
                }
                code={`// Default behavior - uses danger color automatically
<Textarea invalid errorMessage="Error message" />

// Custom validation styling - use any color/variant combo
<Textarea 
  variant="flat"
  color="warning"
  invalid 
  errorMessage="Soft warning style" 
/>

<Textarea 
  variant="flat"
  color="success"
  valid 
  successMessage="Custom success style" 
/>`}
              />
              <p className="text-muted-foreground mt-8 mb-6">
                Interactive example with submit and loading state:
              </p>
              <CodePreview
                preview={<CustomValidationDemo />}
                code={`const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [result, setResult] = useState(null);

const checkMessage = async (value) => {
  if (!value.trim() || value.length < 10) {
    setResult({ valid: false, message: "Message too short" });
    return;
  }
  
  setLoading(true);
  await new Promise(r => setTimeout(r, 1000)); // API call
  
  const hasSpam = value.includes("spam");
  setResult({
    valid: !hasSpam,
    message: hasSpam ? "Contains prohibited content" : "Looks great!",
  });
  setLoading(false);
};

// Color: checking = warning, error = danger, success = success
const getColor = () => {
  if (loading) return "warning";
  if (submitted && result) return result.valid ? "success" : "danger";
  return "primary";
};

<Textarea
  label="Your Message"
  value={message}
  onValueChange={(v) => {
    setMessage(v);
    if (submitted) { setSubmitted(false); setResult(null); }
  }}
  variant="flat"
  color={getColor()}
  loading={loading}
  invalid={submitted && result?.valid === false}
  valid={submitted && result?.valid === true}
  errorMessage={submitted && !result?.valid ? result?.message : undefined}
  successMessage={submitted && result?.valid ? result?.message : undefined}
/>
<Button type="submit" loading={loading}>Submit</Button>`}
              />
            </section>

            <section id="form-validation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Form Validation</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Validate on form submit, not on every keystroke.
              </p>
              <CodePreview
                preview={<FormValidationDemo />}
                code={`const [message, setMessage] = useState("");
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState();

const validate = (value) => {
  if (!value.trim()) return "Message is required";
  if (value.length < 10) return "At least 10 characters";
  return undefined;
};

const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  setError(validate(message));
};

<form onSubmit={handleSubmit}>
  <Textarea
    label="Your Message"
    value={message}
    onValueChange={setMessage}
    invalid={submitted && !!error}
    valid={submitted && !error}
    errorMessage={error}
    successMessage="Message looks great!"
    maxLength={500}
  />
  <Button type="submit">Submit</Button>
</form>`}
              />
            </section>

            <section id="borderless">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Borderless</h2>
              <p className="text-muted-foreground mb-6">Remove borders for a cleaner look.</p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea borderless placeholder="Borderless default" rows={3} />
                    <Textarea borderless variant="filled" placeholder="Borderless filled" rows={3} />
                  </div>
                }
                code={`<Textarea borderless placeholder="Borderless default" />
<Textarea borderless variant="filled" placeholder="Borderless filled" />`}
              />
            </section>

            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled & Read Only</h2>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-md">
                    <Textarea label="Disabled" disabled defaultValue="Can't edit this content" rows={3} />
                    <Textarea label="Read Only" readOnly defaultValue="This is read-only content that can be selected but not edited." rows={3} />
                  </div>
                }
                code={`<Textarea label="Disabled" disabled defaultValue="Can't edit" />
<Textarea label="Read Only" readOnly defaultValue="Read only" />`}
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
                      ["variant", '"default" | "filled" | "flat" | "underline" | "ghost"', '"default"', "Visual style variant"],
                      ["size", '"sm" | "md" | "lg"', '"md"', "Textarea size"],
                      ["color", '"default" | "primary" | "secondary" | "success" | "warning" | "danger"', '"default"', "Color theme"],
                      ["label", "string", "-", "Label text above textarea"],
                      ["placeholder", "string", "-", "Placeholder text"],
                      ["description", "string", "-", "Helper text below textarea"],
                      ["value", "string", "-", "Controlled value"],
                      ["defaultValue", "string", '""', "Initial uncontrolled value"],
                      ["rows", "number", "3", "Number of visible text rows"],
                      ["minRows", "number", "-", "Minimum rows for auto-resize"],
                      ["maxRows", "number", "-", "Maximum rows for auto-resize"],
                      ["resize", '"none" | "vertical" | "horizontal" | "both" | "auto"', '"vertical"', "Resize behavior"],
                      ["disabled", "boolean", "false", "Disable the textarea"],
                      ["readOnly", "boolean", "false", "Make textarea read-only"],
                      ["required", "boolean", "false", "Show required asterisk"],
                      ["invalid", "boolean", "false", "Show error state with icon"],
                      ["valid", "boolean", "false", "Show success state with icon"],
                      ["loading", "boolean", "false", "Show loading spinner"],
                      ["borderless", "boolean", "false", "Remove all borders"],
                      ["border", "string", "-", "Custom border classes"],
                      ["focusRing", "string", "-", "Custom focus ring classes"],
                      ["errorMessage", "ReactNode", "-", "Error message (shown when invalid)"],
                      ["successMessage", "ReactNode", "-", "Success message (shown when valid)"],
                      ["maxLength", "number", "-", "Max character length with counter"],
                      ["showCount", "boolean", "false", "Show character count without limit"],
                      ["onValueChange", "(value: string) => void", "-", "Value change callback"],
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
