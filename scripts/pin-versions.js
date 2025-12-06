#!/usr/bin/env node

/**
 * Sync dependency versions in package.json with the versions installed in node_modules.
 * Affects dependencies, devDependencies and peerDependencies.
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = process.cwd();
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, "package.json");
const NODE_MODULES_DIR = path.join(ROOT_DIR, "node_modules");

function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to read or parse ${filePath}`);
    console.error(err.message);
    process.exit(1);
  }
}

function ensurePackageJson() {
  if (!fs.existsSync(PACKAGE_JSON_PATH)) {
    console.error("package.json not found in the current directory");
    process.exit(1);
  }
}

function pinSectionDependencies(pkgJson, sectionKey) {
  const section = pkgJson[sectionKey];
  if (!section || typeof section !== "object") return;

  for (const depName of Object.keys(section)) {
    const depPackageJsonPath = path.join(NODE_MODULES_DIR, depName, "package.json");

    if (!fs.existsSync(depPackageJsonPath)) {
      console.warn(`[skip] ${sectionKey}.${depName} not found in node_modules`);
      continue;
    }

    const installedMeta = readJson(depPackageJsonPath);
    const installedVersion = installedMeta.version;

    if (!installedVersion) {
      console.warn(`[skip] ${sectionKey}.${depName} has no version field in its package.json`);
      continue;
    }

    const previous = section[depName];
    section[depName] = installedVersion;

    console.log(
      `[pin] ${sectionKey}.${depName}: ${previous} -> ${installedVersion}`
    );
  }
}

function writePackageJson(pkgJson) {
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkgJson, null, 2) + "\n", "utf8");
}

function main() {
  ensurePackageJson();

  const pkgJson = readJson(PACKAGE_JSON_PATH);

  pinSectionDependencies(pkgJson, "dependencies");
  pinSectionDependencies(pkgJson, "devDependencies");
  pinSectionDependencies(pkgJson, "peerDependencies");

  writePackageJson(pkgJson);

  console.log();
  console.log("package.json updated with versions from node_modules");
}

main();