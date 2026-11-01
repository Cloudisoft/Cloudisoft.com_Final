import React from "react";
import ReactDOM from "react-dom/client";
import App, { PRERENDERED } from "./App";
// Self-hosted fonts (no render-blocking request to Google; only the latin subset is downloaded)
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/geist/index.css";
import "@fontsource/geist-mono/latin-400.css";
import "@fontsource/geist-mono/latin-500.css";
import "./index.css";

const el = document.getElementById("root") as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pages in PRERENDERED are rendered to HTML at build time (scripts/prerender.mjs) — hydrate them.
const path = window.location.pathname.replace(/\/+$/, "") || "/";
if (el.hasChildNodes() && PRERENDERED.includes(path)) {
  ReactDOM.hydrateRoot(el, app);
} else {
  el.innerHTML = "";
  ReactDOM.createRoot(el).render(app);
}
document.documentElement.removeAttribute("data-route");
