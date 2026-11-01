// Prerenders every public page into static HTML so search engines and AI answer engines
// get real content (not an empty <div id="root">), with per-page meta, JSON-LD and a CSP.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://www.cloudisoft.com";

const { render, structuredData, PRERENDERED, PAGES } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.mjs")).href
);

const csp = [
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
].join("; ");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

for (const url of PRERENDERED) {
  const meta = PAGES[url];
  const canonical = `${SITE}${url === "/" ? "/" : url}`;
  const json = JSON.stringify(structuredData(url)).replace(/</g, "\\u003c");

  let html = template
    .replace("<!--app-html-->", render(url))
    .replace("<!--json-ld-->", `<script type="application/ld+json">${json}</script>`)
    .replace("<!--csp-->", `<meta http-equiv="Content-Security-Policy" content="${csp}" />`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, `$1${esc(meta.title)}$2`)
    .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(")/g, `$1${esc(meta.description)}$2`);

  if (url === "/") {
    fs.writeFileSync(path.join(dist, "index.html"), html);
  } else {
    // Write both /about.html and /about/index.html so any static host resolves the clean URL.
    fs.writeFileSync(path.join(dist, `${url.slice(1)}.html`), html);
    fs.mkdirSync(path.join(dist, url.slice(1)), { recursive: true });
    fs.writeFileSync(path.join(dist, url.slice(1), "index.html"), html);
  }
  console.log(`prerendered ${url.padEnd(10)} ${(html.length / 1024).toFixed(1)} kB`);
}

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
