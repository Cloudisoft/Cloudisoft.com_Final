// Production server for www.cloudisoft.com (Railway). Zero dependencies.
// Serves the prerendered build in ./dist with security headers, clean URLs,
// compression, long-lived caching for hashed assets, byte ranges for media,
// and a permanent redirect from the bare domain to www.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");
const PORT = Number(process.env.PORT) || 8080;
const CANONICAL_HOST = process.env.CANONICAL_HOST || "www.cloudisoft.com";
// Hosts that should 301 to the canonical host (comma separated).
const REDIRECT_HOSTS = (process.env.REDIRECT_HOSTS || "cloudisoft.com").split(",").map((h) => h.trim()).filter(Boolean);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};
const COMPRESSIBLE = new Set([".html", ".js", ".mjs", ".css", ".json", ".webmanifest", ".xml", ".txt", ".svg"]);

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "connect-src 'self' https://formspree.io",
  "form-action 'self' https://formspree.io",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = {
  "Content-Security-Policy": CSP,
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

// Small in-memory cache of compressed text files (the whole site is a few MB).
const gzCache = new Map();

function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const abs = path.join(ROOT, clean);
  if (!abs.startsWith(ROOT)) return null; // path traversal guard
  const candidates = [abs, `${abs}.html`, path.join(abs, "index.html")];
  for (const c of candidates) {
    try {
      const st = fs.statSync(c);
      if (st.isFile()) return { file: c, stat: st };
    } catch {}
  }
  return null;
}

function cacheControl(urlPath, ext) {
  if (urlPath.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  if (ext === ".html") return "public, max-age=0, must-revalidate";
  return "public, max-age=86400";
}

function send(req, res, status, found, urlPath) {
  const ext = path.extname(found.file).toLowerCase();
  const type = TYPES[ext] || "application/octet-stream";
  const headers = {
    ...SECURITY_HEADERS,
    "Content-Type": type,
    "Cache-Control": status === 200 ? cacheControl(urlPath, ext) : "no-store",
    "Last-Modified": found.stat.mtime.toUTCString(),
    Vary: "Accept-Encoding",
  };

  if (status === 200 && req.headers["if-modified-since"] && new Date(req.headers["if-modified-since"]) >= new Date(found.stat.mtime.toUTCString())) {
    res.writeHead(304, headers);
    return res.end();
  }

  // Compressed text
  if (COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] || "")) {
    let buf = gzCache.get(found.file);
    if (!buf || buf.mtime !== found.stat.mtimeMs) {
      buf = { data: zlib.gzipSync(fs.readFileSync(found.file), { level: 9 }), mtime: found.stat.mtimeMs };
      gzCache.set(found.file, buf);
    }
    res.writeHead(status, { ...headers, "Content-Encoding": "gzip", "Content-Length": buf.data.length });
    return res.end(req.method === "HEAD" ? undefined : buf.data);
  }

  // Byte ranges (audio/video seeking, required by Safari)
  const size = found.stat.size;
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
  if (status === 200 && range) {
    let start = range[1] === "" ? size - Number(range[2]) : Number(range[1]);
    let end = range[1] !== "" && range[2] !== "" ? Number(range[2]) : size - 1;
    if (Number.isNaN(start) || start < 0 || start >= size || end < start) {
      res.writeHead(416, { ...headers, "Content-Range": `bytes */${size}` });
      return res.end();
    }
    end = Math.min(end, size - 1);
    res.writeHead(206, { ...headers, "Accept-Ranges": "bytes", "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    if (req.method === "HEAD") return res.end();
    return fs.createReadStream(found.file, { start, end }).pipe(res);
  }

  res.writeHead(status, { ...headers, "Accept-Ranges": "bytes", "Content-Length": size });
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(found.file).pipe(res);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }

  const host = (req.headers["x-forwarded-host"] || req.headers.host || "").split(":")[0].toLowerCase();
  const url = new URL(req.url || "/", "http://local");

  if (url.pathname === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain", "Cache-Control": "no-store" });
    return res.end("ok");
  }

  // Bare domain → www (one canonical site for Google)
  if (REDIRECT_HOSTS.includes(host)) {
    res.writeHead(301, { Location: `https://${CANONICAL_HOST}${url.pathname}${url.search}`, "Cache-Control": "public, max-age=86400" });
    return res.end();
  }

  // /about/ → /about, /index.html → /
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    res.writeHead(301, { Location: url.pathname.replace(/\/+$/, "") + url.search });
    return res.end();
  }
  if (url.pathname.endsWith("/index.html") || (url.pathname.endsWith(".html") && url.pathname !== "/index.html")) {
    const target = url.pathname.replace(/(\/index)?\.html$/, "") || "/";
    res.writeHead(301, { Location: target + url.search });
    return res.end();
  }

  let found;
  try {
    found = resolveFile(url.pathname === "/" ? "/index.html" : url.pathname);
  } catch {
    found = null;
  }
  if (found) return send(req, res, 200, found, url.pathname);

  // Unknown URL: real 404 status so search engines drop it; the app still renders the home page.
  const fallback = resolveFile("/index.html");
  if (fallback) return send(req, res, 404, fallback, url.pathname);
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, () => console.log(`cloudisoft.com serving ${ROOT} on :${PORT}`));
