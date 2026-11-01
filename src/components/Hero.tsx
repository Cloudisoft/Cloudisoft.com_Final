import VoiceDemo from "./VoiceDemo";
import CircuitBg from "./CircuitBg";
import { ArrowRight, Play } from "./Icons";

const line = (words: string, base: number, accent?: boolean) => (
  <span className="split-line">
    <span style={{ ["--d" as any]: `${base}ms` }} className={accent ? "gradient-text" : undefined}>
      {words}
    </span>
  </span>
);

export default function Hero() {
  const playDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.dispatchEvent(new Event("cloudi:play-demo"));
  };

  return (
    <section id="home" className="relative isolate overflow-hidden pt-32 sm:pt-36 lg:pt-40">
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow left-[-10%] top-[-10%] h-[520px] w-[520px] bg-ember/20" />
        <div className="glow right-[-8%] top-[20%] h-[460px] w-[460px] bg-amber/10" />
        <CircuitBg />
      </div>

      <div className="section grid items-center gap-14 pb-20 [&>*]:min-w-0 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pb-28">
        <div>
          <p className="reveal eyebrow flex flex-wrap items-center gap-3">
            <span className="h-px w-8 bg-amber/70" />
            Websites · Automations · CRM · AI voice · Cloud
          </p>

          <h1 className="mt-7 font-display text-[2.7rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4rem]" data-reveal>
            {line("Software that", 80)}
            {line("answers, automates", 200)}
            {line("and scales.", 320, true)}
          </h1>

          <p className="reveal mt-7 max-w-xl text-[17px] leading-relaxed text-bone/70" style={{ ["--d" as any]: "380ms" }}>
            Cloudisoft builds websites, workflow automations, CRMs, AI voice agents and secure cloud infrastructure for growing
            businesses in the US and India — so your team spends less time on busywork and more on customers.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as any]: "480ms" }}>
            <button type="button" onClick={playDemo} className="btn-primary">
              <Play className="h-4 w-4" /> Hear a sample call
            </button>
            <a href="#pricing" className="btn-secondary">
              See pricing <ArrowRight />
            </a>
          </div>

          <dl className="reveal mt-12 grid max-w-lg grid-cols-3 gap-6 border-t hairline pt-6" style={{ ["--d" as any]: "560ms" }}>
            {[
              ["$200+", "websites from"],
              ["11", "voice languages"],
              ["US · IN", "teams in NJ & Ahmedabad"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="sr-only">{v}</dt>
                <dd className="font-display text-2xl font-semibold text-bone">{k}</dd>
                <dd className="mt-1 text-[12.5px] leading-snug text-mute">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="demo" className="reveal reveal-scale" style={{ ["--d" as any]: "300ms" }}>
          <VoiceDemo />
        </div>
      </div>
    </section>
  );
}
