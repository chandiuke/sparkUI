import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { HeroTextReveal } from "@/components/ui/hero-text-reveal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  DropdownDivider,
} from "@/components/ui/dropdown";

// Icons
const SparkIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill="currentColor" className="text-primary"/>
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Theme Toggle
function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

// Navbar
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <SparkIcon />
            <span className="text-xl font-bold">SparkUI</span>
            <Badge color="primary" variant="flat" size="sm">Beta</Badge>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="ghost" size="sm" className="gap-1">
                  Components <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Button</DropdownItem>
                <DropdownItem>Input</DropdownItem>
                <DropdownItem>Select</DropdownItem>
                <DropdownItem>Dropdown</DropdownItem>
                <DropdownDivider />
                <DropdownItem>View All →</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button variant="ghost" size="sm">Documentation</Button>
            <Button variant="ghost" size="sm">Examples</Button>
            <Button variant="ghost" size="sm">Pricing</Button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Button>
            <Button color="primary" size="sm" className="hidden sm:flex">
              Get Started
            </Button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            <Button variant="ghost" fullWidth className="justify-start">Components</Button>
            <Button variant="ghost" fullWidth className="justify-start">Documentation</Button>
            <Button variant="ghost" fullWidth className="justify-start">Examples</Button>
            <Button variant="ghost" fullWidth className="justify-start">Pricing</Button>
            <div className="pt-2">
              <Button color="primary" fullWidth>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute inset-0 bg-dots opacity-30" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement badge */}
        <div className="animate-fade-down mb-8">
          <Chip
            variant="bordered"
            color="primary"
            startContent={<span className="animate-pulse-soft">✦</span>}
            className="hover-lift cursor-pointer"
          >
            New: Hero Text Reveal component is here!
          </Chip>
        </div>

        {/* Main heading with HeroTextReveal */}
        <div className="mb-6">
          <HeroTextReveal
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            lines={[
              { text: "Build Beautiful UIs" },
              { text: "With SparkUI", className: "text-gradient" },
            ]}
            delay={0.5}
            sparkColor="hsl(var(--primary))"
            sparkGlow="hsl(var(--primary) / 0.6)"
          />
        </div>

        {/* Subtitle */}
        <p className="animate-fade-up animate-delay-300 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A modern React component library with beautiful defaults, 
          full customization, and seamless dark mode. Copy, paste, and ship.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up animate-delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button color="primary" size="lg" className="hover-lift shadow-glow-primary gap-2">
            Get Started <ArrowRightIcon />
          </Button>
          <Button variant="bordered" size="lg" className="hover-lift gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </Button>
        </div>

        {/* Email signup */}
        <div className="animate-fade-up animate-delay-700 max-w-md mx-auto mb-12">
          <div className="flex gap-2">
            <Input
              placeholder="Enter your email"
              value={email}
              onValueChange={setEmail}
              className="flex-1"
            />
            <Button color="primary">Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Get notified when we launch. No spam, ever.
          </p>
        </div>

        {/* Social proof */}
        <div className="animate-fade-up animate-delay-1000 flex flex-col items-center gap-4">
          <AvatarGroup max={5}>
            <Avatar src="https://i.pravatar.cc/150?img=1" name="User 1" />
            <Avatar src="https://i.pravatar.cc/150?img=2" name="User 2" />
            <Avatar src="https://i.pravatar.cc/150?img=3" name="User 3" />
            <Avatar src="https://i.pravatar.cc/150?img=4" name="User 4" />
            <Avatar src="https://i.pravatar.cc/150?img=5" name="User 5" />
            <Avatar src="https://i.pravatar.cc/150?img=6" name="User 6" />
            <Avatar src="https://i.pravatar.cc/150?img=7" name="User 7" />
          </AvatarGroup>
          <p className="text-sm text-muted-foreground">
            Trusted by <span className="text-foreground font-semibold">2,000+</span> developers
          </p>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: "🎨",
      title: "Beautiful by Default",
      description: "Carefully crafted components with stunning animations and modern design patterns.",
    },
    {
      icon: "🌙",
      title: "Dark Mode Ready",
      description: "Seamless dark mode support with CSS variables. Switch themes instantly.",
    },
    {
      icon: "⚡",
      title: "Blazing Fast",
      description: "Zero runtime overhead. Components are optimized for performance.",
    },
    {
      icon: "🔧",
      title: "Fully Customizable",
      description: "Every component is customizable with variants, colors, and sizes.",
    },
    {
      icon: "📦",
      title: "Copy & Paste",
      description: "No complex setup. Just copy the component code into your project.",
    },
    {
      icon: "♿",
      title: "Accessible",
      description: "Built with accessibility in mind. ARIA labels and keyboard navigation.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge color="secondary" variant="flat" className="mb-4">Features</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to build <span className="text-gradient">modern UIs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SparkUI provides all the building blocks you need to create beautiful, 
            accessible, and performant user interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border bg-card hover-lift interactive"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Components Preview Section
function ComponentsPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge color="primary" variant="flat" className="mb-4">Components</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            14+ Components and Growing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From buttons to complex dropdowns, we've got you covered.
          </p>
        </div>

        {/* Component showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buttons showcase */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="success">Success</Button>
              <Button variant="bordered" color="primary">Bordered</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="flat" color="danger">Flat</Button>
            </div>
          </div>

          {/* Badges showcase */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">Badges & Chips</h3>
            <div className="flex flex-wrap gap-3">
              <Badge color="primary">Primary</Badge>
              <Badge color="success" variant="flat">Success</Badge>
              <Badge color="warning" variant="bordered">Warning</Badge>
              <Chip color="primary" variant="dot">Active</Chip>
              <Chip color="secondary" closable>Closable</Chip>
            </div>
          </div>

          {/* Avatars showcase */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">Avatars</h3>
            <div className="flex items-center gap-4">
              <Avatar src="https://i.pravatar.cc/150?img=10" size="sm" />
              <Avatar src="https://i.pravatar.cc/150?img=11" size="md" />
              <Avatar src="https://i.pravatar.cc/150?img=12" size="lg" bordered color="primary" />
              <Avatar name="John Doe" size="lg" />
              <AvatarGroup max={3}>
                <Avatar src="https://i.pravatar.cc/150?img=13" />
                <Avatar src="https://i.pravatar.cc/150?img=14" />
                <Avatar src="https://i.pravatar.cc/150?img=15" />
                <Avatar src="https://i.pravatar.cc/150?img=16" />
              </AvatarGroup>
            </div>
          </div>

          {/* Input showcase */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">Inputs</h3>
            <div className="space-y-3">
              <Input placeholder="Default input" />
              <Input placeholder="With label" label="Email" />
              <Input placeholder="Search..." startContent={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              } />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for side projects",
      features: ["All components", "Dark mode", "Community support", "MIT License"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      description: "For professional developers",
      features: ["Everything in Free", "Premium templates", "Priority support", "Figma files", "Early access"],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Team",
      price: "$149",
      description: "For teams and agencies",
      features: ["Everything in Pro", "Team license", "Custom components", "Dedicated support", "SLA"],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge color="warning" variant="flat" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start for free, upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${
                plan.popular 
                  ? "border-primary bg-card shadow-glow-primary" 
                  : "border-border bg-card"
              } hover-lift`}
            >
              {plan.popular && (
                <Badge color="primary" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "$0" && <span className="text-muted-foreground">/one-time</span>}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                color={plan.popular ? "primary" : "default"}
                variant={plan.popular ? "solid" : "bordered"}
                fullWidth
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SparkIcon />
            <span className="text-xl font-bold">SparkUI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SparkUI. Built with ❤️ for developers.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  // Set dark mode by default
  useState(() => {
    document.documentElement.classList.add("dark");
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ComponentsPreview />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
