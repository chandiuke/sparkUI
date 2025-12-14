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
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Chip", href: "/docs/components/chip" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Navbar", href: "/docs/components/navbar" },
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
