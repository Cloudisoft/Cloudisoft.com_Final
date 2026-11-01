import { Link } from "react-router-dom";
import Logo from "./Logo";
import Social from "./Social";
import { CONTACT, LINKS, SERVICES, serviceUrl } from "../lib/site";

export default function Footer() {
  const head = "mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mute";
  const link = "text-bone/80 transition hover:text-sun";
  return (
    <footer className="border-t hairline">
      <div className="section grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
        <div>
          <Link to="/" aria-label="Cloudisoft home">
            <Logo size={40} />
          </Link>
          <p className="mt-5 max-w-xs font-display text-xl leading-snug">
            Automate Intelligence.
            <br />
            <span className="gradient-text">Amplify Growth.</span>
          </p>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-mute">
            Websites, automations, CRM, AI voice agents and secure cloud infrastructure for businesses in the US and India.
          </p>
          <Social className="mt-6" />
        </div>

        <nav aria-label="Company">
          <p className={head}>Company</p>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link to="/" className={link}>Home</Link></li>
            <li><Link to="/about" className={link}>About Us</Link></li>
            <li><Link to="/services" className={link}>Services</Link></li>
            <li><Link to="/pricing" className={link}>Pricing</Link></li>
            <li><Link to="/insights" className={link}>Insights</Link></li>
            <li><Link to="/contact" className={link}>Contact</Link></li>
            <li><a href={LINKS.applyflux} target="_blank" rel="noopener noreferrer" className={link}>ApplyFlux ↗</a></li>
            <li><a href={LINKS.cloudivoice} target="_blank" rel="noopener noreferrer" className={link}>CloudiVoice ↗</a></li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <p className={head}>Services</p>
          <ul className="space-y-2.5 text-[14px]">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to={serviceUrl(s.id)} className={link}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-[14px]">
          <p className={head}>Get in touch</p>
          <ul className="space-y-1.5">
            <li><a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp {CONTACT.whatsapp.display}</a></li>
            <li><a href={CONTACT.phone.tel} className={link}>Call {CONTACT.phone.display}</a></li>
            <li><a href={CONTACT.phone.sms} className={link}>Text {CONTACT.phone.display}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a></li>
          </ul>
          <div className="mt-5 space-y-3 text-[13px] text-mute">
            {CONTACT.offices.map((o) => (
              <address key={o.id} className="not-italic">
                <Link to={o.id === "ahmedabad" ? "/locations/ahmedabad" : "/locations/new-jersey"} className="hover:text-sun">
                  {o.lines.join(", ")}
                </Link>
              </address>
            ))}
          </div>
        </div>
      </div>

      <div className="section flex flex-col gap-3 border-t hairline py-6 text-[12.5px] text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Cloudisoft LLC. All rights reserved.</p>
        <ul className="flex gap-6">
          <li><Link to="/privacy" className="hover:text-bone">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-bone">Terms &amp; Conditions</Link></li>
        </ul>
      </div>
    </footer>
  );
}
