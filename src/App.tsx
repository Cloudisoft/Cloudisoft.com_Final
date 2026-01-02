import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AgentsSection from "./components/AgentsSection";
import RapidBuildSection from "./components/RapidBuildSection";
import CloudiCoreSection from "./components/CloudiCoreSection";
import Pricing from "./components/Pricing";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// Pages
import CloudiCore from "./pages/cloudicore";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import Verified from "./pages/Verified";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cloudi-bg to-black text-white">
      <Navbar />
      <main className="pt-20 space-y-32 pb-24">
        <Hero />
        <AgentsSection /> 
        <RapidBuildSection />
        <CloudiCoreSection />
        <Pricing />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* CloudiCore Simulator Page */}
        <Route path="/cloudicore" element={<CloudiCore />} />

        {/* OAuth Redirect Page (Google + Microsoft + Email verification) */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* After Email Verification Redirect */}
        <Route path="/verified" element={<Verified />} />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
