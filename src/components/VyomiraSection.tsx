import { useId } from "react";
import { LINKS } from "../lib/site";
import { ArrowUpRight, Check } from "./Icons";

const RASHIS = ["MESHA", "VRISHABHA", "MITHUNA", "KARKA", "SIMHA", "KANYA", "TULA", "VRISHCHIKA", "DHANU", "MAKARA", "KUMBHA", "MEENA"];

// Label positions for the 12 houses of a North Indian chart in a 200×200 box (house 1 at the top).
const HOUSES: [number, number][] = [
  [100, 58], [56, 28], [27, 58], [58, 100], [27, 142], [56, 172],
  [100, 142], [144, 172], [173, 142], [142, 100], [173, 58], [144, 28],
];
// Illustrative placements (not anyone's real chart).
const PLANETS: { h: number; g: string; c: string }[] = [
  { h: 0, g: "ASC", c: "#ffd93d" },
  { h: 1, g: "Mo", c: "#f4efe6" },
  { h: 3, g: "Ju", c: "#ffd93d" },
  { h: 4, g: "Ra", c: "#c4b5fd" },
  { h: 6, g: "Sa", c: "#a5b4fc" },
  { h: 8, g: "Ve", c: "#fbcfe8" },
  { h: 9, g: "Su", c: "#ff9f1c" },
  { h: 9, g: "Me", c: "#86efac" },
  { h: 10, g: "Ke", c: "#c4b5fd" },
  { h: 11, g: "Ma", c: "#ff5a1f" },
];

// Deterministic star field
const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 61 + 17) % 400,
  y: (i * 97 + 31) % 400,
  r: [0.6, 0.9, 1.3][i % 3],
  d: (i * 0.37) % 4,
}));

