import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import ServiceGfx from "../components/ServiceGfx";
import Process from "../components/Process";
import FAQ from "../components/FAQ";
import CtaBand from "../components/CtaBand";
import ContactSection from "../components/ContactSection";
import { ArrowRight, Check, LinkedInIcon, MailIcon, WhatsApp } from "../components/Icons";
import { CONTACT, SERVICES, SERVICE_DETAILS, SOCIAL, serviceUrl, usd, waLink, type ServiceId } from "../lib/site";

export default function ServicePage({ id }: { id: ServiceId }) {
  const s = SERVICES.find((x) => x.id === id)!;
  const d = SERVICE_DETAILS[id];
  const others = SERVICES.filter((x) => x.id !== id);
  const linkedin = SOCIAL.find((x) => x.label === "LinkedIn")!.href;
  const mail = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry: ${s.name}`)}`;

  return (
    <Layout>
      <PageHero
        eyebrow={`Services / ${s.name}${s.from ? ` · from ${usd(s.from)}` : ""}`}
        title={
          <>
            {d.headline.split(" ").slice(0, -3).join(" ")}{" "}
            <span className="gradient-text">{d.headline.split(" ").slice(-3).join(" ")}</span>
          </>
        }
      >
        <p>{d.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={waLink(`Hi Cloudisoft, I'm interested in ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <WhatsApp /> Get a quote on WhatsApp
          </a>
          <a href={mail} className="btn-secondary">
            <MailIcon /> Email us
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <LinkedInIcon /> Follow on LinkedIn
          </a>
        </div>
      </PageHero>

      <section className="border-t hairline py-24 lg:py-28">
        <div className="section grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal reveal-scale">
            <div className="spotlight aspect-[16/10] overflow-hidden rounded-[22px] border hairline bg-ink-800/50 bg-[radial-gradient(ellipse_at_center,rgba(255,159,28,0.08),transparent_70%)]">
              <div className="float-a h-full w-full">
                <ServiceGfx id={id} />
              </div>
            </div>
          </div>
          <div>
            <p className="reveal eyebrow">What’s included</p>
            <h2 className="reveal mt-5 text-3xl font-semibold leading-tight sm:text-4xl" style={{ ["--d" as any]: "80ms" }}>
              {s.name}, done properly.
            </h2>
            <p className="reveal mt-5 text-[16px] leading-relaxed text-bone/70" style={{ ["--d" as any]: "140ms" }}>{s.desc}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.deliverables.map((x, k) => (
                <li key={x} className="reveal flex items-start gap-2.5 text-[14.5px] text-bone/80" style={{ ["--d" as any]: `${200 + k * 60}ms` }}>
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber/15 text-sun"><Check className="h-3 w-3" /></span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section mt-20">
          <dl className="grid gap-px overflow-hidden rounded-2xl border hairline bg-white/[0.08] sm:grid-cols-3">
            {d.outcomes.map((o, i) => (
              <div key={o.v} className="reveal bg-ink p-7" style={{ ["--d" as any]: `${i * 80}ms` }}>
                <dt className="sr-only">{o.v}</dt>
                <dd className="font-display text-4xl font-semibold gradient-text">{o.k}</dd>
                <dd className="mt-2 text-[13.5px] text-mute">{o.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t hairline py-24 lg:py-28">
        <div className="section grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
          <div>
            <p className="reveal eyebrow">Is this for you?</p>
            <h2 className="reveal mt-5 text-3xl font-semibold leading-tight sm:text-4xl" style={{ ["--d" as any]: "80ms" }}>
              A good fit if…
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {d.goodFit.map((g, i) => (
              <li key={g} className="reveal spotlight rounded-2xl border hairline bg-ink-800/50 p-6 text-[15px] leading-relaxed text-bone/80" style={{ ["--d" as any]: `${i * 80}ms` }}>
                <span className="mb-4 block font-mono text-xs text-amber">0{i + 1}</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <FAQ items={d.faqs} title={`${s.name}: questions`} />

      <section className="border-t hairline py-20">
        <div className="section">
          <p className="reveal eyebrow">Other services</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.id} className="reveal">
                <Link to={serviceUrl(o.id)} className="spotlight group flex items-center justify-between rounded-2xl border hairline bg-ink-800/50 p-5 transition hover:border-amber/40">
                  <span>
                    <span className="block font-medium">{o.name}</span>
                    {o.from && <span className="font-mono text-[11.5px] text-amber">from {usd(o.from)}</span>}
                  </span>
                  <ArrowRight className="h-4 w-4 text-mute transition group-hover:translate-x-1 group-hover:text-sun" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <ContactSection />
    </Layout>
  );
}
