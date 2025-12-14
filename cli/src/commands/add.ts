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

const execAsync = promisify(exec);

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
}

export async function add(componentName: string, options: AddOptions) {
  console.log("");
  
  const root = await getProjectRoot();
  const pm = await detectPackageManager();
  const isTs = await detectTypeScript();
  const framework = await detectFramework();
  const isNextJs = framework === "next";

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
        
        // Convert to JSX if not TypeScript project
        if (!isTs) {
          content = convertToJsx(content);
          const jsxPath = targetPath.replace(".tsx", ".jsx").replace(".ts", ".js");
          await fs.ensureDir(path.dirname(jsxPath));
          await fs.writeFile(jsxPath, content, "utf-8");
          spinner.succeed(`Created ${path.relative(root, jsxPath)}`);
        } else {
          await fs.ensureDir(path.dirname(targetPath));
          await fs.writeFile(targetPath, content, "utf-8");
          spinner.succeed(`Created ${path.relative(root, targetPath)}`);
        }
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
  console.log("Import it:");
  console.log(chalk.cyan(`  import { ${capitalize(component.name)} } from "@/components/ui/${component.name}"`));
  console.log("");
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Convert TypeScript to JavaScript
function convertToJsx(tsxCode: string): string {
  return tsxCode
    .replace(/import\s+type\s+.*?from\s+['"].*?['"];?\n?/g, "")
    .replace(/,?\s*type\s+\w+/g, "")
    .replace(/interface\s+\w+\s*\{[\s\S]*?\}\n*/g, "")
    .replace(/type\s+\w+\s*=[\s\S]*?;\n*/g, "")
    .replace(/(useState|useRef|useCallback|useMemo|useContext)<[^>]+>/g, "$1")
    .replace(/\s+as\s+\w+(\[\])?/g, "")
    .replace(/\):\s*[A-Za-z\[\]<>,\s\|\.]+\s*(?==>|\{)/g, ") ")
    .replace(/(const|let|var)\s+(\w+):\s*[A-Za-z\[\]<>,\s\|\.]+\s*=/g, "$1 $2 =")
    .replace(/\(([^)]*)\)\s*=>/g, (match, params) => {
      const cleanParams = params.replace(/:\s*[A-Za-z\[\]<>,\s\|\.]+/g, "");
      return `(${cleanParams}) =>`;
    })
    .replace(/import\s*\{\s*\}\s*from\s*['"].*?['"];?\n?/g, "")
    .replace(/\{\s*,/g, "{")
    .replace(/,\s*\}/g, "}")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
