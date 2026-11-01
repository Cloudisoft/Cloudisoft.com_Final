import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Products from "./components/Products";
import AgentsSection from "./components/AgentsSection";
import Process from "./components/Process";
import CloudiCoreSection from "./components/CloudiCoreSection";
import FAQ from "./components/FAQ";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import useScrollFx from "./hooks/useScrollFx";

export default function Home() {
  useScrollFx();
  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-ink text-bone">
      <a href="#main" className="sr-only z-[80] rounded-full bg-bone px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Products />
        <AgentsSection />
        <Process />
        <CloudiCoreSection />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
