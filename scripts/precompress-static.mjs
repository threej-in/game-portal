import { createBrotliCompress, createGzip, constants as zlibConstants } from "node:zlib";
import { createReadStream, createWriteStream, existsSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join, extname } from "node:path";
import { pipeline } from "node:stream/promises";

const root = join(process.cwd(), "public", "games");
const compressibleExtensions = new Set([".wasm", ".pck", ".js", ".json", ".html"]);
const minimumBytes = 32 * 1024;
const maximumPckBytesToCompress = 16 * 1024 * 1024;

async function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (entry.name.endsWith(".br") || entry.name.endsWith(".gz")) {
      continue;
    }

    const extension = extname(entry.name);
    if (!compressibleExtensions.has(extension)) {
      continue;
    }

    const stats = statSync(fullPath);
    if (stats.size < minimumBytes) {
      continue;
    }

    if (extension === ".pck" && stats.size > maximumPckBytesToCompress) {
      cleanupCompressedArtifacts(fullPath);
      continue;
    }

    await compressFile(fullPath, stats.mtimeMs);
  }
}

async function compressFile(filePath, sourceModifiedTime) {
  const gzipPath = `${filePath}.gz`;
  const brotliPath = `${filePath}.br`;

  await maybeCompress(filePath, gzipPath, sourceModifiedTime, createGzip({ level: 9 }));
  await maybeCompress(
    filePath,
    brotliPath,
    sourceModifiedTime,
    createBrotliCompress({
      params: {
        [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
      },
    }),
  );
}

async function maybeCompress(sourcePath, compressedPath, sourceModifiedTime, compressor) {
  if (
    existsSync(compressedPath) &&
    statSync(compressedPath).mtimeMs >= sourceModifiedTime &&
    statSync(compressedPath).size > 0
  ) {
    return;
  }

  if (existsSync(compressedPath)) {
    unlinkSync(compressedPath);
  }

  await pipeline(createReadStream(sourcePath), compressor, createWriteStream(compressedPath));

  const sourceSize = statSync(sourcePath).size;
  const compressedSize = statSync(compressedPath).size;
  if (compressedSize <= 0 || compressedSize >= sourceSize * 0.98) {
    unlinkSync(compressedPath);
  }
}

function cleanupCompressedArtifacts(sourcePath) {
  for (const suffix of [".gz", ".br"]) {
    const compressedPath = `${sourcePath}${suffix}`;
    if (existsSync(compressedPath)) {
      unlinkSync(compressedPath);
    }
  }
}

if (existsSync(root)) {
  await walk(root);
  console.log("[precompress-static] Finished generating .gz/.br assets for public/games");
} else {
  console.log("[precompress-static] public/games not found. Skipping.");
}
