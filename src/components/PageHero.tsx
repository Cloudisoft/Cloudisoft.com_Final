import type { ReactNode } from "react";
import CircuitBg from "./CircuitBg";

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pt-44 lg:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div data-parallax="0.25" className="absolute inset-0">
          <div className="glow left-[-10%] top-[-20%] h-[480px] w-[480px] bg-ember/20" />
          <div className="glow right-[-10%] top-[10%] h-[420px] w-[420px] bg-amber/10" />
        </div>
        <div data-parallax="0.12" className="absolute inset-0">
          <CircuitBg className="opacity-80" />
        </div>
      </div>
      <div className="section">
        <p className="reveal eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-amber/70" />
          {eyebrow}
        </p>
        <h1 className="reveal mt-7 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.03] sm:text-6xl lg:text-7xl" style={{ ["--d" as any]: "100ms" }}>
          {title}
        </h1>
        {children && (
          <div className="reveal mt-7 max-w-2xl text-[17px] leading-relaxed text-bone/70" style={{ ["--d" as any]: "220ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
