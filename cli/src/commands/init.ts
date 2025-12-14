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
  getInstallCommand,
  fileExists,
  log,
} from "../utils.js";

const execAsync = promisify(exec);

const GLOBALS_CSS = `@import "tailwindcss";

/* ✦ SparkUI Light Mode */
:root {
  --background: 250 25% 98%;
  --foreground: 250 15% 12%;
  --primary: 265 90% 52%;
  --primary-foreground: 0 0% 100%;
  --secondary: 215 95% 55%;
  --secondary-foreground: 0 0% 100%;
  --muted: 250 20% 92%;
  --muted-foreground: 250 10% 42%;
  --accent: 265 40% 94%;
  --accent-foreground: 265 60% 35%;
  --success: 152 70% 38%;
  --success-foreground: 0 0% 100%;
  --warning: 42 95% 50%;
  --warning-foreground: 42 95% 15%;
  --danger: 350 85% 55%;
  --danger-foreground: 0 0% 100%;
  --card: 0 0% 100%;
  --card-foreground: 250 15% 12%;
  --border: 250 15% 85%;
  --input: 250 15% 85%;
  --ring: 265 90% 52%;
  --radius: 0.5rem;
}

/* ✦ SparkUI Dark Mode */
.dark {
  --background: 240 15% 4%;
  --foreground: 0 0% 95%;
  --primary: 265 95% 62%;
  --primary-foreground: 0 0% 100%;
  --secondary: 215 100% 60%;
  --secondary-foreground: 0 0% 100%;
  --muted: 240 10% 14%;
  --muted-foreground: 240 5% 60%;
  --accent: 265 30% 18%;
  --accent-foreground: 265 80% 80%;
  --success: 152 75% 45%;
  --success-foreground: 152 75% 10%;
  --warning: 42 95% 55%;
  --warning-foreground: 42 95% 10%;
  --danger: 350 90% 60%;
  --danger-foreground: 0 0% 100%;
  --card: 240 12% 8%;
  --card-foreground: 0 0% 95%;
  --border: 240 8% 18%;
  --input: 240 8% 18%;
  --ring: 265 95% 62%;
}

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
  const isTs = await detectTypeScript();

  // Check if package.json exists
  const packageJsonPath = path.join(root, "package.json");
  if (!(await fileExists(packageJsonPath))) {
    log.error("No package.json found. Please run this in a React/Next.js project.");
    process.exit(1);
  }

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

  // 1. Create globals.css
  const spinner = ora("Creating CSS variables...").start();
  
  const cssPath = path.join(root, "styles", "globals.css");
  const appCssPath = path.join(root, "app", "globals.css");
  
  // Check which path exists or use styles/globals.css
  let targetCssPath = cssPath;
  if (await fileExists(appCssPath)) {
    targetCssPath = appCssPath;
  }

  try {
    await fs.ensureDir(path.dirname(targetCssPath));
    await fs.writeFile(targetCssPath, GLOBALS_CSS, "utf-8");
    spinner.succeed(`Created ${path.relative(root, targetCssPath)}`);
  } catch (error) {
    spinner.fail("Failed to create CSS file");
    console.error(error);
  }

  // 2. Create components/ui directory
  const uiDir = path.join(root, "components", "ui");
  await fs.ensureDir(uiDir);
  log.success("Created components/ui directory");

  // 3. Install dependencies
  const deps = ["clsx", "framer-motion"];
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
