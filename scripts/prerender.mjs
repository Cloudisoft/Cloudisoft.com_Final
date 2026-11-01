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
  const ogName = url === "/" ? "home" : url.startsWith("/services/") ? url.split("/").pop() : ["/privacy", "/terms"].includes(url) ? "legal" : url.slice(1);
  const ogImage = `${SITE}/og/${ogName}.jpg`;
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
    .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(")/g, `$1${esc(meta.description)}$2`)
    .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(")/g, `$1${ogImage}$2`)
    .replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${esc(meta.title)}$2`);

  if (url === "/") {
    fs.writeFileSync(path.join(dist, "index.html"), html);
  } else {
    // Write both /about.html and /about/index.html so any static host resolves the clean URL.
    fs.mkdirSync(path.join(dist, url.slice(1)), { recursive: true });
    fs.mkdirSync(path.dirname(path.join(dist, `${url.slice(1)}.html`)), { recursive: true });
    fs.writeFileSync(path.join(dist, `${url.slice(1)}.html`), html);
    fs.writeFileSync(path.join(dist, url.slice(1), "index.html"), html);
  }
  console.log(`prerendered ${url.padEnd(10)} ${(html.length / 1024).toFixed(1)} kB`);
}

// Sitemap generated from the same route list, so new pages are never forgotten.
const today = new Date().toISOString().slice(0, 10);
const prio = (u) => (u === "/" ? "1.0" : u === "/services" ? "0.9" : u.startsWith("/services/") ? "0.9" : u === "/about" ? "0.7" : "0.3");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRERENDERED.map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod><priority>${prio(u)}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log(`sitemap.xml → ${PRERENDERED.length} urls`);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
