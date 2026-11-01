import { useEffect, useRef } from "react";
import { CONTACT, SOCIAL } from "../lib/site";
import { InstagramIcon, LinkedInIcon, WhatsApp } from "./Icons";

/** 30-second services reel, played muted when scrolled into view. */
export default function ReelSection() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const ig = SOCIAL.find((s) => s.label === "Instagram")!;
  const li = SOCIAL.find((s) => s.label === "LinkedIn")!;

  return (
    <section id="reel" aria-labelledby="reel-title" className="relative overflow-hidden border-t hairline py-28 lg:py-36">
      <div aria-hidden="true" className="glow right-[-10%] top-1/4 h-[460px] w-[460px] bg-amber/10" />
      <div className="section grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="reveal eyebrow">Cloudisoft in 30 seconds</p>
          <h2 id="reel-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
            Five services. <span className="gradient-text">One team.</span>
          </h2>
          <p className="reveal mt-6 max-w-lg text-[16px] leading-relaxed text-bone/65" style={{ ["--d" as any]: "160ms" }}>
            Websites from $200, automations from $750, CRM setup, AI voice agents from $1,000, and cloud, security and SOC 2
            readiness from $1,500 — all built and supported by the same people.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-3" style={{ ["--d" as any]: "240ms" }}>
            <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsApp /> Get a quote on WhatsApp
            </a>
            <a href={ig.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <InstagramIcon /> {ig.handle}
            </a>
            <a href={li.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>

        <div className="reveal reveal-scale mx-auto w-full max-w-[340px]">
          <div className="float-y relative overflow-hidden rounded-[30px] border hairline bg-ink-800 shadow-[0_40px_100px_-30px_rgba(255,110,30,0.45)]">
            <video
              ref={ref}
              className="block aspect-[9/16] w-full"
              src="/media/cloudisoft-reel-720.mp4"
              poster="/media/cloudisoft-reel-poster.jpg"
              muted
              loop
              playsInline
              preload="none"
              aria-label="30-second video: Cloudisoft services — websites, automations, CRM, AI voice agents, and cloud & security"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
