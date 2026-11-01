import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ServicePage from "./pages/ServicePage";
import { SERVICES, SERVICE_DETAILS } from "./lib/site";

export const PRERENDERED = [
  "/",
  "/about",
  "/services",
  ...SERVICES.map((s) => `/services/${SERVICE_DETAILS[s.id].slug}`),
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
