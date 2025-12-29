const links = [
  { label: "Home", href: "#home" },
  { label: "AI Agents", href: "#agents" },
  { label: "CloudiCore", href: "https://cloudicore.cloudisoft.com" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 bg-black/60 backdrop-blur border-b border-slate-800 z-50">
      <nav className="section flex justify-between items-center h-16">
        <a className="text-xl font-semibold gradient-text" href="#home">
          Cloudisoft
        </a>

        <div className="hidden md:flex gap-8 text-sm text-slate-300">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden md:block btn-primary text-sm">
          Get a Custom AI Agent
        </a>
      </nav>
    </header>
  );
}
