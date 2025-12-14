import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

// Base URL where component files are hosted (GitHub raw)
export const REGISTRY_URL = "https://raw.githubusercontent.com/chandiuke/sparkUI/main";

export async function getProjectRoot(): Promise<string> {
  return process.cwd();
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function detectPackageManager(): Promise<"npm" | "yarn" | "pnpm" | "bun"> {
  const root = await getProjectRoot();
  
  if (await fileExists(path.join(root, "bun.lockb"))) return "bun";
  if (await fileExists(path.join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (await fileExists(path.join(root, "yarn.lock"))) return "yarn";
  return "npm";
}

export async function detectTypeScript(): Promise<boolean> {
  const root = await getProjectRoot();
  return fileExists(path.join(root, "tsconfig.json"));
}

export async function detectFramework(): Promise<"next" | "vite" | "cra" | "unknown"> {
  const root = await getProjectRoot();
  const packageJsonPath = path.join(root, "package.json");
  
  try {
    const packageJson = await fs.readJson(packageJsonPath);
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    if (deps["next"]) return "next";
    if (deps["vite"]) return "vite";
    if (deps["react-scripts"]) return "cra";
    return "unknown";
  } catch {
    return "unknown";
  }
}

export function removeUseClient(content: string): string {
  // Remove "use client" directive for non-Next.js projects
  return content.replace(/^["']use client["'];?\s*\n?/gm, "");
}

export function getInstallCommand(pm: string, deps: string[], isDev = false): string {
  const devFlag = isDev ? (pm === "npm" ? "--save-dev" : "-D") : "";
  
  switch (pm) {
    case "yarn":
      return `yarn add ${devFlag} ${deps.join(" ")}`;
    case "pnpm":
      return `pnpm add ${devFlag} ${deps.join(" ")}`;
    case "bun":
      return `bun add ${devFlag} ${deps.join(" ")}`;
    default:
      return `npm install ${devFlag} ${deps.join(" ")}`;
  }
}

export async function fetchComponentFile(componentPath: string): Promise<string> {
  const url = `${REGISTRY_URL}/${componentPath}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch component: ${error}`);
  }
}

export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, "utf-8");
}

export const log = {
  info: (msg: string) => console.log(chalk.blue("ℹ"), msg),
  success: (msg: string) => console.log(chalk.green("✓"), msg),
  warn: (msg: string) => console.log(chalk.yellow("⚠"), msg),
  error: (msg: string) => console.log(chalk.red("✗"), msg),
};
