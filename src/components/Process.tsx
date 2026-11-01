const steps = [
  { k: "Map", t: "Map the work", d: "We sit with the people doing the job and list the calls, messages and tasks that repeat — and where they go wrong." },
  { k: "Pilot", t: "Build a pilot", d: "One agent, one job, your real data and tools. Small enough to judge in days, not quarters." },
  { k: "Test", t: "Test with your team", d: "Listen to calls, review outputs, tighten the instructions. Nothing talks to a customer until you sign off." },
  { k: "Run", t: "Run and improve", d: "Go live with limits, transcripts and a human handoff. We review results with you and keep tuning." },
];

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden border-t hairline py-28 lg:py-36">
      <div className="section">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="reveal eyebrow">03 — How we work</p>
            <h2 id="process-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
              From first call to live agent.
            </h2>
          </div>
          <p className="reveal max-w-sm text-[15px] leading-relaxed text-bone/60" style={{ ["--d" as any]: "160ms" }}>
            Pricing is custom — scoped to your volume and how much integration the job needs. You get a scoped quote before we build anything.
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
