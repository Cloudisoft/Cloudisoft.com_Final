import { FAQS } from "../lib/site";

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t hairline py-28 lg:py-36">
      <div className="section grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="reveal eyebrow">05 — Questions</p>
          <h2 id="faq-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
            Straight answers.
          </h2>
          <p className="reveal mt-6 max-w-sm text-[15px] text-bone/60" style={{ ["--d" as any]: "160ms" }}>
            Something we missed? Email{" "}
            <a className="text-bone underline decoration-amber/60 underline-offset-4 hover:decoration-amber" href="mailto:connect@cloudisoft.com">
              connect@cloudisoft.com
            </a>
            .
          </p>
        </div>

        <div className="border-t hairline">
          {FAQS.map((f, i) => (
            <details key={f.q} className="reveal group border-b hairline" style={{ ["--d" as any]: `${i * 50}ms` }} open={i === 0}>
              <summary className="flex items-center justify-between gap-6 py-6 text-left">
                <h3 className="text-lg font-medium leading-snug transition group-hover:text-sun sm:text-xl">{f.q}</h3>
                <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full border hairline text-mute transition duration-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-relaxed text-bone/65">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
