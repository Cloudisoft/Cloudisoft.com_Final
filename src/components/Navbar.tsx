import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { ArrowUpRight } from "./Icons";
import { NAV } from "../lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

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

  const desktop = "group relative inline-flex items-center gap-1 py-2 transition-colors hover:text-bone";
  const underline = (on: boolean) =>
    `absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[linear-gradient(90deg,#ff4d1a,#ffd93d)] transition-transform duration-300 ${
      on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b hairline bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="section flex h-[68px] items-center justify-between gap-6">
        <Link to="/" aria-label="Cloudisoft home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 text-[14px] text-mute lg:flex">
          {NAV.map((l) => (
            <li key={l.label}>
              {l.to ? (
                <NavLink to={l.to} end className={({ isActive }) => `${desktop} ${isActive ? "text-bone" : ""}`}>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span aria-hidden="true" className={underline(isActive)} />
                    </>
                  )}
                </NavLink>
              ) : (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={desktop}>
                  {l.label}
                  <ArrowUpRight className="h-3 w-3 opacity-40 transition group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100" />
                  <span aria-hidden="true" className={underline(false)} />
                </a>
              )}
            </li>
          ))}
        </ul>

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
      </nav>

      <div id="mobile-nav" hidden={!open} className="section h-[calc(100dvh-68px)] overflow-y-auto pb-10 pt-4 lg:hidden">
        <ul className="divide-y divide-white/[0.07] border-y hairline">
          {NAV.map((l, i) => (
            <li key={l.label} className="chip-in" style={{ animationDelay: `${i * 50}ms` }}>
              {l.to ? (
                <NavLink to={l.to} end className={({ isActive }) => `flex items-center justify-between py-4 font-display text-2xl ${isActive ? "text-sun" : ""}`}>
                  {l.label}
                </NavLink>
              ) : (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-4 font-display text-2xl">
                  {l.label}
                  <ArrowUpRight className="h-5 w-5 text-mute" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
