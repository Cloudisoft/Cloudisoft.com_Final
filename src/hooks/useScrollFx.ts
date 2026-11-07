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

    // ---------------------------------------------------------------
    // Pause looping animations in sections that are off screen, and resume
    // them as soon as they come back into view. Nothing is switched off —
    // the browser just stops animating what nobody can see.
    // ---------------------------------------------------------------
    const zones = Array.from(document.querySelectorAll<HTMLElement>("main > section, main > div, footer"));
    const setZone = (el: Element, visible: boolean) => {
      el.classList.toggle("anim-paused", !visible);
      el.querySelectorAll<SVGSVGElement>("svg").forEach((svg) => {
        if (!svg.querySelector("animateMotion, animate, animateTransform")) return;
        if (visible) svg.unpauseAnimations();
        else svg.pauseAnimations();
      });
    };
    const zoneIo =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => entries.forEach((e) => setZone(e.target, e.isIntersecting)), { rootMargin: "200px 0px" })
        : null;
    zones.forEach((z) => zoneIo?.observe(z));

    // ---------------------------------------------------------------
    // Cursor effects (spotlight glow, 3D tilt, chips that follow the
    // cursor). Throttled to one update per frame, and only on mouse move.
    // ---------------------------------------------------------------
    const followers = Array.from(document.querySelectorAll<HTMLElement>("[data-mouse]"));
    let pointerFrame = 0;
    let lastPointer: PointerEvent | null = null;
    const applyPointer = () => {
      pointerFrame = 0;
      const e = lastPointer;
      if (!e) return;
      const target = e.target as Element | null;
      const card = target?.closest?.(".spotlight") as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(0)}px`);
        card.style.setProperty("--my", `${(e.clientY - r.top).toFixed(0)}px`);
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
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      for (const el of followers) {
        const k = parseFloat(el.dataset.mouse || "10");
        el.style.translate = `${(mx * k).toFixed(1)}px ${(my * k).toFixed(1)}px`;
      }
    };
    const onPointer = (e: PointerEvent) => {
      lastPointer = e;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(applyPointer);
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

    // ---------------------------------------------------------------
    // Scroll-linked motion. Geometry is measured once (and again when the
    // layout changes), so each scroll frame is pure arithmetic plus
    // compositor-only transform writes — no layout reads, no page-wide
    // style recalculation.
    // ---------------------------------------------------------------
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    type Trace = { el: HTMLElement; fills: HTMLElement[]; top: number; height: number; last: number };
    type Para = { el: HTMLElement; speed: number; top: number; height: number; last: number };
    let traces: Trace[] = [];
    let paras: Para[] = [];
    let vh = window.innerHeight;
    let maxScroll = 1;
    let lastP = -1;

    const measure = () => {
      const sy = window.scrollY;
      vh = window.innerHeight;
      maxScroll = Math.max(1, root.scrollHeight - vh);
      traces = Array.from(document.querySelectorAll<HTMLElement>("[data-trace]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { el, fills: Array.from(el.querySelectorAll<HTMLElement>(".trace-x, .trace-y")), top: r.top + sy, height: r.height, last: -1 };
      });
      paras = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => {
        const r = (el.parentElement || el).getBoundingClientRect();
        return { el, speed: parseFloat(el.dataset.parallax || "0.1"), top: r.top + sy, height: r.height, last: NaN };
      });
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const sy = window.scrollY;
      const p = Math.min(1, sy / maxScroll);
      if (bar && Math.abs(p - lastP) > 0.0005) {
        bar.style.transform = `scaleX(${p.toFixed(4)})`;
        lastP = p;
      }
      // starts when the top hits 85% of the viewport, completes when the bottom reaches 60%
      const start = vh * 0.85;
      const end = vh * 0.6;
      for (const t of traces) {
        const top = t.top - sy;
        const v = Math.min(1, Math.max(0, (start - top) / (t.height + (start - end))));
        if (Math.abs(v - t.last) < 0.002) continue;
        t.last = v;
        for (const f of t.fills) f.style.transform = f.classList.contains("trace-x") ? `scaleX(${v.toFixed(3)})` : `scaleY(${v.toFixed(3)})`;
      }
      if (reduce) return;
      for (const q of paras) {
        const top = q.top - sy;
        if (top + q.height < -200 || top > vh + 200) continue;
        // 0 when the host's centre is mid-viewport
        const y = Math.round((top + q.height / 2 - vh / 2) * q.speed * 2) / 2;
        if (y === q.last) continue;
        q.last = y;
        q.el.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);
    // Re-measure when the page height changes (fonts load, FAQ opens, images arrive…)
    let lastH = root.scrollHeight;
    const ro = new ResizeObserver(() => {
      if (root.scrollHeight !== lastH) {
        lastH = root.scrollHeight;
        remeasure();
      }
    });
    ro.observe(document.body);

    return () => {
      io?.disconnect();
      zoneIo?.disconnect();
      ro.disconnect();
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);
}
