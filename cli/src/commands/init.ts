import ora from "ora";
import prompts from "prompts";
import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import { exec } from "child_process";
import { promisify } from "util";
import {
  getProjectRoot,
  detectPackageManager,
  detectTypeScript,
  detectFramework,
  getInstallCommand,
  fileExists,
  log,
  REGISTRY_URL,
} from "../utils.js";

const execAsync = promisify(exec);

const SPARKUI_CSS = `@import "tailwindcss";
@import "./sparkui.css";

/* ✦ SparkUI Theme Variables */

/* Light Mode */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --primary: 270 100% 57%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 100% 50%;
  --secondary-foreground: 0 0% 100%;
  --muted: 240 5% 96%;
  --muted-foreground: 240 4% 46%;
  --accent: 240 5% 96%;
  --accent-foreground: 240 6% 10%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 0%;
  --border: 240 6% 90%;
  --input: 240 6% 90%;
  --ring: 270 100% 57%;
  --success: 142 71% 45%;
  --success-foreground: 0 0% 0%;
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 0%;
  --danger: 339 90% 51%;
  --danger-foreground: 0 0% 100%;
  --divider: 240 6% 90%;
  --radius: 1rem;
}

/* Dark Mode */
.dark {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --primary: 270 100% 57%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 100% 50%;
  --secondary-foreground: 0 0% 100%;
  --muted: 240 4% 16%;
  --muted-foreground: 240 5% 65%;
  --accent: 240 4% 16%;
  --accent-foreground: 0 0% 100%;
  --card: 240 6% 10%;
  --card-foreground: 0 0% 100%;
  --border: 240 4% 16%;
  --input: 240 4% 16%;
  --ring: 270 100% 57%;
  --success: 142 71% 45%;
  --success-foreground: 0 0% 0%;
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 0%;
  --danger: 339 90% 51%;
  --danger-foreground: 0 0% 100%;
  --divider: 240 4% 16%;
}

/* Tailwind 4 Theme Mapping */
@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-success: hsl(var(--success));
  --color-success-foreground: hsl(var(--success-foreground));
  --color-warning: hsl(var(--warning));
  --color-warning-foreground: hsl(var(--warning-foreground));
  --color-danger: hsl(var(--danger));
  --color-danger-foreground: hsl(var(--danger-foreground));
  --color-divider: hsl(var(--divider));
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

/* Base Styles */
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
`;

interface InitOptions {
  yes?: boolean;
}

export async function init(options: InitOptions) {
  console.log("");
  console.log(chalk.bold("✦ SparkUI Init"));
  console.log("");

  const root = await getProjectRoot();
  const pm = await detectPackageManager();
  const framework = await detectFramework();

  // Check if package.json exists
  const packageJsonPath = path.join(root, "package.json");
  if (!(await fileExists(packageJsonPath))) {
    log.error("No package.json found. Please run this in a React/Next.js/Vite project.");
    process.exit(1);
  }

  console.log(chalk.dim(`Detected: ${framework} • ${pm}`));
  console.log("");

  if (!options.yes) {
    const response = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Initialize SparkUI in this project?`,
      initial: true,
    });

    if (!response.proceed) {
      log.info("Cancelled.");
      return;
    }
  }

  // 1. Find and update CSS file
  const spinner = ora("Setting up SparkUI styles...").start();
  
  // Check common CSS file locations
  const possibleCssPaths = [
    path.join(root, "src", "index.css"),      // Vite default
    path.join(root, "src", "App.css"),        // CRA
    path.join(root, "app", "globals.css"),    // Next.js app router
    path.join(root, "styles", "globals.css"), // Next.js pages router
  ];

  let targetCssPath: string | null = null;
  for (const cssPath of possibleCssPaths) {
    if (await fileExists(cssPath)) {
      targetCssPath = cssPath;
      break;
    }
  }

  // Default to src/index.css for Vite or styles/globals.css for Next
  if (!targetCssPath) {
    targetCssPath = framework === "vite" 
      ? path.join(root, "src", "index.css")
      : path.join(root, "styles", "globals.css");
  }

  try {
    await fs.ensureDir(path.dirname(targetCssPath));
    await fs.writeFile(targetCssPath, SPARKUI_CSS, "utf-8");
    spinner.succeed(`Created ${path.relative(root, targetCssPath)}`);
  } catch (error) {
    spinner.fail("Failed to create CSS file");
    console.error(error);
  }

  // 2. Fetch and install sparkui.css utility classes
  const sparkuiSpinner = ora("Fetching SparkUI utilities...").start();
  try {
    const sparkuiUrl = `${REGISTRY_URL}/styles/sparkui.css`;
    const response = await fetch(sparkuiUrl);
    if (response.ok) {
      const sparkuiContent = await response.text();
      const sparkuiPath = framework === "vite" 
        ? path.join(root, "src", "sparkui.css")
        : path.join(root, "styles", "sparkui.css");
      await fs.ensureDir(path.dirname(sparkuiPath));
      await fs.writeFile(sparkuiPath, sparkuiContent, "utf-8");
      sparkuiSpinner.succeed(`Created ${path.relative(root, sparkuiPath)}`);
      
      // Add import to main CSS file
      const currentCss = await fs.readFile(targetCssPath, "utf-8");
      if (!currentCss.includes("sparkui.css")) {
        const importStatement = '@import "./sparkui.css";\n';
        await fs.writeFile(targetCssPath, importStatement + currentCss, "utf-8");
        log.success("Added sparkui.css import to main CSS");
      }
    } else {
      sparkuiSpinner.warn("Could not fetch sparkui.css utilities (optional)");
    }
  } catch {
    sparkuiSpinner.warn("Could not fetch sparkui.css utilities (optional)");
  }

  // 3. Create components/ui directory
  const uiDir = path.join(root, "components", "ui");
  await fs.ensureDir(uiDir);
  log.success("Created components/ui directory");

  // 4. Install dependencies
  const deps = ["clsx"];
  const installCmd = getInstallCommand(pm, deps);
  
  const installSpinner = ora(`Installing dependencies...`).start();
  try {
    await execAsync(installCmd, { cwd: root });
    installSpinner.succeed(`Installed ${deps.join(", ")}`);
  } catch (error) {
    installSpinner.fail("Failed to install dependencies");
    console.log(chalk.dim(`Run manually: ${installCmd}`));
  }

  // Done!
  console.log("");
  log.success(chalk.bold("SparkUI initialized!"));
  console.log("");
  console.log("Next steps:");
  console.log(chalk.dim("  1. Add components:"), chalk.cyan("npx sparkui add button"));
  console.log(chalk.dim("  2. Import in your app:"), chalk.cyan('import { Button } from "@/components/ui/button"'));
  console.log("");
}
