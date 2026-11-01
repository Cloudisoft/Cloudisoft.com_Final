import { PRODUCTS } from "../lib/site";
import { ArrowUpRight } from "./Icons";

export default function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="section py-28 lg:py-36">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="reveal eyebrow">01 — Products</p>
          <h2 id="products-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
            Four products.
            <br />
            <span className="text-mute">One circuit.</span>
          </h2>
          <p className="reveal mt-6 max-w-sm text-[15.5px] leading-relaxed text-bone/65" style={{ ["--d" as any]: "160ms" }}>
            Each one started as work we kept rebuilding for clients. Now they run on their own — and plug into the custom agents
            we build for you.
          </p>
        </div>

        <ol className="relative" data-trace>
          {/* the trace — echoes the circuit lines in the logo; grows as you scroll */}
          <span aria-hidden="true" className="absolute bottom-4 left-[7px] top-2 hidden w-[2px] bg-white/10 sm:block">
            <span className="trace-fill trace-y block h-full w-full bg-[linear-gradient(180deg,#ff4d1a,#ff9f1c_60%,#ffe14d)]" />
          </span>

          {PRODUCTS.map((p, i) => (
            <li key={p.id} id={p.id} className="reveal group relative pb-14 last:pb-0 sm:pl-14" style={{ ["--d" as any]: `${i * 60}ms` }}>
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 hidden h-4 w-4 rounded-full border-2 border-ink bg-ink-600 ring-1 ring-white/15 transition-all duration-700 group-[.is-in]:bg-amber group-[.is-in]:shadow-[0_0_18px_rgba(255,159,28,0.8)] sm:block"
              />
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-transparent p-0 transition sm:-m-5 sm:p-5 sm:hover:border-white/[0.08] sm:hover:bg-white/[0.02]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
                    0{i + 1} · {p.kicker}
                  </p>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sun" />
                </div>
                <h3 className="mt-3 text-3xl font-semibold sm:text-[2.6rem]">
                  <span className="bg-[linear-gradient(90deg,#ff4d1a,#ff9f1c_55%,#ffe14d)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                    {p.name}
                  </span>
                </h3>
                <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-bone/70">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="rounded-full border hairline px-3 py-1 text-[12px] text-mute">
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-bone">
                  {p.cta} <span className="text-mute">— {p.href.replace("https://", "").replace(/\/$/, "")}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
