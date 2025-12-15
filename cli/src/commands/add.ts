import ora from "ora";
import prompts from "prompts";
import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import { exec } from "child_process";
import { promisify } from "util";
import { registry, ComponentDefinition } from "../registry.js";
import {
  getProjectRoot,
  detectPackageManager,
  detectTypeScript,
  detectFramework,
  removeUseClient,
  getInstallCommand,
  fileExists,
  log,
  REGISTRY_URL,
} from "../utils.js";
import { init } from "./init.js";

const execAsync = promisify(exec);

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
}

// Check if SparkUI styles are initialized
async function isSparkUIInitialized(root: string): Promise<boolean> {
  const possibleCssPaths = [
    path.join(root, "src", "index.css"),
    path.join(root, "src", "App.css"),
    path.join(root, "app", "globals.css"),
    path.join(root, "styles", "globals.css"),
  ];

  for (const cssPath of possibleCssPaths) {
    if (await fileExists(cssPath)) {
      try {
        const content = await fs.readFile(cssPath, "utf-8");
        // Check for SparkUI theme variables
        if (content.includes("--primary:") && content.includes("@theme inline")) {
          return true;
        }
      } catch {
        continue;
      }
    }
  }
  return false;
}

export async function add(componentName: string, options: AddOptions) {
  console.log("");
  
  const root = await getProjectRoot();
  const pm = await detectPackageManager();
  const isTs = await detectTypeScript();
  const framework = await detectFramework();
  const isNextJs = framework === "next";

  // Check if SparkUI is initialized
  const initialized = await isSparkUIInitialized(root);
  if (!initialized) {
    log.warn("SparkUI styles not found.");
    
    const response = await prompts({
      type: "confirm",
      name: "runInit",
      message: "Run sparkui init first?",
      initial: true,
    });

    if (response.runInit) {
      await init({ yes: options.yes });
      console.log("");
    } else {
      log.info("Skipping init. Components may not display correctly without SparkUI styles.");
      console.log("");
    }
  }

  // Check if component exists in registry
  const component = registry[componentName.toLowerCase()];
  if (!component) {
    log.error(`Component "${componentName}" not found.`);
    console.log("");
    console.log("Available components:");
    Object.keys(registry).forEach((name) => {
      console.log(chalk.dim("  -"), name);
    });
    process.exit(1);
  }

  console.log(chalk.bold(`✦ Adding ${component.name}`));
  console.log(chalk.dim(component.description));
  console.log("");
  console.log(chalk.dim(`Detected: ${framework} • ${isTs ? "TypeScript" : "JavaScript"} • ${pm}`));
  console.log("");

  // Check for existing files
  const existingFiles: string[] = [];
  for (const file of component.files) {
    const filePath = path.join(root, file);
    if (await fileExists(filePath)) {
      existingFiles.push(file);
    }
  }

  if (existingFiles.length > 0 && !options.overwrite) {
    if (!options.yes) {
      const response = await prompts({
        type: "confirm",
        name: "overwrite",
        message: `${existingFiles.join(", ")} already exists. Overwrite?`,
        initial: false,
      });

      if (!response.overwrite) {
        log.info("Cancelled.");
        return;
      }
    }
  }

  // Fetch and write component files
  const spinner = ora("Fetching component...").start();

  try {
    for (const file of component.files) {
      const url = `${REGISTRY_URL}/${file}`;
      
      // For now, we'll use local files since we're in development
      // In production, this would fetch from GitHub
      const sourcePath = path.join(root, file);
      const targetPath = path.join(root, file);

      // Fetch from remote registry
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        let content = await response.text();
        
        // Remove "use client" for non-Next.js projects (Vite, CRA, etc.)
        if (!isNextJs) {
          content = removeUseClient(content);
        }
        
        // Always keep as .tsx - Vite and modern bundlers handle it fine
        await fs.ensureDir(path.dirname(targetPath));
        await fs.writeFile(targetPath, content, "utf-8");
        spinner.succeed(`Created ${path.relative(root, targetPath)}`);
      } catch (fetchError) {
        spinner.fail(`Failed to fetch ${file}`);
        log.error("Make sure you have internet connection or the component exists in the registry.");
        return;
      }
    }
  } catch (error) {
    spinner.fail("Failed to add component");
    console.error(error);
    return;
  }

  // Install dependencies
  const allDeps = [...component.dependencies];
  if (allDeps.length > 0) {
    const installSpinner = ora("Installing dependencies...").start();
    const installCmd = getInstallCommand(pm, allDeps);
    
    try {
      await execAsync(installCmd, { cwd: root });
      installSpinner.succeed(`Installed ${allDeps.join(", ")}`);
    } catch (error) {
      installSpinner.fail("Failed to install dependencies");
      console.log(chalk.dim(`Run manually: ${installCmd}`));
    }
  }

  // Done!
  console.log("");
  log.success(chalk.bold(`${component.name} added!`));
  console.log("");
  
  // Show tsconfig tip for JS projects
  if (!isTs) {
    log.info("Components use TypeScript. Add a tsconfig.json to enable TSX support:");
    console.log(chalk.dim(`  npx tsc --init`));
    console.log("");
  }
  
  console.log("Import it:");
  console.log(chalk.cyan(`  import { ${capitalize(component.name)} } from "@/components/ui/${component.name}"`));
  console.log("");
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


