import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import ContactSection from "../components/ContactSection";
import FAQ from "../components/FAQ";
import { FAQS } from "../lib/site";

export default function ContactPage() {
  return (
    <Layout>
      <PageHero
        crumbs={[{ name: "Home", to: "/" }, { name: "Contact" }]}
        eyebrow="Contact Cloudisoft"
        title={
          <>
            WhatsApp, call, text or email — <span className="gradient-text">we reply fast.</span>
          </>
        }
      >
        <p>
          WhatsApp +91 88668 19132 · Call or text +1 (484) 990-7692 · connect@cloudisoft.com. Offices in Ahmedabad, India and Hillside, New
          Jersey.
        </p>
      </PageHero>
      <ContactSection />
      <FAQ items={FAQS.filter((f) => /cost|contact|based|long/i.test(f.q))} title="Before you get in touch" />
    </Layout>
  );
}
