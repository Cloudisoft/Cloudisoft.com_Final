# Cloudisoft — www.cloudisoft.com

Marketing site for Cloudisoft: websites, automations, CRM, AI voice agents, cloud & security — plus ApplyFlux and CloudiVoice.

React + TypeScript + Vite + Tailwind. Every page (`/`, `/about`, `/services`, `/privacy`, `/terms`) is **prerendered at build time** so search engines
and AI answer engines receive real HTML, structured data (Organization, WebSite, FAQPage) and a CSP.

## Scripts

```bash
npm install
npm run dev        # local dev server
npm run build      # client build → SSR build → prerender into dist/index.html
npm run preview    # serve dist/
npm run typecheck
```

## Deploying (Railway)

`railway.json` builds with `npm ci && npm run build` and starts `node server.mjs`
(zero-dependency server: security headers, clean URLs, gzip, byte ranges, real 404s,
`/healthz`, and a 301 from `cloudisoft.com` → `https://www.cloudisoft.com`).

1. Railway → New Project → Deploy from GitHub repo → this repo, branch `main`.
2. Settings → Networking → add custom domains `www.cloudisoft.com` and `cloudisoft.com`.
3. At your DNS provider, replace the old records (the bare domain still points at Lovable)
   with the CNAME targets Railway shows. Use CNAME flattening / ALIAS for the bare domain.
4. Google Search Console → add `https://www.cloudisoft.com` → submit `/sitemap.xml`.

## Marketing assets

- `marketing/cloudisoft-reel-1080x1920.mp4` — 28-second 9:16 reel for Instagram/LinkedIn
- `marketing/reel/` — the source; edit `reel.html`, then run `capture.cjs` + ffmpeg to re-render
- `public/og/*.jpg` — per-page social share images

## Where things live

| What | Where |
| --- | --- |
| Links, services, pricing, contact details, social links, FAQs, page titles (single source of truth) | `src/lib/site.ts` |
| Pages | `src/pages/` |
| Service motion graphics | `src/components/ServiceGfx.tsx` |
| Office maps (Google Maps embed) | `src/components/OfficeMap.tsx` |
| Voice demo (English sample calls + timed transcripts) | `src/components/VoiceDemo.tsx`, `src/data/voiceSamples.json`, `public/samples/` |
| Scroll animations | `src/hooks/useScrollFx.ts`, `.reveal` / `.split-line` / `.trace-*` in `src/index.css` |
| Prerender + CSP + JSON-LD | `scripts/prerender.mjs`, `src/entry-server.tsx` |
| SEO / AEO files | `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/og-image.jpg` |
| Security headers | `render.yaml` (Render), `public/_headers` (Netlify / Cloudflare Pages) |
| Contact API (optional; the form posts to Formspree) | `server/` |
| Legal pages (have them reviewed by counsel) | `src/pages/Privacy.tsx`, `src/pages/Terms.tsx` |

Brand colours come from the logo: ink `#0B031C`, ember `#FF5A1F`, amber `#FF9F1C`, sun `#FFD93D`.
