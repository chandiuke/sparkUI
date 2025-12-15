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
  accordion: {
    name: "accordion",
    description: "A vertically stacked set of interactive headings that reveal content",
    files: ["components/ui/accordion.tsx"],
    dependencies: ["clsx", "framer-motion"],
    devDependencies: [],
    registryDependencies: [],
  },
  avatar: {
    name: "avatar",
    description: "An image element with fallback for representing users",
    files: ["components/ui/avatar.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
  badge: {
    name: "badge",
    description: "A small status indicator component with multiple variants",
    files: ["components/ui/badge.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
  button: {
    name: "button",
    description: "A versatile button component with multiple variants, colors, and sizes",
    files: ["components/ui/button.tsx"],
    dependencies: ["clsx"],
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
  "date-picker": {
    name: "date-picker",
    description: "A date selection component with calendar popup",
    files: ["components/ui/date-picker.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
  "file-upload": {
    name: "file-upload",
    description: "A drag and drop file upload component",
    files: ["components/ui/file-upload.tsx"],
    dependencies: ["clsx"],
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
  textarea: {
    name: "textarea",
    description: "A multi-line text input with auto-resize, validation, and character count",
    files: ["components/ui/textarea.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
  select: {
    name: "select",
    description: "A customizable dropdown select with search, groups, icons, and multi-select",
    files: ["components/ui/select.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
  dropdown: {
    name: "dropdown",
    description: "A versatile dropdown menu for navbars, context menus, and actions",
    files: ["components/ui/dropdown.tsx"],
    dependencies: ["clsx"],
    devDependencies: [],
    registryDependencies: [],
  },
};

export const baseFiles = {
  globals: "styles/globals.css",
  sparkui: "styles/sparkui.css",
};

export const baseDependencies = ["clsx", "tailwind-merge"];
export const baseDevDependencies = ["tailwindcss", "postcss", "autoprefixer"];
