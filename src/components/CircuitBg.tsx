/** Circuit traces with light pulses running along them — a nod to the lines in the logo. */
const TRACES = [
  "M-20 120 H180 L220 160 H420 L460 120 H700",
  "M-20 220 H120 L160 260 H360",
  "M-20 340 H240 L290 300 H520 L560 340 H820",
  "M-20 460 H160 L200 420 H380",
  "M-20 560 H300 L340 520 H600",
  "M900 80 H1100 L1140 120 H1500",
  "M1000 620 H1200 L1240 580 H1500",
];
const NODES: [number, number][] = [
  [700, 120], [360, 260], [820, 340], [380, 420], [600, 520], [900, 80], [1000, 620],
];

export default function CircuitBg({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="cb-pulse" x1="0" x2="1">
          <stop offset="0" stopColor="#ff5a1f" />
          <stop offset="1" stopColor="#ffd93d" />
        </linearGradient>
        <radialGradient id="cb-fade" cx="30%" cy="40%" r="75%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="cb-mask">
          <rect width="1440" height="700" fill="url(#cb-fade)" />
        </mask>
      </defs>
      <g mask="url(#cb-mask)">
        {TRACES.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(244,239,230,0.07)" strokeWidth="1.2" />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="url(#cb-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              className="circuit-pulse"
              style={{ ["--dur" as any]: `${5 + (i % 3) * 1.6}s`, ["--i" as any]: `${i * -900}ms` }}
            />
          </g>
        ))}
        {NODES.map(([x, y], i) => (
          <g key={i} className="circuit-node" style={{ ["--i" as any]: `${i * 400}ms` }}>
            <circle cx={x} cy={y} r="7" fill="none" stroke="rgba(255,159,28,0.35)" />
            <circle cx={x} cy={y} r="3" fill="#ff9f1c" />
          </g>
        ))}
      </g>
    </svg>
  );
}
