import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import ContactOptions from "../components/ContactOptions";
import FAQ from "../components/FAQ";
import CtaBand from "../components/CtaBand";
import ServiceGfx from "../components/ServiceGfx";
import { ArrowRight, Check, MapPin } from "../components/Icons";
import { CONTACT, SERVICES, serviceUrl, usd } from "../lib/site";
import type { Location } from "../content/locations";

const mapEmbed = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
const mapOpen = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function LocationPage({ loc }: { loc: Location }) {
  const office = CONTACT.offices.find((o) => o.id === loc.officeId)!;
  return (
    <Layout>
      <PageHero
        crumbs={[{ name: "Home", to: "/" }, { name: "Locations" }, { name: loc.city }]}
        eyebrow={`Cloudisoft · ${loc.region}`}
        title={
          <>
            {loc.headline.split(" — ")[0]} <span className="gradient-text">— {loc.headline.split(" — ")[1]}</span>
          </>
        }
      >
        <p>{loc.intro}</p>
      </PageHero>

      <section className="border-t hairline py-20 lg:py-24">
        <div className="section grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="reveal eyebrow">Why work with us here</p>
            <ul className="mt-6 space-y-4">
              {loc.points.map((p, i) => (
                <li key={p} className="reveal flex items-start gap-3 text-[16px] text-bone/85" style={{ ["--d" as any]: `${i * 80}ms` }}>
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber/15 text-sun"><Check className="h-3.5 w-3.5" /></span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="reveal mt-10">
              <ContactOptions />
            </div>
          </div>
          <div className="reveal reveal-scale overflow-hidden rounded-2xl border hairline bg-ink-800/60">
            <div className="relative aspect-[4/3]">
              <iframe
                title={`Map of the Cloudisoft office in ${office.city}`}
                src={mapEmbed(office.query)}
                className="map-dark absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <address className="flex items-start gap-2 text-[14px] not-italic text-bone/85">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" /> {office.lines.join(", ")}
              </address>
              <a href={mapOpen(office.query)} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-amber hover:text-sun">
                Directions ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t hairline py-20 lg:py-24">
        <div className="section">
          <p className="reveal eyebrow">Services in {loc.city}</p>
          <h2 className="reveal mt-5 text-3xl font-semibold sm:text-4xl">Everything we build, from {loc.city}.</h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map((s, i) => (
              <li key={s.id} className="reveal" style={{ ["--d" as any]: `${i * 70}ms` }}>
                <Link to={serviceUrl(s.id)} className="spotlight tilt group flex h-full flex-col overflow-hidden rounded-2xl border hairline bg-ink-800/50 hover:border-amber/30">
                  <div className="aspect-[16/10] border-b hairline">
                    <ServiceGfx id={s.id} />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-semibold">{s.name}</h3>
                    <p className="mt-1 font-mono text-[11.5px] text-amber">{s.from ? `from ${usd(s.from)}` : "quoted with automations"}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] text-mute group-hover:text-sun">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ items={loc.faqs} title={`Cloudisoft in ${loc.city}`} />
      <CtaBand />
    </Layout>
  );
}
