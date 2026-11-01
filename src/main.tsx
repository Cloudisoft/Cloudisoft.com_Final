import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const el = document.getElementById("root") as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The home page is prerendered at build time (see scripts/prerender.mjs) — hydrate it.
// Every other route starts from a clean root.
if (el.hasChildNodes() && window.location.pathname === "/") {
  ReactDOM.hydrateRoot(el, app);
} else {
  el.innerHTML = "";
  ReactDOM.createRoot(el).render(app);
}
document.documentElement.removeAttribute("data-route");
