import { useState } from "react";
import { CONTACT } from "../lib/site";
import { ArrowUpRight, MapPin } from "./Icons";

const embed = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
const open = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function OfficeMap() {
  const [active, setActive] = useState(0);
  const o = CONTACT.offices[active];

  return (
    <div className="overflow-hidden rounded-2xl border hairline bg-ink-800/60">
      <div role="tablist" aria-label="Offices" className="grid grid-cols-2 border-b hairline">
        {CONTACT.offices.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`relative px-5 py-4 text-left transition ${i === active ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"}`}
          >
            <span className={`flex items-center gap-2 text-[14px] font-medium ${i === active ? "text-bone" : "text-mute"}`}>
              <MapPin className={`h-4 w-4 ${i === active ? "text-amber" : ""}`} /> {x.city}
            </span>
            <span className="mt-1 block truncate text-[12px] text-mute">{x.lines[0]}</span>
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[linear-gradient(90deg,#ff4d1a,#ffd93d)] transition-transform duration-500 ${
                i === active ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-[16/11] sm:aspect-[16/9]">
        <iframe
          key={o.id}
          title={`Map of the Cloudisoft office in ${o.city}`}
          src={embed(o.query)}
          className="map-dark absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <address className="text-[13.5px] not-italic leading-relaxed text-bone/80">{o.lines.join(", ")}</address>
        <a
          href={open(o.query)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-amber hover:text-sun"
        >
          Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
