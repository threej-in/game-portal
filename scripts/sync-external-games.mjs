import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const manifestPath = path.join(root, "external-games.manifest.json");
const enabled = process.env.SYNC_EXTERNAL_GAMES === "1";
const conditional = process.argv.includes("--if-enabled");

if (conditional && !enabled) {
  console.log("[sync-external-games] SYNC_EXTERNAL_GAMES is not enabled. Skipping.");
  process.exit(0);
}

if (!fs.existsSync(manifestPath)) {
  console.log("[sync-external-games] No manifest found. Skipping.");
  process.exit(0);
}

const manifest = JSON.parse(await fsp.readFile(manifestPath, "utf8"));
const tempRoot = await fsp.mkdtemp(path.join(os.tmpdir(), "game-portal-sync-"));

async function copyDirectory(source, target) {
  await fsp.mkdir(target, { recursive: true });
  await fsp.cp(source, target, { recursive: true, force: true });
}

async function syncEntry(entry) {
  const clonePath = path.join(tempRoot, entry.slug);
  const targetPath = path.join(root, entry.targetPath);
  const sourcePath = path.join(clonePath, entry.sourcePath || ".");
  const overlayPath = entry.overlayPath ? path.join(root, entry.overlayPath) : null;

  console.log(`[sync-external-games] Cloning ${entry.slug} from ${entry.repoUrl}`);
  execFileSync("git", ["clone", "--depth", "1", entry.repoUrl, clonePath], {
    stdio: "inherit",
    cwd: root,
  });

  if (entry.ref) {
    execFileSync("git", ["-C", clonePath, "checkout", entry.ref], {
      stdio: "inherit",
      cwd: root,
    });
  }

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source path not found for ${entry.slug}: ${sourcePath}`);
  }

  await fsp.rm(targetPath, { recursive: true, force: true });
  await copyDirectory(sourcePath, targetPath);

  if (overlayPath && fs.existsSync(overlayPath)) {
    console.log(`[sync-external-games] Applying overrides for ${entry.slug}`);
    await copyDirectory(overlayPath, targetPath);
  }
}

try {
  for (const entry of manifest) {
    await syncEntry(entry);
  }
  console.log("[sync-external-games] Completed.");
} finally {
  await fsp.rm(tempRoot, { recursive: true, force: true });
}
