// Prerenders the home page into dist/index.html so search engines and AI answer
// engines get real content (not an empty <div id="root">), then adds CSP + JSON-LD.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = path.join(root, "dist-ssr", "entry-server.mjs");

const { render, structuredData } = await import(pathToFileURL(serverEntry).href);

const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "connect-src 'self' https://formspree.io https://*.supabase.co wss://*.supabase.co",
  "form-action 'self' https://formspree.io",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const file = path.join(dist, "index.html");
let html = fs.readFileSync(file, "utf8");
const json = JSON.stringify(structuredData()).replace(/</g, "\\u003c");

html = html
  .replace("<!--app-html-->", render("/"))
  .replace("<!--json-ld-->", `<script type="application/ld+json">${json}</script>`)
  .replace("<!--csp-->", `<meta http-equiv="Content-Security-Policy" content="${csp}" />`);

fs.writeFileSync(file, html);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerendered / → dist/index.html (${(html.length / 1024).toFixed(1)} kB)`);