/** Animated North Indian Kundli with a rotating zodiac ring. */
export function KundliGfx({ compact = false }: { compact?: boolean }) {
  const planetsByHouse = HOUSES.map((_, h) => PLANETS.filter((p) => p.h === h));
  const uid = useId().replace(/[^a-zA-Z0-9]/g, ""); // unique per instance: the chart appears twice on the home page
  const glow = `vy-glow-${uid}`, line = `vy-line-${uid}`, ring = `vy-ring-${uid}`;
  return (
    <svg viewBox="0 0 400 400" className="gfx h-full w-full" role="img" aria-label="Animated Vedic birth chart (illustrative)">
      <defs>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#7c3aed" stopOpacity=".35" />
          <stop offset=".7" stopColor="#7c3aed" stopOpacity=".06" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={line} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#ff9f1c" />
        </linearGradient>
        <path id={ring} d="M200 200 m-176 0 a176 176 0 1 1 352 0 a176 176 0 1 1 -352 0" />
      </defs>

      <circle cx="200" cy="200" r="200" fill={`url(#${glow})`} />
      {STARS.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f4efe6" className="twinkle" style={{ ["--i" as any]: `${s.d}s` }} />
      ))}

      {/* zodiac ring */}
      <g className="gfx-orbit" style={{ animationDuration: "80s", transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(196,181,253,0.25)" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="162" fill="none" stroke="rgba(196,181,253,0.18)" />
        {!compact && (
          <text className="gfx-mono" fontSize="9.5" letterSpacing="3" fill="rgba(196,181,253,0.75)">
            <textPath href={`#${ring}`}>{RASHIS.join("  ·  ")}  ·</textPath>
          </text>
        )}
        <circle cx="390" cy="200" r="4" fill="#ffd93d" />
        <circle cx="10" cy="200" r="3" fill="#c4b5fd" />
      </g>

      {/* the chart */}
      <g transform="translate(100 100)">
        <rect x="0" y="0" width="200" height="200" rx="6" fill="rgba(18,10,39,0.88)" stroke="rgba(196,181,253,0.35)" />
        {[
          "M0 0 L200 200",
          "M200 0 L0 200",
          "M100 0 L200 100 L100 200 L0 100 Z",
        ].map((d) => (
          <path key={d} d={d} className="chart-path" pathLength={1} fill="none" stroke={`url(#${line})`} strokeWidth="1.4" />
        ))}
        {HOUSES.map(([x, y], h) => (
          <g key={h}>
            <text x={x} y={y - 9} textAnchor="middle" className="gfx-mono" fontSize="7" fill="rgba(244,239,230,0.35)">
              {h + 1}
            </text>
            {planetsByHouse[h].map((p, k) => (
              <text
                key={p.g}
                x={x + (planetsByHouse[h].length > 1 ? (k - 0.5) * 18 : 0)}
                y={y + 5}
                textAnchor="middle"
                className="gfx-mono planet-glow"
                fontSize={p.g === "ASC" ? 9 : 11}
                fontWeight="600"
                fill={p.c}
                style={{ ["--i" as any]: `${PLANETS.indexOf(p) * 0.45}s` }}
              >
                {p.g}
              </text>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

const FEATURES = [
  { t: "Computed from the real sky", d: "Planet positions from an astronomical ephemeris, converted with the Lahiri ayanamsa from your exact birth moment." },
  { t: "Your full Kundli, free", d: "Lagna, houses, Nakshatra, Navamsa (D9) and Dashamsa (D10) — in North or South Indian style." },
  { t: "Vimshottari dasha timeline", d: "See which planetary period you are in now, and what comes next." },
  { t: "AURA shows its work", d: "An AI guide that explains your chart in plain language and cites the placements behind every answer — it can’t invent a planet, yoga or date." },
];

/** Home-page feature for Vyomira, Cloudisoft's Vedic astrology product. */
export default function VyomiraSection() {
  return (
    <section id="vyomira" aria-labelledby="vyomira-title" className="relative overflow-hidden border-t hairline py-28 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div data-parallax="0.18" className="absolute inset-0">
          <div className="glow left-[-12%] top-[10%] h-[520px] w-[520px] bg-[#7c3aed]/20" />
          <div className="glow right-[-8%] bottom-[-10%] h-[440px] w-[440px] bg-[#4338ca]/15" />
        </div>
      </div>

      <div className="section relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <p className="reveal eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-[#c4b5fd]/70" />
            A Cloudisoft product · Vyomira
          </p>
          <h2 id="vyomira-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ ["--d" as any]: "80ms" }}>
            Your universe.{" "}
            <span className="bg-[linear-gradient(90deg,#c4b5fd,#f0abfc_45%,#ffd93d)] bg-clip-text text-transparent">Your story.</span>
          </h2>
          <p className="reveal mt-6 max-w-xl text-[16.5px] leading-relaxed text-bone/70" style={{ ["--d" as any]: "160ms" }}>
            Vyomira is our Vedic astrology platform: transparent birth charts calculated from real astronomy, planetary periods you can
            follow, and an AI guide that explains your chart without making things up.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <li
                key={f.t}
                className="reveal spotlight rounded-2xl border border-[#c4b5fd]/15 bg-[#1a1233]/60 p-5"
                style={{ ["--d" as any]: `${200 + i * 80}ms` }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#7c3aed]/25 text-[#ddd6fe]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold">{f.t}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-bone/60">{f.d}</p>
              </li>
            ))}
          </ul>

          <div className="reveal mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as any]: "520ms" }}>
            <a
              href={LINKS.vyomira}
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-ink shadow-[0_10px_30px_-12px_rgba(167,139,250,0.7)] transition hover:-translate-y-px"
              style={{ background: "linear-gradient(90deg,#c4b5fd,#f0abfc 50%,#ffd93d)" }}
            >
              Get your free Kundli <ArrowUpRight />
            </a>
            <a href={LINKS.vyomira} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Visit vyomira.cloudisoft.com
            </a>
          </div>
        </div>

        <div className="reveal reveal-scale relative mx-auto w-full max-w-[520px]" data-trace>
          <div className="float-c aspect-square">
            <KundliGfx />
          </div>
          <p className="mt-2 text-center font-mono text-[10.5px] text-mute/70">Illustrative chart · not a real person</p>
        </div>
      </div>
    </section>
  );
}
