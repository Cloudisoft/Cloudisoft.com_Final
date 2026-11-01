import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Products from "../components/Products";
import CtaBand from "../components/CtaBand";
import ContactSection from "../components/ContactSection";
import Social from "../components/Social";
import { ArrowRight } from "../components/Icons";

const PRINCIPLES = [
  { t: "Start small, prove it", d: "We begin with one page, one workflow or one agent, show that it works, then grow from there." },
  { t: "People stay in control", d: "Automations and AI agents hand off to a person whenever a decision needs judgement." },
  { t: "Secure by default", d: "Least-privilege access, encrypted connections and backups are part of every build, not an upsell." },
  { t: "Prices you can see", d: "Published starting prices and fixed quotes. You know the cost before we start." },
];

const FACTS = [
  { k: "2", v: "offices — New Jersey & Ahmedabad" },
  { k: "5", v: "core services, one team" },
  { k: "2", v: "products in production" },
  { k: "11", v: "languages our voice agents speak" },
];

export default function About() {
  return (
    <Layout>
      <PageHero
        crumbs={[{ name: "Home", to: "/" }, { name: "About Us" }]}
        eyebrow="About Cloudisoft"
        title={
          <>
            A small team that builds <span className="gradient-text">software businesses rely on.</span>
          </>
        }
      >
        <p>
          Cloudisoft is a software and AI studio with teams in Hillside, New Jersey and Ahmedabad, India. We design websites,
          automate workflows, set up CRMs, build AI voice agents and run secure cloud infrastructure for growing businesses.
        </p>
      </PageHero>

      <section className="border-t hairline py-24 lg:py-32">
        <div className="section grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="reveal eyebrow">Our story</p>
            <h2 className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
              Two time zones. <span className="text-mute">One way of working.</span>
            </h2>
          </div>
          <div className="space-y-5 text-[16px] leading-relaxed text-bone/70">
            <p className="reveal">
              We started Cloudisoft to give small and mid-sized businesses the kind of software larger companies take for granted —
              without agency overhead or enterprise price tags.
            </p>
            <p className="reveal" style={{ ["--d" as any]: "80ms" }}>
              With one team in the US and one in India, work keeps moving around the clock. Clients in both countries talk directly
              to the people building their project, on WhatsApp, phone or video.
            </p>
            <p className="reveal" style={{ ["--d" as any]: "160ms" }}>
              The tools we kept rebuilding for clients became products of their own:{" "}
              <a className="text-bone underline decoration-amber/60 underline-offset-4" href="https://cloudivoice.cloudisoft.com/" target="_blank" rel="noopener noreferrer">CloudiVoice</a> for AI voice agents and{" "}
              <a className="text-bone underline decoration-amber/60 underline-offset-4" href="https://applyflux.cloudisoft.com/" target="_blank" rel="noopener noreferrer">ApplyFlux</a> for job applications.
            </p>
            <div className="reveal flex flex-wrap items-center gap-5 pt-3" style={{ ["--d" as any]: "240ms" }}>
              <Link to="/services" className="btn-primary">Our services <ArrowRight /></Link>
              <Social />
            </div>
          </div>
        </div>

        <div className="section mt-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-white/[0.08] lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <div key={f.v} className="reveal bg-ink p-7" style={{ ["--d" as any]: `${i * 80}ms` }}>
              <dt className="sr-only">{f.v}</dt>
              <dd className="font-display text-5xl font-semibold gradient-text">{f.k}</dd>
              <dd className="mt-2 text-[13.5px] text-mute">{f.v}</dd>
            </div>
          ))}
        </dl>
        </div>
      </section>

      <section className="border-t hairline py-24 lg:py-32">
        <div className="section">
          <p className="reveal eyebrow">How we think</p>
          <h2 className="reveal mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ ["--d" as any]: "80ms" }}>
            Principles we build by.
          </h2>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <li key={p.t} className="reveal spotlight rounded-2xl border hairline bg-ink-800/50 p-7" style={{ ["--d" as any]: `${i * 90}ms` }}>
                <span className="font-mono text-xs text-amber">0{i + 1}</span>
                <h3 className="mt-8 text-xl font-semibold">{p.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-bone/60">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Products />
      <CtaBand />
      <ContactSection />
    </Layout>
  );
}
