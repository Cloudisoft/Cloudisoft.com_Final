import { PRODUCTS } from "../lib/site";
import { ArrowUpRight } from "./Icons";
import ServiceGfx from "./ServiceGfx";
import { KundliGfx } from "./VyomiraSection";

export default function Products({ eyebrow = "Our products" }: { eyebrow?: string }) {
  return (
    <section id="products" aria-labelledby="products-title" className="border-t hairline py-28 lg:py-36">
      <div className="section">
        <div className="max-w-2xl">
          <p className="reveal eyebrow">{eyebrow}</p>
          <h2 id="products-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
            Built by us. <span className="text-mute">Running every day.</span>
          </h2>
          <p className="reveal mt-6 max-w-lg text-[15.5px] leading-relaxed text-bone/65" style={{ ["--d" as any]: "160ms" }}>
            Three products we built and run ourselves — the same engineering that goes into the solutions we build for you.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <li key={p.id} id={`product-${p.id}`} className="reveal" style={{ ["--d" as any]: `${i * 120}ms` }}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight tilt group flex h-full flex-col overflow-hidden rounded-[22px] border hairline bg-ink-800/50 hover:border-amber/30"
              >
                <div className="relative aspect-[16/8] border-b hairline bg-[radial-gradient(ellipse_at_center,rgba(255,159,28,0.07),transparent_70%)]">
                  <div className="float-c absolute inset-0" style={{ ["--fd" as any]: `${i * -3}s` }}>
                    {p.id === "cloudivoice" ? <ServiceGfx id="voice" /> : p.id === "vyomira" ? <KundliGfx compact /> : <ApplyGfx />}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">{p.kicker}</p>
                    <ArrowUpRight className="h-5 w-5 text-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sun" />
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">{p.name}</h3>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-bone/70">{p.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="rounded-full border hairline px-3 py-1 text-[12px] text-mute">{pt}</li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-7 text-sm font-medium text-bone">
                    {p.cta} <span className="text-mute">— {p.href.replace("https://", "").replace(/\/$/, "")}</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Resume → matched roles → applications being filled. */
function ApplyGfx() {
  const roles = ["Product Designer", "Frontend Engineer", "Support Lead"];
  return (
    <svg viewBox="0 0 320 160" className="gfx h-full w-full" aria-hidden="true">
      <rect x="22" y="22" width="78" height="116" rx="8" fill="rgba(18,10,39,0.95)" stroke="rgba(244,239,230,0.14)" />
      <circle cx="42" cy="44" r="9" fill="rgba(255,159,28,0.35)" />
      {[62, 74, 86, 98, 110, 122].map((y, i) => (
        <rect key={y} x="32" y={y} width={i % 2 ? 44 : 58} height="4" rx="2" fill="rgba(244,239,230,0.18)" />
      ))}
      <rect className="gfx-scan" x="24" y="24" width="74" height="6" fill="#ffd93d" opacity=".35" style={{ animationDuration: "1.8s" }} />
      {roles.map((r, i) => (
        <g key={r}>
          <path d={`M100 80 C 140 80, 140 ${36 + i * 44}, 180 ${36 + i * 44}`} fill="none" stroke="rgba(244,239,230,0.14)" />
          <circle r="2.8" fill="#ff9f1c">
            <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M100 80 C 140 80, 140 ${36 + i * 44}, 180 ${36 + i * 44}`} />
          </circle>
          <g transform={`translate(180 ${22 + i * 44})`}>
            <rect width="118" height="28" rx="7" fill="rgba(18,10,39,0.95)" stroke="rgba(244,239,230,0.14)" />
            <text x="10" y="17.5" className="gfx-mono" fontSize="8" fill="rgba(244,239,230,0.75)">{r}</text>
            <rect x="10" y="22" width="98" height="2" rx="1" fill="rgba(244,239,230,0.08)" />
            <rect className="gfx-build" style={{ ["--i" as any]: `${300 + i * 500}ms` }} x="10" y="22" width="98" height="2" rx="1" fill="#ffd93d" />
          </g>
        </g>
      ))}
    </svg>
  );
}
