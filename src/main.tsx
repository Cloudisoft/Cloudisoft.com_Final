import React from "react";
import ReactDOM from "react-dom/client";
import App, { PRERENDERED } from "./App";
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
