import { useEffect } from "react";

/**
 * Page-level scroll effects:
 *  - `.reveal` / `.split-line` elements get `.is-in` when they enter the viewport
 *  - `--p` on the root drives the top progress bar
 *  - `[data-trace]` elements get `--trace` (0 → 1) as they travel through the viewport
 */
export default function useScrollFx() {
  useEffect(() => {
    const root = document.documentElement;
    (window as any).__cloudiReady = true;
    root.classList.add("js");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .split-line, [data-reveal]"));

    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      targets.forEach((el) => io!.observe(el));
    }

    const traces = Array.from(document.querySelectorAll<HTMLElement>("[data-trace]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--p", String(max > 0 ? window.scrollY / max : 0));
      const vh = window.innerHeight;
      for (const el of traces) {
        const r = el.getBoundingClientRect();
        // starts when the top hits 85% of the viewport, completes when the bottom reaches 60%
        const start = vh * 0.85;
        const end = vh * 0.6;
        const total = r.height + (start - end);
        const p = Math.min(1, Math.max(0, (start - r.top) / total));
        el.style.setProperty("--trace", reduce ? "1" : p.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
