import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ServicesGrid from "../components/ServicesGrid";
import Products from "../components/Products";
import VyomiraSection from "../components/VyomiraSection";
import ReelSection from "../components/ReelSection";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import InsightsSection from "../components/InsightsSection";
import CtaBand from "../components/CtaBand";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <ServicesGrid />
      <ReelSection />
      <Products />
      <VyomiraSection />
      <Process />
      <Pricing />
      <InsightsSection />
      <FAQ />
      <CtaBand />
      <ContactSection />
    </Layout>
  );
}
