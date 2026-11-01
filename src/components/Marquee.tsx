const items = [
  "Answers inbound calls",
  "Qualifies leads",
  "Books appointments",
  "Screens candidates",
  "Schedules callbacks",
  "Fills job applications",
  "Updates your CRM",
  "Forecasts decisions",
  "Hands off to a human",
];

export default function Marquee() {
  const row = (hidden = false) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-xl text-bone/55 sm:text-2xl">
          {t}
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <circle cx="5" cy="5" r="4" fill="none" stroke="#ff9f1c" strokeWidth="1.5" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-y hairline py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee-track flex w-max">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
