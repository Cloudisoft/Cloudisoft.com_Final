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
