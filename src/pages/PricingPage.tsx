import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import FAQ from "../components/FAQ";
import CtaBand from "../components/CtaBand";
import ContactSection from "../components/ContactSection";
import { PRICING_FAQS } from "../lib/site";

const FACTORS = [
  { t: "Scope", d: "How many pages, workflows, call types or systems are involved." },
  { t: "Integrations", d: "Which tools need connecting — CRM, calendar, WhatsApp, payments, accounting." },
  { t: "Volume", d: "Call minutes, messages or transactions the system will handle each month." },
  { t: "Content & data", d: "Whether we write the content, migrate data or clean existing records." },
];

export default function PricingPage() {
  return (
    <Layout>
      <PageHero
        crumbs={[{ name: "Home", to: "/" }, { name: "Pricing" }]}
        eyebrow="Pricing"
        title={
          <>
            Published starting prices. <span className="gradient-text">Fixed quotes.</span>
          </>
        }
      >
        <p>
          Websites from $200, automations and CRM from $750, AI voice agents from $1,000, and cloud, security and SOC 2 readiness from
          $1,500. You get a fixed written quote before any work begins.
        </p>
      </PageHero>
      <Pricing eyebrow="Starting prices" />
      <section className="border-t hairline py-20 lg:py-24">
        <div className="section">
          <p className="reveal eyebrow">What affects the final price</p>
          <h2 className="reveal mt-5 text-3xl font-semibold sm:text-4xl">Four things decide your quote.</h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FACTORS.map((f, i) => (
              <li key={f.t} className="reveal spotlight rounded-2xl border hairline bg-ink-800/50 p-6" style={{ ["--d" as any]: `${i * 80}ms` }}>
                <span className="font-mono text-xs text-amber">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{f.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-bone/60">{f.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Process />
      <FAQ items={PRICING_FAQS} title="Pricing questions" />
      <CtaBand />
      <ContactSection />
    </Layout>
  );
}
