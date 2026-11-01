import { useEffect, useRef, useState } from "react";
import { CONTACT, SOCIAL } from "../lib/site";
import { InstagramIcon, LinkedInIcon, Pause, Play, WhatsApp } from "./Icons";

/** 30-second services reel. Always playing (muted, looped) while on screen; visitors can pause it. */
export default function ReelSection() {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => {
      if (!userPaused.current) v.play().catch(() => {});
    };
    tryPlay();
    // Pause only while off screen (saves battery), resume as soon as it's visible again.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tryPlay() : v.pause()), { threshold: 0.05 });
    io.observe(v);
    // Some mobile browsers block autoplay until the first interaction.
    const kick = () => tryPlay();
    window.addEventListener("touchstart", kick, { once: true, passive: true });
    window.addEventListener("scroll", kick, { once: true, passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("touchstart", kick);
      window.removeEventListener("scroll", kick);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

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

        <div className="reveal reveal-scale relative mx-auto w-full max-w-[340px]">
          <div data-parallax="-0.08" aria-hidden="true" className="absolute -inset-10 -z-10">
            <svg viewBox="0 0 200 200" className="spin-slow h-full w-full opacity-40">
              <circle cx="100" cy="100" r="96" fill="none" stroke="#ff9f1c" strokeOpacity=".35" strokeDasharray="2 6" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#f4efe6" strokeOpacity=".08" />
              <circle cx="196" cy="100" r="3" fill="#ffd93d" />
              <circle cx="20" cy="100" r="2.5" fill="#ff5a1f" />
            </svg>
          </div>
          <div className="float-a relative overflow-hidden rounded-[30px] border hairline bg-ink-800 shadow-[0_40px_100px_-30px_rgba(255,110,30,0.45)]">
            <video
              ref={ref}
              className="block aspect-[9/16] w-full"
              src="/media/cloudisoft-reel-720.mp4"
              poster="/media/cloudisoft-reel-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              aria-label="30-second video: Cloudisoft services — websites, automations, CRM, AI voice agents, and cloud & security"
            />
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-bone backdrop-blur transition hover:bg-ink"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
