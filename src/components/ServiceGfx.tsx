import { useId } from "react";
import type { ServiceId } from "../lib/site";

/* Small looping motion graphics, one per service. Pure SVG + CSS/SMIL, no libraries. */

const AMBER = "#ff9f1c";
const EMBER = "#ff5a1f";
const SUN = "#ffd93d";
const LINE = "rgba(244,239,230,0.14)";
const DIM = "rgba(244,239,230,0.07)";

const d = (ms: number) => ({ ["--i" as any]: `${ms}ms` });

function WebsiteGfx() {
  return (
    <svg viewBox="0 0 320 200" className="gfx h-full w-full" aria-hidden="true">
      <rect x="20" y="16" width="280" height="172" rx="12" fill="rgba(18,10,39,0.9)" stroke={LINE} />
      <path d="M20 40h280" stroke={LINE} />
      {[34, 46, 58].map((x) => (
        <circle key={x} cx={x} cy="28" r="3.2" fill={DIM} />
      ))}
      <rect x="84" y="22" width="150" height="12" rx="6" fill={DIM} />
      <text x="96" y="31" className="gfx-mono" fontSize="7" fill="rgba(244,239,230,0.45)">yourbusiness.com</text>

      <rect className="gfx-build" style={d(0)} x="36" y="54" width="120" height="14" rx="4" fill={AMBER} />
      <rect className="gfx-build" style={d(250)} x="36" y="76" width="160" height="6" rx="3" fill="rgba(244,239,230,0.35)" />
      <rect className="gfx-build" style={d(400)} x="36" y="88" width="130" height="6" rx="3" fill="rgba(244,239,230,0.22)" />
      <rect className="gfx-build" style={d(600)} x="36" y="104" width="54" height="16" rx="8" fill={EMBER} />
      <rect className="gfx-build" style={d(450)} x="210" y="54" width="74" height="66" rx="8" fill="url(#web-img)" />
      {[0, 1, 2].map((i) => (
        <rect key={i} className="gfx-build" style={d(800 + i * 150)} x={36 + i * 84} y="134" width="76" height="40" rx="6" fill={DIM} stroke={LINE} />
      ))}
      <defs>
        <linearGradient id="web-img" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={EMBER} stopOpacity=".7" />
          <stop offset="1" stopColor={SUN} stopOpacity=".5" />
        </linearGradient>
      </defs>
      {/* cursor */}
      <g>
        <path d="M0 0l0 13 3.6-3.2 2.6 5.6 2.2-1-2.6-5.4 4.8-.2Z" fill="#f4efe6" />
        <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;0.35;0.35;0.7;1;1" keyTimes="0;0.25;0.4;0.65;0.85;1" calcMode="linear" path="M250 170 L 70 110 L 240 90 L 250 170" />
      </g>
    </svg>
  );
}

