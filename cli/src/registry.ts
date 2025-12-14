// Component registry - defines all available components and their dependencies

export interface ComponentDefinition {
  name: string;
  description: string;
  files: string[];
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[]; // Other SparkUI components this depends on
}

export const registry: Record<string, ComponentDefinition> = {
  button: {
    name: "button",
    description: "A versatile button component with multiple variants, colors, and sizes",
    files: ["components/ui/button.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
  accordion: {
    name: "accordion",
    description: "A vertically stacked set of interactive headings that reveal content",
    files: ["components/ui/accordion.tsx"],
    dependencies: ["clsx", "framer-motion"],
    devDependencies: [],
    registryDependencies: [],
  },
  chip: {
    name: "chip",
    description: "A compact element for displaying tags, labels, or status indicators",
    files: ["components/ui/chip.tsx"],
    dependencies: ["clsx", "framer-motion"],
    devDependencies: [],
    registryDependencies: [],
  },
  input: {
    name: "input",
    description: "A text input component with variants and validation states",
    files: ["components/ui/input.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
  kbd: {
    name: "kbd",
    description: "A keyboard key indicator component",
    files: ["components/ui/kbd.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
};

export const baseFiles = {
  globals: "styles/globals.css",
};

export const baseDependencies = ["clsx", "tailwind-merge"];
export const baseDevDependencies = ["tailwindcss", "postcss", "autoprefixer"];
