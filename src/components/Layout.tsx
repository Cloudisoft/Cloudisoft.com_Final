import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import useScrollFx from "../hooks/useScrollFx";
import { PAGES } from "../lib/site";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  useScrollFx(pathname);

  // Title per route, and scroll to top / to the #hash on navigation.
  useEffect(() => {
    const meta = PAGES[pathname];
    if (meta) document.title = meta.title;
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-ink text-bone">
      <a href="#main" className="sr-only z-[80] rounded-full bg-bone px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
