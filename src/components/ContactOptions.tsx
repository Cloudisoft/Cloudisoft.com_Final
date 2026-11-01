import { CONTACT } from "../lib/site";
import { MailIcon, MessageIcon, PhoneIcon, WhatsApp } from "./Icons";

export const CHANNELS = [
  { label: "WhatsApp", value: CONTACT.whatsapp.display, href: CONTACT.whatsapp.href, Icon: WhatsApp, external: true, accent: true },
  { label: "Call", value: CONTACT.phone.display, href: CONTACT.phone.tel, Icon: PhoneIcon },
  { label: "Text message", value: CONTACT.phone.display, href: CONTACT.phone.sms, Icon: MessageIcon },
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, Icon: MailIcon },
];

export default function ContactOptions() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {CHANNELS.map(({ label, value, href, Icon, external, accent }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="spotlight group flex items-center gap-4 rounded-2xl border hairline bg-ink-800/50 p-4 transition hover:-translate-y-0.5 hover:border-amber/40"
          >
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${
                accent ? "bg-[#25D366]/15 text-[#25D366]" : "bg-amber/10 text-amber group-hover:text-sun"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">{label}</span>
              <span className="mt-0.5 block break-all text-[14px] text-bone">{value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
