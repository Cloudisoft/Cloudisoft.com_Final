import { useEffect } from "react";

/**
 * Page-level motion:
 *  - `.reveal` / `.split-line` / `[data-reveal]` get `.is-in` when they enter the viewport
 *  - `--p` on the root drives the top progress bar
 *  - `[data-trace]` elements get `--trace` (0 → 1) as they travel through the viewport
 *  - `[data-parallax="0.15"]` elements drift vertically with scroll (positive = slower than the page)
 *  - `.tilt` cards lean towards the cursor in 3D; `.spotlight` cards get a cursor glow
 *  - `[data-mouse="12"]` elements follow the cursor slightly (hero chips, glows)
 *
 * Reduced-motion users still get the fades and the video; only large movement
 * (parallax, tilt, cursor-follow) is switched off for them.
 */
export default function useScrollFx(key = "") {
  useEffect(() => {
    const root = document.documentElement;
    (window as any).__cloudiReady = true;
    root.classList.add("js");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .split-line, [data-reveal]"));

    let io: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window)) {
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

    // Cursor effects: spotlight glow, 3D tilt, and gentle follow.
    const followers = Array.from(document.querySelectorAll<HTMLElement>("[data-mouse]"));
    let mx = 0;
    let my = 0;
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const card = target?.closest?.(".spotlight") as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (reduce || !fine) return;
      const tilt = target?.closest?.(".tilt") as HTMLElement | null;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
      }
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      onScroll();
    };
    const onLeave = (e: PointerEvent) => {
      const tilt = (e.target as Element | null)?.closest?.(".tilt") as HTMLElement | null;
      if (tilt && !tilt.contains(e.relatedTarget as Node)) {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      }
    };
    document.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });

    const traces = Array.from(document.querySelectorAll<HTMLElement>("[data-trace]"));
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
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
      if (reduce) return;
      for (const el of parallax) {
        const host = el.parentElement || el;
        const r = host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.1");
        // 0 when the host's centre is mid-viewport
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      }
      for (const el of followers) {
        const k = parseFloat(el.dataset.mouse || "10");
        el.style.setProperty("--fx", `${(mx * k).toFixed(1)}px`);
        el.style.setProperty("--fy", `${(my * k).toFixed(1)}px`);
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
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);
}
