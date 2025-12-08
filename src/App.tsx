import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AgentsSection from "./components/AgentsSection";
import CloudiCoreSection from "./components/CloudiCoreSection";
import Pricing from "./components/Pricing";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CloudiCore from "./pages/cloudicore";

// Google OAuth Pages
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";

function Home() {
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* CloudiCore Page */}
        <Route path="/cloudicore" element={<CloudiCore />} />

        {/* Google Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Google OAuth Redirect */}
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
