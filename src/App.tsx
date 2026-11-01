import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ServicePage from "./pages/ServicePage";
import Insights from "./pages/Insights";
import ArticlePage from "./pages/ArticlePage";
import LocationPage from "./pages/LocationPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import { ARTICLES } from "./content/articles";
import { LOCATIONS } from "./content/locations";
import { SERVICES, SERVICE_DETAILS } from "./lib/site";

export const PRERENDERED = [
  "/",
  "/about",
  "/services",
  ...SERVICES.map((s) => `/services/${SERVICE_DETAILS[s.id].slug}`),
  "/pricing",
  "/contact",
  "/insights",
  ...ARTICLES.map((a) => `/insights/${a.slug}`),
  ...LOCATIONS.map((l) => `/locations/${l.slug}`),
  "/privacy",
  "/terms",
];

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      {SERVICES.map((s) => (
        <Route key={s.id} path={`/services/${SERVICE_DETAILS[s.id].slug}`} element={<ServicePage id={s.id} />} />
      ))}
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/insights" element={<Insights />} />
      {ARTICLES.map((a) => (
        <Route key={a.slug} path={`/insights/${a.slug}`} element={<ArticlePage a={a} />} />
      ))}
      {LOCATIONS.map((l) => (
        <Route key={l.slug} path={`/locations/${l.slug}`} element={<LocationPage loc={l} />} />
      ))}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
