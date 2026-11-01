import { SOCIAL } from "../lib/site";
import { InstagramIcon, LinkedInIcon, MailIcon } from "./Icons";

const ICONS = { Instagram: InstagramIcon, LinkedIn: LinkedInIcon, Email: MailIcon } as const;

export default function Social({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {SOCIAL.map((s) => {
        const Icon = ICONS[s.label as keyof typeof ICONS];
        const external = s.href.startsWith("http");
        return (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={`${s.label}: ${s.handle}`}
              title={s.handle}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="grid h-10 w-10 place-items-center rounded-full border hairline text-mute transition hover:-translate-y-0.5 hover:border-amber/60 hover:text-sun"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
