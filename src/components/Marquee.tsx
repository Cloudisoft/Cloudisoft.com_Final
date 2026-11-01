import { SERVICES, TOOLS, usd } from "../lib/site";

const SERVICE_ITEMS = SERVICES.map((s) => (s.from ? `${s.name} · from ${usd(s.from)}` : s.name));

export default function Marquee() {
  const row = (hidden = false, items: string[] = TOOLS, cls = "text-bone/70") => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className={`flex items-center gap-12 whitespace-nowrap font-display text-xl sm:text-2xl ${cls}`}>
          {t}
          <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
            <circle cx="5" cy="5" r="4" fill="#ff9f1c" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="border-y hairline py-7">
      <p className="section mb-5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-mute">We build with the tools you already use</p>
      <div className="marquee-wrap relative space-y-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max">
          {row()}
          {row(true)}
          {row(true)}
          {row(true)}
        </div>
        <div className="marquee-track reverse flex w-max">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="contents">
              {row(k > 0, SERVICE_ITEMS, "text-transparent [-webkit-text-stroke:1px_rgba(255,170,60,0.95)]")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
