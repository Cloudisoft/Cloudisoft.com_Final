import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

// Secondary routes are code-split so the landing page stays light.
const CloudiCore = lazy(() => import("./pages/cloudicore"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Verified = lazy(() => import("./pages/Verified"));

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cloudicore" element={<CloudiCore />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/verified" element={<Verified />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
