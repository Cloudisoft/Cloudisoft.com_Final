import { LINKS } from "../lib/site";
import { ArrowUpRight } from "./Icons";

const steps = [
  { t: "Describe the decision", d: "Pick a template — pricing, hiring, expansion — or write your own scenario." },
  { t: "Run the simulation", d: "CloudiCore models outcomes from your numbers and industry patterns." },
  { t: "Read the dashboard", d: "Projections, a risk index and a plain-language recommendation." },
];

// Three scenario curves for the illustration (not real customer data).
const curves = [
  { name: "Optimistic", d: "M0 150 C 80 140, 140 110, 200 92 S 330 40, 400 22", color: "#ffe14d" },
  { name: "Expected", d: "M0 150 C 80 146, 150 126, 210 116 S 330 82, 400 70", color: "#ff9f1c" },
  { name: "Cautious", d: "M0 150 C 90 152, 160 146, 220 144 S 330 132, 400 128", color: "#ff5a1f" },
];

export default function CloudiCoreSection() {
  return (
    <section id="cloudicore" aria-labelledby="cc-title" className="border-t hairline py-28 lg:py-36">
      <div className="section grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="reveal eyebrow">04 — CloudiCore</p>
          <h2 id="cc-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
            See the outcome <span className="gradient-text">before you decide.</span>
          </h2>
          <p className="reveal mt-6 max-w-lg text-[16px] leading-relaxed text-bone/65" style={{ ["--d" as any]: "160ms" }}>
            Most business calls are made on gut feel or trial and error. CloudiCore lets founders and managers simulate a decision
            first — and see the profit and the risk side by side.
          </p>

          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.t} className="reveal flex gap-5" style={{ ["--d" as any]: `${200 + i * 90}ms` }}>
                <span className="font-mono text-sm text-amber">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-[14.5px] text-bone/60">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="reveal mt-10 flex flex-wrap items-center gap-4" style={{ ["--d" as any]: "420ms" }}>
            <a href={LINKS.cloudicoreTrial} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Start the 7-day free trial <ArrowUpRight />
            </a>
            <span className="text-[13px] text-mute">No credit card · unlimited simulations</span>
          </div>
        </div>

        <figure className="reveal reveal-scale card relative !p-0">
          <div className="flex items-center justify-between border-b hairline px-6 py-4">
            <span className="font-mono text-[11.5px] text-mute">scenario: raise prices 8% · 12 months</span>
            <span className="rounded-full border border-amber/40 px-2.5 py-0.5 font-mono text-[10.5px] text-amber">risk 0.32</span>
          </div>
          <div className="px-6 pb-6 pt-8">
            <svg viewBox="0 0 400 170" className="h-auto w-full" role="img" aria-label="Illustration of three projected revenue curves: optimistic, expected and cautious">
              {[30, 70, 110, 150].map((y) => (
                <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(244,239,230,0.07)" strokeDasharray="2 4" />
              ))}
              {curves.map((c, i) => (
                <path style={{ ["--d" as any]: `${300 + i * 180}ms` }} key={c.name} className="chart-path" pathLength={1} d={c.d} fill="none" stroke={c.color} strokeWidth="2.2" strokeLinecap="round" />
              ))}
            </svg>
            <figcaption className="mt-6 grid grid-cols-3 gap-4 border-t hairline pt-5">
              {curves.map((c, i) => (
                <div key={c.name}>
                  <span className="flex items-center gap-2 text-[12px] text-mute">
                    <i className="h-2 w-2 rounded-full" style={{ background: c.color }} /> {c.name}
                  </span>
                  <span className="mt-1 block font-display text-xl font-semibold">{["+24%", "+11%", "+2%"][i]}</span>
                </div>
              ))}
            </figcaption>
            <p className="mt-4 font-mono text-[10.5px] text-mute/60">Illustrative example</p>
          </div>
        </figure>
      </div>
    </section>
  );
}
