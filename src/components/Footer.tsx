import Logo from "./Logo";
import { CONTACT, PRODUCTS } from "../lib/site";

export default function Footer() {
  const head = "mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mute";
  return (
    <footer className="border-t hairline">
      <div className="section grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <a href="/" aria-label="Cloudisoft home">
            <Logo size={40} />
          </a>
          <p className="mt-5 max-w-xs font-display text-xl leading-snug">
            Automate Intelligence.
            <br />
            <span className="gradient-text">Amplify Growth.</span>
          </p>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-mute">
            Custom AI agents, voice automation and decision tools for businesses in the US and India.
          </p>
        </div>

        <nav aria-label="Products">
          <p className={head}>Products</p>
          <ul className="space-y-2.5 text-[14px]">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-bone/80 hover:text-sun">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className={head}>Company</p>
          <ul className="space-y-2.5 text-[14px]">
            {[
              ["What we build", "/#build"],
              ["How we work", "/#process"],
              ["FAQ", "/#faq"],
              ["Contact", "/#contact"],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} className="text-bone/80 hover:text-sun">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-[14px]">
          <p className={head}>Get in touch</p>
          <a href={`mailto:${CONTACT.email}`} className="text-bone/80 hover:text-sun">
            {CONTACT.email}
          </a>
          <ul className="mt-2 space-y-1">
            {CONTACT.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="text-bone/80 hover:text-sun">
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-3 text-[13px] text-mute">
            {CONTACT.offices.map((o) => (
              <address key={o.city} className="not-italic">
                {o.lines.join(", ")}
              </address>
            ))}
          </div>
        </div>
      </div>

      <div className="section flex flex-col gap-2 border-t hairline py-6 text-[12.5px] text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Cloudisoft. All rights reserved.</p>
        <p className="font-mono text-[11px]">Hillside, NJ · Ahmedabad, IN</p>
      </div>
    </footer>
  );
}
