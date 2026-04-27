const fs = require("fs");
const http = require("http");
const path = require("path");
const next = require("next");

const dev = false;
const hostname = process.env.HOST || "0.0.0.0";
const port = Number.parseInt(process.env.PORT || "3000", 10);
const publicRoot = path.join(__dirname, "public");

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".manifest": "application/manifest+json; charset=utf-8",
  ".pck": "application/octet-stream",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".wasm": "application/wasm",
};

function setStaticHeaders(res, extension) {
  const contentType = MIME_TYPES[extension] || "application/octet-stream";
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
}

function isUsableCompressedFile(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).size > 0;
}

function tryServeCompressedAsset(req, res) {
  if (!req.url || req.method !== "GET") {
    return false;
  }

  const url = new URL(req.url, `http://${hostname}:${port}`);
  const pathname = decodeURIComponent(url.pathname);

  if (!pathname.startsWith("/games/")) {
    return false;
  }

  const absolutePath = path.normalize(path.join(publicRoot, pathname.replace(/^\//, "")));
  if (!absolutePath.startsWith(publicRoot) || !fs.existsSync(absolutePath) || fs.statSync(absolutePath).isDirectory()) {
    return false;
  }

  const extension = path.extname(absolutePath);
  const acceptEncoding = req.headers["accept-encoding"] || "";

  if (acceptEncoding.includes("br") && isUsableCompressedFile(`${absolutePath}.br`)) {
    setStaticHeaders(res, extension);
    res.setHeader("Content-Encoding", "br");
    fs.createReadStream(`${absolutePath}.br`).pipe(res);
    return true;
  }

  if (acceptEncoding.includes("gzip") && isUsableCompressedFile(`${absolutePath}.gz`)) {
    setStaticHeaders(res, extension);
    res.setHeader("Content-Encoding", "gzip");
    fs.createReadStream(`${absolutePath}.gz`).pipe(res);
    return true;
  }

  return false;
}

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => {
        if (tryServeCompressedAsset(req, res)) {
          return;
        }

        handle(req, res);
      })
      .listen(port, hostname, () => {
        console.log(`Game portal ready on http://${hostname}:${port}`);
      });
  })
  .catch((error) => {
    console.error("Failed to start Next.js app:", error);
    process.exit(1);
  });
