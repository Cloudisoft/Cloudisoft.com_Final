import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AgentsSection from "./components/AgentsSection";
import CloudiCoreSection from "./components/CloudiCoreSection";
import Pricing from "./components/Pricing";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cloudi-bg to-black text-white">
      <Navbar />
      <main className="pt-20 space-y-32 pb-24">
        <Hero />
        <AgentsSection />
        <CloudiCoreSection />
        <Pricing />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
