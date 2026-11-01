const steps = [
  { k: "Discover", t: "Discovery call", d: "A short call on WhatsApp, phone or video. We learn how your business works and what you need." },
  { k: "Quote", t: "Fixed quote", d: "You get a written scope, timeline and fixed price — starting from our published rates." },
  { k: "Build", t: "Build & review", d: "We build in short rounds and show you working progress, so there are no surprises at the end." },
  { k: "Launch", t: "Launch & support", d: "We launch, hand over access and documentation, and stay on for fixes and improvements." },
];

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden border-t hairline py-28 lg:py-36">
      <div className="section">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="reveal eyebrow">How we work</p>
            <h2 id="process-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
              From first call to launch.
            </h2>
          </div>
          <p className="reveal max-w-sm text-[15px] leading-relaxed text-bone/60" style={{ ["--d" as any]: "160ms" }}>
            Simple, transparent and predictable. You always know what’s being built, when it’s due and what it costs.
          </p>
        </div>

        <div className="relative mt-16" data-trace>
          <span aria-hidden="true" className="absolute left-0 right-0 top-[11px] hidden h-[2px] bg-white/10 md:block">
            <span className="trace-fill trace-x block h-full w-full bg-[linear-gradient(90deg,#ff4d1a,#ff9f1c_60%,#ffe14d)]" />
          </span>
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.k} className="reveal group relative" style={{ ["--d" as any]: `${i * 120}ms` }}>
                <span className="relative z-10 grid h-6 w-6 place-items-center rounded-full border border-amber/60 bg-ink">
                  <span className="h-2 w-2 rounded-full bg-amber transition duration-700 group-[.is-in]:shadow-[0_0_12px_#ff9f1c]" />
                </span>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-amber">Step {i + 1}</p>
                <h3 className="mt-2 text-2xl font-semibold">{s.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-bone/60">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
