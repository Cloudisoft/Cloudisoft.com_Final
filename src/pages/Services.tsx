import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import ServiceGfx from "../components/ServiceGfx";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import FAQ from "../components/FAQ";
import CtaBand from "../components/CtaBand";
import ContactSection from "../components/ContactSection";
import { Check, ArrowRight } from "../components/Icons";
import { Link } from "react-router-dom";
import { SERVICES, serviceUrl, usd } from "../lib/site";

export default function Services() {
  return (
    <Layout>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Websites, automations, CRM, <span className="gradient-text">AI voice and cloud.</span>
          </>
        }
      >
        <p>One team for the software your business runs on — with clear starting prices and a fixed quote before we begin.</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-block rounded-full border hairline px-4 py-2 text-[13px] text-bone/80 transition hover:border-amber/50 hover:text-sun">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {SERVICES.map((s, i) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="border-t hairline py-24 lg:py-28">
          <div className="section grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className={`reveal reveal-scale ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="spotlight aspect-[16/10] overflow-hidden rounded-[22px] border hairline bg-ink-800/50 bg-[radial-gradient(ellipse_at_center,rgba(255,159,28,0.08),transparent_70%)]">
                <ServiceGfx id={s.id} />
              </div>
            </div>
            <div>
              <p className="reveal font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
                0{i + 1}
                {s.from ? ` · from ${usd(s.from)}` : " · quoted with automations"}
              </p>
              <h2 id={`${s.id}-title`} className="reveal mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
                {s.name}
              </h2>
              <p className="reveal mt-5 text-[16px] leading-relaxed text-bone/70" style={{ ["--d" as any]: "140ms" }}>
                {s.desc}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {s.deliverables.map((d, k) => (
                  <li key={d} className="reveal flex items-start gap-2.5 text-[14.5px] text-bone/80" style={{ ["--d" as any]: `${200 + k * 60}ms` }}>
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber/15 text-sun">
                      <Check className="h-3 w-3" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="reveal mt-9 flex flex-wrap gap-3" style={{ ["--d" as any]: "360ms" }}>
                <Link to={serviceUrl(s.id)} className="btn-primary">
                  Explore {s.name.toLowerCase()} <ArrowRight />
                </Link>
                <a href="#contact" className="btn-secondary">Get a quote</a>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Pricing />
      <Process />
      <FAQ />
      <CtaBand />
      <ContactSection />
    </Layout>
  );
}
