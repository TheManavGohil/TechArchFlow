#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// ──────────────────────────────────────────────
//  Colored terminal output helpers
// ──────────────────────────────────────────────
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  dim: "\x1b[2m",
};

function log(msg) {
  console.log(msg);
}
function success(msg) {
  log(`${c.green}✔${c.reset} ${msg}`);
}
function info(msg) {
  log(`${c.cyan}ℹ${c.reset} ${msg}`);
}
function warn(msg) {
  log(`${c.yellow}⚠${c.reset} ${msg}`);
}
function error(msg) {
  log(`${c.red}✖${c.reset} ${msg}`);
}

// ──────────────────────────────────────────────
//  Copy directory recursively
// ──────────────────────────────────────────────
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// ──────────────────────────────────────────────
//  Replace {{PROJECT_NAME}} in a file
// ──────────────────────────────────────────────
function replaceInFile(filePath, projectName) {
  const textExtensions = [
    ".go",
    ".mod",
    ".py",
    ".js",
    ".ts",
    ".svelte",
    ".json",
    ".yml",
    ".yaml",
    ".toml",
    ".md",
    ".html",
    ".css",
    ".env",
    ".example",
    ".sh",
    ".txt",
    "",
  ];

  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath).toLowerCase();

  // Only process text files
  if (
    !textExtensions.includes(ext) &&
    !["makefile", "dockerfile", ".env.example"].includes(basename)
  ) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, "utf-8");
    if (content.includes("{{PROJECT_NAME}}")) {
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
      fs.writeFileSync(filePath, content, "utf-8");
    }
  } catch {
    // Skip binary files that cannot be read as utf-8
  }
}

// ──────────────────────────────────────────────
//  Walk directory and replace placeholders
// ──────────────────────────────────────────────
function replaceInDir(dir, projectName) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      replaceInDir(fullPath, projectName);
    } else {
      replaceInFile(fullPath, projectName);
    }
  }
}

// ──────────────────────────────────────────────
//  Prompt the user for project name
// ──────────────────────────────────────────────
function askProjectName() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `${c.cyan}?${c.reset} ${c.bold}Project name:${c.reset} `,
      (answer) => {
        rl.close();
        resolve(answer.trim());
      }
    );
  });
}

// ──────────────────────────────────────────────
//  Make entrypoint.sh executable (chmod +x)
// ──────────────────────────────────────────────
function makeExecutable(filePath) {
  try {
    fs.chmodSync(filePath, 0o755);
  } catch {
    // Windows doesn't support chmod — Docker will handle permissions
  }
}

// ──────────────────────────────────────────────
//  Main
// ──────────────────────────────────────────────
async function main() {
  log("");
  log(
    `${c.bold}${c.magenta}  ╔══════════════════════════════════════════╗${c.reset}`
  );
  log(
    `${c.bold}${c.magenta}  ║       🚀 create-techarchflow-manav       ║${c.reset}`
  );
  log(
    `${c.bold}${c.magenta}  ║  Go · Django Admin · SvelteKit · Postgres ║${c.reset}`
  );
  log(
    `${c.bold}${c.magenta}  ╚══════════════════════════════════════════╝${c.reset}`
  );
  log("");

  // Get project name from argument or prompt
  let projectName = process.argv[2];

  if (!projectName) {
    projectName = await askProjectName();
  }

  if (!projectName) {
    error("Project name is required.");
    process.exit(1);
  }

  // Validate project name
  const validName = /^[a-zA-Z0-9_-]+$/;
  if (!validName.test(projectName)) {
    error(
      "Project name can only contain letters, numbers, hyphens, and underscores."
    );
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (fs.existsSync(targetDir)) {
    error(`Directory ${c.bold}${projectName}${c.reset} already exists.`);
    process.exit(1);
  }

  // Locate template directory (relative to this script)
  const templateDir = path.join(__dirname, "..", "template");

  if (!fs.existsSync(templateDir)) {
    error("Template directory not found. Package may be corrupted.");
    process.exit(1);
  }

  // Copy template
  info(`Creating project in ${c.bold}${targetDir}${c.reset}`);
  copyDirSync(templateDir, targetDir);
  success("Template files copied.");

  // Replace placeholders
  info("Replacing placeholders...");
  replaceInDir(targetDir, projectName);
  success("Placeholders replaced.");

  // Copy .env.example to .env
  const envExample = path.join(targetDir, ".env.example");
  const envFile = path.join(targetDir, ".env");
  if (fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, envFile);
    success(".env file created from .env.example");
  }

  // Make entrypoint.sh executable
  const entrypoint = path.join(targetDir, "db_admin", "entrypoint.sh");
  if (fs.existsSync(entrypoint)) {
    makeExecutable(entrypoint);
  }

  // Print success message
  log("");
  log(
    `${c.green}${c.bold}  ✅ Project "${projectName}" created successfully!${c.reset}`
  );
  log("");
  log(`${c.bold}  Next steps:${c.reset}`);
  log("");
  log(`  ${c.dim}1.${c.reset} ${c.cyan}cd ${projectName}${c.reset}`);
  log(
    `  ${c.dim}2.${c.reset} ${c.cyan}docker compose up --build${c.reset}       ${c.dim}# Start all services${c.reset}`
  );
  log("");
  log(`${c.bold}  🌐 Services will be available at:${c.reset}`);
  log(
    `     ${c.dim}Frontend:${c.reset}      ${c.cyan}http://localhost:5173${c.reset}`
  );
  log(
    `     ${c.dim}Go API:${c.reset}        ${c.cyan}http://localhost:3000/api/health${c.reset}`
  );
  log(
    `     ${c.dim}Django Admin:${c.reset}  ${c.cyan}http://localhost:8000/admin${c.reset}`
  );
  log("");
  log(
    `  ${c.dim}Django Admin credentials (from .env):${c.reset} admin / admin123`
  );
  log("");
  log(
    `${c.bold}  📖 See README.md inside the project for full documentation.${c.reset}`
  );
  log("");
}

main().catch((err) => {
  error(err.message);
  process.exit(1);
});
