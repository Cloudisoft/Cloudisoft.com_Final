import { Link } from "react-router-dom";
import { SERVICES, usd } from "../lib/site";
import ServiceGfx from "./ServiceGfx";
import { ArrowRight } from "./Icons";

/** Bento grid of services with a live motion graphic in each tile. */
export default function ServicesGrid({ eyebrow = "Services" }: { eyebrow?: string }) {
  const span = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];
  return (
    <section id="services" aria-labelledby="services-title" className="border-t hairline py-28 lg:py-36">
      <div className="section">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="reveal eyebrow">{eyebrow}</p>
            <h2 id="services-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
              Everything your business runs on, <span className="gradient-text">built properly.</span>
            </h2>
          </div>
          <Link to="/services" className="reveal btn-secondary self-start lg:self-auto" style={{ ["--d" as any]: "160ms" }}>
            All services <ArrowRight />
          </Link>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => (
            <li key={s.id} className={`reveal ${span[i]} ${i === 4 ? "sm:col-span-2 lg:col-span-2" : ""}`} style={{ ["--d" as any]: `${(i % 3) * 90}ms` }}>
              <Link
                to={`/services#${s.id}`}
                className="spotlight group flex h-full flex-col overflow-hidden rounded-2xl border hairline bg-ink-800/50 transition duration-500 hover:-translate-y-1 hover:border-amber/30"
              >
                <div className="relative aspect-[16/10] border-b hairline bg-[radial-gradient(ellipse_at_center,rgba(255,159,28,0.06),transparent_70%)]">
                  <ServiceGfx id={s.id} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-xl font-semibold">{s.name}</h3>
                    {s.from && <span className="shrink-0 font-mono text-[11.5px] text-amber">from {usd(s.from)}</span>}
                  </div>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-bone/60">{s.short}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] text-mute transition group-hover:text-sun">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
