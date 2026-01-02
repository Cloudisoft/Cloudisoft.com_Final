export default function RapidBuild() {
  return (
    <section className="relative w-full bg-transparent py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center justify-center mb-4">
          <span className="px-4 py-1.5 rounded-full text-sm text-white/80 bg-white/5 border border-white/10 backdrop-blur">
            🚀 RapidBuild — powered by Cloudisoft
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Custom websites & landing pages{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            built fast, priced right
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl mx-auto">
          ⚡ We design and build modern websites with full frontend & backend —
          plug-and-play with your existing site, delivered faster and at a lower
          cost than traditional agencies.
        </p>

        {/* Feature points */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-semibold mb-1">🎨 Modern UI</h4>
            <p className="text-sm text-white/70">
              Clean layouts, better typography, mobile-first design.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-semibold mb-1">🔌 Plug & Play</h4>
            <p className="text-sm text-white/70">
              Integrates with your existing website — no rebuild required.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-semibold mb-1">💸 Market-Lower Pricing</h4>
            <p className="text-sm text-white/70">
              No agency overhead. You pay only for what you need.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://rapidbuild.cloudisoft.com"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-medium text-white
              bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
          >
            🚀 Build My Website
          </a>

          <span className="text-sm text-white/50">
            Custom builds • Fast delivery • No bloated retainers
          </span>
        </div>

      </div>
    </section>
  );
}
