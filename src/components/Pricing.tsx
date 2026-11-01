import { Link } from "react-router-dom";
import { PRICING } from "../lib/site";
import CountUp from "./CountUp";
import { ArrowRight, Check } from "./Icons";

export default function Pricing({ eyebrow = "Pricing" }: { eyebrow?: string }) {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative border-t hairline py-28 lg:py-36">
      <div aria-hidden="true" data-parallax="0.2" className="absolute inset-0"><div className="glow left-1/2 top-24 h-[380px] w-[640px] -translate-x-1/2 bg-ember/10" /></div>
      <div className="section relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal eyebrow">{eyebrow}</p>
          <h2 id="pricing-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
            Clear starting prices. <span className="gradient-text">No surprises.</span>
          </h2>
          <p className="reveal mt-5 text-[15.5px] leading-relaxed text-bone/65" style={{ ["--d" as any]: "160ms" }}>
            Every project starts from the price below. Tell us the scope and we’ll send a fixed quote before any work begins.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((p, i) => (
            <li
              key={p.id}
              className={`reveal spotlight flex flex-col rounded-2xl p-7 ${p.featured ? "border-spin lg:-translate-y-3" : "border hairline bg-ink-800/60"}`}
              style={{ ["--d" as any]: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-amber/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-sun">Popular</span>
                )}
              </div>
              <p className="mt-1.5 text-[13.5px] text-mute">{p.blurb}</p>
              <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Starting from</p>
              <p className="mt-1 font-display text-5xl font-semibold tracking-tight">
                <CountUp to={p.from} prefix="$" />
                <span className="ml-1 align-top text-xl text-amber">+</span>
              </p>
              <ul className="mt-7 space-y-3 border-t hairline pt-6 text-[14px] text-bone/75">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-amber/15 text-sun">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`mt-8 ${p.featured ? "btn-primary" : "btn-secondary"} w-full`}>
                Get a quote <ArrowRight />
              </a>
            </li>
          ))}
        </ul>
        <p className="reveal mt-10 text-center text-[13px] text-mute">
          Starting prices in USD, not final quotes. Final pricing depends on scope, integrations and volume.{" "}
          <Link to="/services" className="text-bone underline decoration-amber/60 underline-offset-4 hover:decoration-amber">
            See what’s included
          </Link>
        </p>
      </div>
    </section>
  );
}