function AutomationGfx() {
  const paths = [
    "M64 60 C 110 60, 110 100, 160 100",
    "M64 140 C 110 140, 110 100, 160 100",
    "M160 100 C 210 100, 210 50, 256 50",
    "M160 100 L 256 100",
    "M160 100 C 210 100, 210 150, 256 150",
  ];
  const nodes = [
    { x: 64, y: 60, t: "form" },
    { x: 64, y: 140, t: "email" },
    { x: 256, y: 50, t: "crm" },
    { x: 256, y: 100, t: "sheet" },
    { x: 256, y: 150, t: "invoice" },
  ];
  return (
    <svg viewBox="0 0 320 200" className="gfx h-full w-full" aria-hidden="true">
      {paths.map((p, i) => (
        <path key={i} id={`auto-p${i}`} d={p} fill="none" stroke={LINE} strokeWidth="1.5" />
      ))}
      {paths.map((p, i) => (
        <circle key={`d${i}`} r="3.2" fill={i < 2 ? SUN : AMBER}>
          <animateMotion dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={p} />
        </circle>
      ))}
      {nodes.map((n) => (
        <g key={n.t}>
          <rect x={n.x - 26} y={n.y - 13} width="52" height="26" rx="8" fill="rgba(18,10,39,0.95)" stroke={LINE} />
          <text x={n.x} y={n.y + 3} textAnchor="middle" className="gfx-mono" fontSize="8.5" fill="rgba(244,239,230,0.7)">
            {n.t}
          </text>
        </g>
      ))}
      <circle cx="160" cy="100" r="24" className="gfx-pulse" fill="none" stroke={AMBER} />
      <circle cx="160" cy="100" r="20" fill="url(#auto-core)" />
      <text x="160" y="104" textAnchor="middle" className="gfx-mono" fontSize="10" fontWeight="600" fill="#0b031c">AI</text>
      <defs>
        <linearGradient id="auto-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={EMBER} />
          <stop offset="1" stopColor={SUN} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CrmGfx() {
  const cols = ["New", "Qualified", "Won"];
  return (
    <svg viewBox="0 0 320 200" className="gfx h-full w-full" aria-hidden="true">
      {cols.map((c, i) => (
        <g key={c} transform={`translate(${24 + i * 96} 20)`}>
          <rect width="84" height="164" rx="10" fill="rgba(18,10,39,0.85)" stroke={LINE} />
          <text x="10" y="18" className="gfx-mono" fontSize="8" fill="rgba(244,239,230,0.5)">
            {c.toUpperCase()}
          </text>
          <circle cx="72" cy="15" r="3" fill={i === 2 ? SUN : DIM} />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(8 ${30 + k * 40 + (i === 1 ? 40 : 0)})`} opacity={i === 1 && k === 2 ? 0 : 1}>
              <rect width="68" height="32" rx="6" fill={DIM} stroke={LINE} />
              <rect x="8" y="8" width="34" height="4" rx="2" fill="rgba(244,239,230,0.3)" />
              <rect x="8" y="18" width="48" height="4" rx="2" fill="rgba(244,239,230,0.14)" />
            </g>
          ))}
        </g>
      ))}
      {/* the deal that moves through the pipeline */}
      <g className="crm-move">
        <rect x="32" y="50" width="68" height="32" rx="6" fill="rgba(255,159,28,0.14)" stroke={AMBER} />
        <rect x="40" y="58" width="34" height="4" rx="2" fill={SUN} />
        <rect x="40" y="68" width="48" height="4" rx="2" fill="rgba(255,217,61,0.45)" />
      </g>
    </svg>
  );
}

function VoiceGfx() {
  const bars = Array.from({ length: 11 });
  const core = `voice-core-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 320 200" className="gfx h-full w-full" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="160" cy="100" r="30" fill="none" stroke={AMBER} className="gfx-ring" style={d(i * 700)} />
      ))}
      <circle cx="160" cy="100" r="28" fill={`url(#${core})`} />
      <path d="M150 88h6l2.6 6.8-3.4 2.2a17 17 0 0 0 8.4 8.4l2.2-3.4 6.8 2.6v6a3 3 0 0 1-3.3 3A26 26 0 0 1 147 91.3a3 3 0 0 1 3-3.3Z" fill="#0b031c" />
      {bars.map((_, i) => (
        <rect key={`l${i}`} className="gfx-eq" style={d(i * 90)} x={30 + i * 8} y="70" width="4" height="60" rx="2" fill={i % 3 ? AMBER : SUN} opacity={0.35 + (i / bars.length) * 0.6} />
      ))}
      {bars.map((_, i) => (
        <rect key={`r${i}`} className="gfx-eq" style={d(500 + i * 90)} x={206 + i * 8} y="70" width="4" height="60" rx="2" fill="#f4efe6" opacity={0.95 - (i / bars.length) * 0.6} />
      ))}
      <defs>
        <linearGradient id={core} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={EMBER} />
          <stop offset="1" stopColor={SUN} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CloudGfx() {
  const shield = "M160 46 L196 60 V98 C196 124 180 142 160 152 C140 142 124 124 124 98 V60 Z";
  return (
    <svg viewBox="0 0 320 200" className="gfx h-full w-full" aria-hidden="true">
      <ellipse cx="160" cy="100" rx="118" ry="70" fill="none" stroke={LINE} strokeDasharray="3 5" />
      <ellipse cx="160" cy="100" rx="84" ry="50" fill="none" stroke={DIM} />
      <g className="gfx-orbit">
        <circle cx="278" cy="100" r="5" fill={SUN} />
        <circle cx="42" cy="100" r="4" fill={EMBER} />
      </g>
      <g className="gfx-orbit gfx-orbit-rev">
        <circle cx="244" cy="100" r="3.5" fill={AMBER} />
      </g>
      <defs>
        <clipPath id="shield-clip">
          <path d={shield} />
        </clipPath>
        <linearGradient id="shield-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={AMBER} stopOpacity=".28" />
          <stop offset="1" stopColor={EMBER} stopOpacity=".06" />
        </linearGradient>
      </defs>
      <path d={shield} fill="url(#shield-g)" stroke={AMBER} strokeWidth="1.6" />
      <g clipPath="url(#shield-clip)">
        <rect className="gfx-scan" x="120" y="40" width="80" height="10" fill={SUN} opacity=".45" />
      </g>
      <path d="M147 98 l9 9 l17 -19" fill="none" stroke={SUN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="gfx-check" pathLength={1} />
      {[
        { x: 30, y: 30, t: "SOC 2" },
        { x: 236, y: 30, t: "MFA" },
        { x: 236, y: 158, t: "BACKUPS" },
        { x: 30, y: 158, t: "LOGGING" },
      ].map((b, i) => (
        <g key={b.t} className="gfx-badge" style={d(i * 600)}>
          <rect x={b.x} y={b.y} width="58" height="18" rx="9" fill="rgba(18,10,39,0.95)" stroke={LINE} />
          <circle cx={b.x + 10} cy={b.y + 9} r="3" fill={SUN} />
          <text x={b.x + 17} y={b.y + 12} className="gfx-mono" fontSize="7" fill="rgba(244,239,230,0.75)">
            {b.t}
          </text>
        </g>
      ))}
    </svg>
  );
}

const MAP: Record<ServiceId, () => JSX.Element> = {
  web: WebsiteGfx,
  automation: AutomationGfx,
  crm: CrmGfx,
  voice: VoiceGfx,
  cloud: CloudGfx,
};

export default function ServiceGfx({ id }: { id: ServiceId }) {
  const G = MAP[id];
  return <G />;
}
