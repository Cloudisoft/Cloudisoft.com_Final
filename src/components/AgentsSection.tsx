const services = [
  {
    title: "Voice & phone agents",
    desc: "Answer every inbound call, run outbound campaigns within calling hours, and pass the caller to your team the moment they ask for a person.",
  },
  {
    title: "Lead capture & follow-up",
    desc: "Qualify enquiries against your criteria, score them, and follow up by call, SMS or email until they book — or tell you why not.",
  },
  {
    title: "Support from your own knowledge",
    desc: "Answers come from your PDFs, policies and FAQs, not guesses. Anything outside them goes to a human with the context attached.",
  },
  {
    title: "Back-office automation",
    desc: "Move data between your CRM, Google Sheets, calendars and inboxes so nobody re-types an order, a lead or an invoice again.",
  },
  {
    title: "Hiring & applications",
    desc: "Screen candidates on experience, notice period and salary, schedule interviews, and — with ApplyFlux — handle the application side too.",
  },
  {
    title: "Decision modelling",
    desc: "Test pricing, hiring or expansion plans in CloudiCore and see the optimistic, expected and cautious outcome before committing.",
  },
];

export default function AgentsSection() {
  return (
    <section id="build" aria-labelledby="build-title" className="relative border-t hairline py-28 lg:py-36">
      <div className="section">
        <div className="max-w-3xl">
          <p className="reveal eyebrow">02 — Custom AI agents</p>
          <h2 id="build-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ ["--d" as any]: "80ms" }}>
            Built around the work your team <span className="gradient-text">repeats every day.</span>
          </h2>
          <p className="reveal mt-6 max-w-2xl text-[16px] leading-relaxed text-bone/65" style={{ ["--d" as any]: "160ms" }}>
            We don’t sell a chatbot and leave. We map one job, build an agent trained on your business, connect it to the tools you
            already use, and stay on to tune it.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border hairline bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="reveal group relative bg-ink px-6 py-9 transition-colors duration-500 hover:bg-ink-800 sm:px-8"
              style={{ ["--d" as any]: `${(i % 3) * 90}ms` }}
            >
              <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-[1.4rem] font-semibold leading-snug">{s.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-bone/60">{s.desc}</p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-[linear-gradient(90deg,#ff4d1a,#ff9f1c,#ffe14d)] transition-all duration-700 group-hover:w-full"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
