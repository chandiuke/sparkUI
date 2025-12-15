"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
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
  { id: "password", title: "Password" },
  { id: "clearable", title: "Clearable" },
  { id: "with-icons", title: "With Icons" },
  { id: "validation", title: "Validation States" },
  { id: "custom-validation", title: "Custom Validation Styling" },
  { id: "form-validation", title: "Form Validation" },
  { id: "blur-validation", title: "Blur Validation" },
  { id: "loading", title: "Loading State" },
  { id: "borderless", title: "Borderless" },
  { id: "custom-styling", title: "Custom Styling" },
  { id: "disabled", title: "Disabled" },
  { id: "props", title: "Props" },
];

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// Form Validation Demo Component - validates on SUBMIT only
function FormValidationDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
    if (value === "taken@example.com") return "This email is already registered";
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={email}
        onValueChange={setEmail}
        invalid={submitted && !!errors.email}
        valid={submitted && !errors.email && email.length > 0}
        errorMessage={errors.email}
        successMessage="Email is available!"
        startContent={<MailIcon />}
      />
      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        value={password}
        onValueChange={setPassword}
        invalid={submitted && !!errors.password}
        valid={submitted && !errors.password && password.length > 0}
        errorMessage={errors.password}
        successMessage="Password is strong!"
        startContent={<LockIcon />}
      />
      <Button type="submit" color="primary">
        Submit
      </Button>
      <p className="text-xs text-muted-foreground">
        Try: <code className="text-primary">taken@example.com</code> to see error
      </p>
    </form>
  );
}

