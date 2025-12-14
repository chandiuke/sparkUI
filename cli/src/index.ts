#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

const program = new Command();

program
  .name("sparkui")
  .description("CLI for adding SparkUI components to your project")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize SparkUI in your project")
  .option("-y, --yes", "Skip confirmation prompt")
  .action(init);

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "Component name to add")
  .option("-y, --yes", "Skip confirmation prompt")
  .option("-o, --overwrite", "Overwrite existing files")
  .action(add);

program.parse();
