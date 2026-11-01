import { useEffect, useRef, useState } from "react";

/** Renders the final value on the server (good for SEO); animates up from 0 when scrolled into view. */
export default function CountUp({ to, prefix = "", duration = 1400 }: { to: number; prefix?: string; duration?: number }) {
  const [v, setV] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already visible: don't flicker
    setV(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toLocaleString("en-US")}
    </span>
  );
}