// Blur Validation Demo - validates on BLUR with async check
function BlurValidationDemo() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const checkEmail = async (value: string) => {
    // Basic validation first
    if (!value) {
      setResult({ valid: false, message: "Email is required" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setResult({ valid: false, message: "Please enter a valid email" });
      return;
    }

    // Async check (simulate API call)
    setLoading(true);
    setResult(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const taken = ["taken@example.com", "admin@sparkui.com"].includes(value.toLowerCase());
    setResult({
      valid: !taken,
      message: taken ? "This email is already registered" : "Email is available!",
    });
    setLoading(false);
  };

  const handleBlur = () => {
    if (email) {
      setTouched(true);
      checkEmail(email);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={email}
        onValueChange={(v) => {
          setEmail(v);
          // Reset when user starts typing again
          if (touched) {
            setResult(null);
            setTouched(false);
          }
        }}
        onBlur={handleBlur}
        loading={loading}
        invalid={touched && result?.valid === false}
        valid={touched && result?.valid === true}
        errorMessage={touched && result?.valid === false ? result.message : undefined}
        successMessage={touched && result?.valid === true ? result.message : undefined}
        startContent={<MailIcon />}
      />
      <p className="text-xs text-muted-foreground">
        Type an email and click outside. Try: <code className="text-primary">taken@example.com</code>
      </p>
    </div>
  );
}

// Async Validation Demo - validates on SUBMIT with loading state
function AsyncValidationDemo() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const checkUsername = async (value: string) => {
    if (!value) {
      setResult({ valid: false, message: "Username is required" });
      return;
    }
    if (value.length < 3) {
      setResult({ valid: false, message: "At least 3 characters required" });
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const taken = ["admin", "user", "test", "sparkui"].includes(value.toLowerCase());
    setResult({
      valid: !taken,
      message: taken ? "Username is already taken" : "Username is available!",
    });
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    checkUsername(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <Input
        label="Username"
        placeholder="Choose a username"
        value={username}
        onValueChange={setUsername}
        loading={loading}
        invalid={submitted && result?.valid === false}
        valid={submitted && result?.valid === true}
        errorMessage={submitted && result?.valid === false ? result.message : undefined}
        successMessage={submitted && result?.valid === true ? result.message : undefined}
        description={!submitted ? "At least 3 characters" : undefined}
        startContent={<UserIcon />}
      />
      <Button type="submit" color="primary" loading={loading}>
        Check Availability
      </Button>
      <p className="text-xs text-muted-foreground">
        Try: <code className="text-primary">admin</code>, <code className="text-primary">sparkui</code> (taken)
      </p>
    </form>
  );
}

// Custom Validation Styling Demo - with submit and loading
function CustomValidationDemo() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const checkEmail = async (value: string) => {
    if (!value) {
      setResult({ valid: false, message: "Email is required" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setResult({ valid: false, message: "Please enter a valid email" });
      return;
    }

    setLoading(true);
    setResult(null);
    await new Promise(resolve => setTimeout(resolve, 1200));

    const taken = ["taken@example.com", "admin@sparkui.com"].includes(value.toLowerCase());
    setResult({
      valid: !taken,
      message: taken ? "This email is already registered" : "Email is available!",
    });
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    checkEmail(email);
  };

  const handleReset = () => {
    setEmail("");
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
      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={email}
        onValueChange={(v) => {
          setEmail(v);
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
        startContent={<MailIcon />}
      />
      <div className="flex gap-2">
        <Button type="submit" color="primary" loading={loading} className="flex-1">
          Check Email
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Try: <code className="text-primary">taken@example.com</code> (taken) or any valid email
      </p>
    </form>
  );
}

export default function InputPage() {
  return (
          <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Input</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A flexible text input component with validation states, loading, and rich customization options.
            </p>
          </header>

          <div className="space-y-16">
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui-cli add input" language="bash" />
            </section>

            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { Input } from "@/components/ui/input"

export default function Example() {
  return <Input placeholder="Enter text..." />
}`}
              />
            </section>

            <section id="variants">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Variants</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Five visual styles: default (bordered), filled (background), flat (soft colored), underline (minimal), and ghost (transparent).
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input variant="default" placeholder="Default" />
                    <Input variant="filled" placeholder="Filled" />
                    <Input variant="flat" color="primary" placeholder="Flat Primary" />
                    <Input variant="underline" placeholder="Underline" color="primary" />
                    <Input variant="ghost" placeholder="Ghost" />
                  </div>
                }
                code={`<Input variant="default" placeholder="Default" />
<Input variant="filled" placeholder="Filled" />
<Input variant="flat" color="primary" placeholder="Flat Primary" />
<Input variant="underline" placeholder="Underline" />
<Input variant="ghost" placeholder="Ghost" />`}
              />
            </section>

            <section id="sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Three sizes available. Text, padding, and icons scale accordingly.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input size="sm" placeholder="Small (36px)" />
                    <Input size="md" placeholder="Medium (44px)" />
                    <Input size="lg" placeholder="Large (56px)" />
                  </div>
                }
                code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
              />
            </section>

            <section id="colors">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Colors</h2>
              <p className="text-muted-foreground mb-6">Colors affect the border, focus ring, and label.</p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input color="default" label="Default" placeholder="Focus me" />
                    <Input color="primary" label="Primary" placeholder="Focus me" />
                    <Input color="secondary" label="Secondary" placeholder="Focus me" />
                    <Input color="success" label="Success" placeholder="Focus me" />
                    <Input color="warning" label="Warning" placeholder="Focus me" />
                    <Input color="danger" label="Danger" placeholder="Focus me" />
                  </div>
                }
                code={`<Input color="default" label="Default" />
<Input color="primary" label="Primary" />
<Input color="secondary" label="Secondary" />
<Input color="success" label="Success" />
<Input color="warning" label="Warning" />
<Input color="danger" label="Danger" />`}
              />
            </section>

            <section id="with-label">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Label</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Add labels, required indicators, and helper descriptions.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input label="Email" placeholder="you@example.com" />
                    <Input label="Username" placeholder="johndoe" required />
                    <Input label="Bio" placeholder="Tell us about yourself" description="Max 200 characters" />
                  </div>
                }
                code={`<Input label="Email" placeholder="you@example.com" />
<Input label="Username" placeholder="johndoe" required />
<Input label="Bio" description="Max 200 characters" />`}
              />
            </section>

            <section id="password">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Password</h2>
              <p className="text-muted-foreground mb-6">Password inputs automatically include a show/hide toggle.</p>
              <CodePreview
                preview={
                  <div className="w-full max-w-sm">
                    <Input type="password" label="Password" placeholder="Enter password" startContent={<LockIcon />} />
                  </div>
                }
                code={`<Input 
  type="password" 
  label="Password" 
  placeholder="Enter password" 
  startContent={<LockIcon />} 
/>`}
              />
            </section>

            <section id="clearable">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Clearable</h2>
              <p className="text-muted-foreground mb-6">Show a clear button when the input has a value.</p>
              <CodePreview
                preview={
                  <div className="w-full max-w-sm">
                    <Input clearable defaultValue="Clear me!" placeholder="Type something..." />
                  </div>
                }
                code={`<Input clearable defaultValue="Clear me!" />`}
              />
            </section>

            <section id="with-icons">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Icons</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Add icons or content before/after the input using startContent and endContent.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input startContent={<SearchIcon />} placeholder="Search..." />
                    <Input startContent={<MailIcon />} placeholder="Email" type="email" />
                    <Input 
                      startContent={<span className="text-sm">$</span>} 
                      endContent={<span className="text-sm text-muted-foreground">USD</span>} 
                      placeholder="0.00" 
                      type="number" 
                    />
                  </div>
                }
                code={`<Input startContent={<SearchIcon />} placeholder="Search..." />
<Input startContent={<MailIcon />} placeholder="Email" />
<Input 
  startContent={<span>$</span>} 
  endContent={<span>USD</span>} 
  placeholder="0.00" 
/>`}
              />
            </section>

            <section id="validation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Validation States</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The Input component has a powerful validation system with two boolean props and their corresponding message props:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl border border-danger/30 bg-danger/5">
                  <p className="font-semibold text-danger mb-2">invalid + errorMessage</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Shows danger color styling</li>
                    <li>• Displays error icon (⚠️)</li>
                    <li>• Shows errorMessage below input</li>
                    <li>• Sets <code className="text-danger">aria-invalid="true"</code></li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-success/30 bg-success/5">
                  <p className="font-semibold text-success mb-2">valid + successMessage</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Shows success color styling</li>
                    <li>• Displays check icon (✓)</li>
                    <li>• Shows successMessage below input</li>
                    <li>• Indicates successful validation</li>
                  </ul>
                </div>
              </div>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input 
                      label="Invalid State" 
                      invalid 
                      errorMessage="This email is already registered" 
                      defaultValue="taken@example.com" 
                    />
                    <Input 
                      label="Valid State" 
                      valid 
                      successMessage="Username is available!" 
                      defaultValue="sparkui_user" 
                    />
                    <Input 
                      label="With Max Length" 
                      maxLength={20} 
                      defaultValue="sparkui" 
                      description="Max 20 characters" 
                    />
                  </div>
                }
                code={`<Input 
  label="Invalid State" 
  invalid 
  errorMessage="This email is already registered" 
  defaultValue="taken@example.com" 
/>

<Input 
  label="Valid State" 
  valid 
  successMessage="Username is available!" 
  defaultValue="sparkui_user" 
/>

<Input 
  label="With Max Length" 
  maxLength={20} 
  defaultValue="sparkui" 
  description="Max 20 characters" 
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
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input 
                      label="Default Invalid (danger)" 
                      invalid 
                      errorMessage="Uses danger color automatically" 
                      defaultValue="error@example.com" 
                    />
                    <Input 
                      label="Custom Invalid (warning flat)" 
                      variant="flat"
                      color="warning"
                      invalid 
                      errorMessage="Soft warning style" 
                      defaultValue="warning@example.com" 
                    />
                    <Input 
                      label="Custom Valid (success flat)" 
                      variant="flat"
                      color="success"
                      valid 
                      successMessage="Custom success style" 
                      defaultValue="success@example.com" 
                    />
                  </div>
                }
                code={`// Default behavior - uses danger color automatically
<Input invalid errorMessage="Error message" />

// Custom validation styling - use any color/variant combo
<Input 
  variant="flat"
  color="warning"
  invalid 
  errorMessage="Soft warning style" 
/>

<Input 
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
                code={`const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [result, setResult] = useState(null);

const checkEmail = async (value) => {
  if (!value || !isValidEmail(value)) {
    setResult({ valid: false, message: "Invalid email" });
    return;
  }
  
  setLoading(true);
  await new Promise(r => setTimeout(r, 1200)); // API call
  
  const taken = ["taken@example.com"].includes(value);
  setResult({
    valid: !taken,
    message: taken ? "Email already registered" : "Email available!",
  });
  setLoading(false);
};

// Color: checking = warning, error = danger, success = success
const getColor = () => {
  if (loading) return "warning";
  if (submitted && result) return result.valid ? "success" : "danger";
  return "primary";
};

<Input
  type="email"
  label="Email"
  value={email}
  onValueChange={(v) => {
    setEmail(v);
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
<Button type="submit" loading={loading}>Check Email</Button>`}
              />
            </section>

            <section id="form-validation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Form Validation</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Validation should happen on form submit, not on blur or change. This gives users a chance to complete their input before showing errors.
              </p>
              <CodePreview
                preview={<FormValidationDemo />}
                code={`const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [submitted, setSubmitted] = useState(false);
const [errors, setErrors] = useState({});

const validateEmail = (value) => {
  if (!value) return "Email is required";
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) return "Invalid email";
  if (value === "taken@example.com") return "Email already registered";
  return undefined;
};

const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  setErrors({ email: validateEmail(email), password: validatePassword(password) });
};

<form onSubmit={handleSubmit}>
  <Input
    type="email"
    label="Email"
    value={email}
    onValueChange={setEmail}
    invalid={submitted && !!errors.email}
    valid={submitted && !errors.email && email.length > 0}
    errorMessage={errors.email}
    successMessage="Email is available!"
  />
  <Button type="submit">Submit</Button>
</form>`}
              />
            </section>

            <section id="blur-validation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Blur Validation</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For real-time feedback without a submit button, validate on blur. When the user finishes typing and leaves the field, 
                show loading while checking async (e.g., if email is taken), then display the result.
              </p>
              <div className="p-3 rounded-lg border border-warning/30 bg-warning/5 mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-warning">Production tip:</span> For real APIs, consider debouncing the validation 
                  to avoid excessive requests. Use a library like <code className="text-primary">use-debounce</code> or implement a simple 
                  debounce with <code className="text-primary">setTimeout</code>.
                </p>
              </div>
              <CodePreview
                preview={<BlurValidationDemo />}
                code={`const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [touched, setTouched] = useState(false);
const [result, setResult] = useState(null);

const checkEmail = async (value) => {
  if (!value) {
    setResult({ valid: false, message: "Email is required" });
    return;
  }
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
    setResult({ valid: false, message: "Invalid email" });
    return;
  }

  setLoading(true);
  await new Promise(r => setTimeout(r, 1000)); // API call
  
  const taken = ["taken@example.com"].includes(value);
  setResult({
    valid: !taken,
    message: taken ? "Email already registered" : "Email is available!",
  });
  setLoading(false);
};

const handleBlur = () => {
  if (email) {
    setTouched(true);
    checkEmail(email);
  }
};

<Input
  type="email"
  label="Email"
  value={email}
  onValueChange={(v) => {
    setEmail(v);
    if (touched) { setResult(null); setTouched(false); }
  }}
  onBlur={handleBlur}
  loading={loading}
  invalid={touched && result?.valid === false}
  valid={touched && result?.valid === true}
  errorMessage={touched ? result?.message : undefined}
  successMessage={touched ? result?.message : undefined}
/>`}
              />
            </section>

            <section id="loading">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Loading State</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use <code className="text-primary">loading</code> for async validation like checking username availability. Trigger the check on button click.
              </p>
              <CodePreview
                preview={<AsyncValidationDemo />}
                code={`const [username, setUsername] = useState("");
const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [result, setResult] = useState(null);

const checkUsername = async (value) => {
  if (value.length < 3) {
    setResult({ valid: false, message: "At least 3 characters" });
    return;
  }
  
  setLoading(true);
  await new Promise(r => setTimeout(r, 1000)); // API call
  
  const taken = ["admin", "sparkui"].includes(value);
  setResult({
    valid: !taken,
    message: taken ? "Username taken" : "Available!",
  });
  setLoading(false);
};

const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  checkUsername(username);
};

<form onSubmit={handleSubmit}>
  <Input
    label="Username"
    value={username}
    onValueChange={setUsername}
    loading={loading}
    invalid={submitted && result?.valid === false}
    valid={submitted && result?.valid === true}
    errorMessage={submitted ? result?.message : undefined}
    successMessage={submitted ? result?.message : undefined}
  />
  <Button type="submit" isLoading={loading}>Check Availability</Button>
</form>`}
              />
            </section>

            <section id="borderless">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Borderless</h2>
              <p className="text-muted-foreground mb-6">Remove borders for a cleaner look.</p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input borderless placeholder="Borderless default" />
                    <Input borderless variant="filled" placeholder="Borderless filled" />
                  </div>
                }
                code={`<Input borderless placeholder="Borderless default" />
<Input borderless variant="filled" placeholder="Borderless filled" />`}
              />
            </section>

            <section id="custom-styling">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Custom Styling</h2>
              <p className="text-muted-foreground mb-6">Override border and focus ring with custom Tailwind classes.</p>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input border="border-pink-500" placeholder="Pink border" />
                    <Input 
                      border="border-purple-500" 
                      focusRing="focus-within:ring-[3px] focus-within:ring-purple-500/40" 
                      placeholder="Purple combo" 
                    />
                  </div>
                }
                code={`<Input border="border-pink-500" placeholder="Pink border" />
<Input 
  border="border-purple-500" 
  focusRing="focus-within:ring-[3px] focus-within:ring-purple-500/40" 
  placeholder="Purple combo" 
/>`}
              />
            </section>

            <section id="disabled">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Disabled & Read Only</h2>
              <CodePreview
                preview={
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Input label="Disabled" disabled defaultValue="Can't edit this" />
                    <Input label="Read Only" readOnly defaultValue="Read only value" />
                  </div>
                }
                code={`<Input label="Disabled" disabled defaultValue="Can't edit" />
<Input label="Read Only" readOnly defaultValue="Read only" />`}
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
                      ["size", '"sm" | "md" | "lg"', '"md"', "Input size"],
                      ["color", '"default" | "primary" | "secondary" | "success" | "warning" | "danger"', '"default"', "Color theme"],
                      ["label", "string", "-", "Label text above input"],
                      ["placeholder", "string", "-", "Placeholder text"],
                      ["description", "string", "-", "Helper text below input"],
                      ["type", '"text" | "password" | "email" | "number" | "tel" | "url" | "search"', '"text"', "Input type"],
                      ["value", "string", "-", "Controlled value"],
                      ["defaultValue", "string", '""', "Initial uncontrolled value"],
                      ["startContent", "ReactNode", "-", "Content before input"],
                      ["endContent", "ReactNode", "-", "Content after input"],
                      ["disabled", "boolean", "false", "Disable the input"],
                      ["readOnly", "boolean", "false", "Make input read-only"],
                      ["required", "boolean", "false", "Show required asterisk"],
                      ["invalid", "boolean", "false", "Show error state with icon"],
                      ["valid", "boolean", "false", "Show success state with icon"],
                      ["loading", "boolean", "false", "Show loading spinner"],
                      ["clearable", "boolean", "false", "Show clear button"],
                      ["borderless", "boolean", "false", "Remove all borders"],
                      ["border", "string", "-", "Custom border classes"],
                      ["focusRing", "string", "-", "Custom focus ring classes"],
                      ["errorMessage", "ReactNode", "-", "Error message (shown when invalid)"],
                      ["successMessage", "ReactNode", "-", "Success message (shown when valid)"],
                      ["maxLength", "number", "-", "Max character length with counter"],
                      ["onValueChange", "(value: string) => void", "-", "Value change callback"],
                      ["onClear", "() => void", "-", "Clear button callback"],
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
