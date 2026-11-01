// Prerenders every public page into static HTML so search engines and AI answer engines
// get real content (not an empty <div id="root">), with per-page meta, JSON-LD and a CSP.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://www.cloudisoft.com";

const { render, structuredData, PRERENDERED, PAGES, ARTICLES, LOCATIONS, SERVICES, SERVICE_DETAILS, FAQS, PRICING, CONTACT, PRODUCTS, PRICING_FAQS } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.mjs")).href
);

const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "connect-src 'self' https://formspree.io",
  "form-action 'self' https://formspree.io",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

// Preload the latin display + body fonts so text renders in the right face immediately.
const assets = fs.readdirSync(path.join(dist, "assets"));
const fontPreloads = [/bricolage-grotesque-latin-opsz-normal.*\.woff2$/, /geist-latin-wght-normal.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join("\n    ");
if (!fontPreloads.includes("bricolage")) console.warn("warning: display font preload not found");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

for (const url of PRERENDERED) {
  const meta = PAGES[url];
  const canonical = `${SITE}${url === "/" ? "/" : url}`;
  const ogName = url === "/" ? "home" : ["/privacy", "/terms"].includes(url) ? "legal" : url.split("/").pop();
  const ogImage = `${SITE}/og/${ogName}.jpg`;
  const json = JSON.stringify(structuredData(url)).replace(/</g, "\\u003c");

  // Function replacers: a "$" in the page text (e.g. "from $200") must never be read as a regex back-reference.
  const attr = (re, value) => (h) => h.replace(re, (_m, a, b) => `${a}${value}${b}`);
  const steps = [
    (h) => h.replace("<!--app-html-->", () => render(url)),
    (h) => h.replace("<!--json-ld-->", () => `<script type="application/ld+json">${json}</script>`),
    (h) => h.replace("<!--font-preload-->", () => fontPreloads),
    (h) => h.replace("<!--csp-->", () => `<meta http-equiv="Content-Security-Policy" content="${csp}" />`),
    (h) => h.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(meta.title)}</title>`),
    attr(/(<meta\s+name="description"\s+content=")[^"]*(")/, esc(meta.description)),
    attr(/(<link rel="canonical" href=")[^"]*(")/, canonical),
    attr(/(<meta property="og:url" content=")[^"]*(")/, canonical),
    attr(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, esc(meta.title)),
    attr(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(")/g, esc(meta.description)),
    attr(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(")/g, ogImage),
    attr(/(<meta property="og:image:alt" content=")[^"]*(")/, esc(meta.title)),
  ];
  let html = steps.reduce((h, step) => step(h), template);

  // Guard: fail the build if the head doesn't carry this page's exact metadata.
  for (const needle of [`<title>${esc(meta.title)}</title>`, `name="description" content="${esc(meta.description)}"`, `href="${canonical}"`]) {
    if (!html.includes(needle)) throw new Error(`prerender ${url}: metadata missing or corrupted → ${needle.slice(0, 80)}`);
  }

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

// llms-full.txt — the whole site as plain Markdown for AI assistants and answer engines.
{
  const blockText = (b) =>
    b.p ?? b.callout ?? (b.list ? b.list.map((x, i) => (b.ordered ? `${i + 1}. ` : "- ") + x).join("\n")
      : "| " + b.table.head.join(" | ") + " |\n|" + b.table.head.map(() => "---").join("|") + "|\n" + b.table.rows.map((r) => "| " + r.join(" | ") + " |").join("\n"));
  const L = [];
  L.push("# Cloudisoft — full site content", "");
  L.push("> Cloudisoft (Cloudisoft LLC) builds websites, workflow automations, CRM systems, AI voice agents and secure cloud infrastructure for businesses in the United States and India.", "");
  L.push(`Website: ${SITE}/`, `Email: ${CONTACT.email}`, `WhatsApp: ${CONTACT.whatsapp.display} (${CONTACT.whatsapp.href.split("?")[0]})`, `Call or text (US): ${CONTACT.phone.display}`);
  for (const o of CONTACT.offices) L.push(`Office — ${o.city}: ${o.lines.join(", ")}`);
  L.push("", "## Services and starting prices (USD)", "");
  for (const s of SERVICES) {
    const d = SERVICE_DETAILS[s.id];
    L.push(`### ${s.name}${s.from ? ` — from $${s.from.toLocaleString("en-US")}` : ""}`, `URL: ${SITE}/services/${d.slug}`, "", d.intro, "", s.desc, "", "Included:", ...s.deliverables.map((x) => `- ${x}`), "", "Good fit if:", ...d.goodFit.map((x) => `- ${x}`), "");
    for (const f of d.faqs) L.push(`**${f.q}** ${f.a}`, "");
  }
  L.push("## Pricing", "");
  for (const p of PRICING) L.push(`- ${p.name}: from $${p.from.toLocaleString("en-US")} — ${p.blurb} (${p.features.join(", ")})`);
  L.push("", ...PRICING_FAQS.flatMap((f) => [`**${f.q}** ${f.a}`, ""]));
  L.push("## Products", "");
  for (const p of PRODUCTS) L.push(`- [${p.name}](${p.href}): ${p.summary}`);
  L.push("", "## Locations", "");
  for (const l of LOCATIONS) L.push(`### ${l.city} (${l.region})`, `URL: ${SITE}/locations/${l.slug}`, "", l.intro, "", ...l.points.map((x) => `- ${x}`), "", ...l.faqs.flatMap((f) => [`**${f.q}** ${f.a}`, ""]));
  L.push("## Frequently asked questions", "", ...FAQS.flatMap((f) => [`**${f.q}** ${f.a}`, ""]));
  L.push("## Insights (articles)", "");
  for (const a of ARTICLES) {
    L.push(`### ${a.title}`, `URL: ${SITE}/insights/${a.slug} — updated ${a.updated}`, "", `**Short answer:** ${a.answer}`, "");
    for (const sec of a.sections) L.push(`#### ${sec.h}`, "", ...sec.blocks.flatMap((b) => [blockText(b), ""]));
    L.push(...a.faqs.flatMap((f) => [`**${f.q}** ${f.a}`, ""]));
  }
  fs.writeFileSync(path.join(dist, "llms-full.txt"), L.join("\n"));
  console.log(`llms-full.txt → ${(L.join("\n").length / 1024).toFixed(1)} kB`);
}

// Sitemap generated from the same route list, so new pages are never forgotten.
const today = new Date().toISOString().slice(0, 10);
const prio = (u) =>
  u === "/" ? "1.0"
  : u === "/services" || u.startsWith("/services/") ? "0.9"
  : u === "/pricing" || u.startsWith("/locations/") || u.startsWith("/insights") ? "0.8"
  : u === "/about" || u === "/contact" ? "0.7"
  : "0.3";
const lastmod = (u) => ARTICLES.find((a) => u === `/insights/${a.slug}`)?.updated || today;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRERENDERED.map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${lastmod(u)}</lastmod><priority>${prio(u)}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log(`sitemap.xml → ${PRERENDERED.length} urls`);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
