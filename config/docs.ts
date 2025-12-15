export interface DocItem {
  title: string;
  href: string;
}

export interface DocCategory {
  title: string;
  items: DocItem[];
}

export const docsConfig: DocCategory[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Accessibility", href: "/docs/accessibility" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Chip", href: "/docs/components/chip" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Dropdown", href: "/docs/components/dropdown" },
      { title: "File Upload", href: "/docs/components/file-upload" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Modal", href: "/docs/components/modal" },
      { title: "Navbar", href: "/docs/components/navbar" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Textarea", href: "/docs/components/textarea" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { title: "Utility Classes", href: "/docs/utilities" },
    ],
  },
  {
    title: "Animations",
    items: [
      { title: "Hero Text Reveal", href: "/docs/animations/hero-text-reveal" },
      { title: "Page Transitions", href: "/docs/animations/page-transitions" },
      { title: "Hover Effects", href: "/docs/animations/hover-effects" },
    ],
  },
];
