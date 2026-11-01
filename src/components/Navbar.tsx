import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ArrowUpRight } from "./Icons";
import { NAV } from "../lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b hairline bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="section flex h-[68px] items-center justify-between gap-6">
        <a href="/" aria-label="Cloudisoft home" className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-7 text-[13.5px] text-mute lg:flex">
          {NAV.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center gap-1 transition-colors hover:text-bone"
              >
                {l.label}
                {l.external && (
                  <ArrowUpRight className="h-3 w-3 opacity-40 transition group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Talk to us
          </a>
          <button
            type="button"
            className="relative h-10 w-10 rounded-full border hairline lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-bone transition ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-bone transition ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="section h-[calc(100dvh-68px)] overflow-y-auto pb-10 pt-4 lg:hidden"
      >
        <ul className="divide-y divide-white/[0.07] border-y hairline">
          {NAV.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center justify-between py-4 font-display text-2xl"
              >
                {l.label}
                {l.external && <ArrowUpRight className="h-5 w-5 text-mute" />}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">
          Talk to us
        </a>
      </div>
    </header>
  );
}
