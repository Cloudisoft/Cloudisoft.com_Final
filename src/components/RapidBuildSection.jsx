export default function RapidBuild() {
  return (
    <section
      id="rapidbuild"
      className="relative w-full py-16 md:py-20 bg-transparent"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full border border-white/10 bg-white/5 text-sm text-white/80">
          RapidBuild — powered by Cloudisoft
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Custom websites & landing pages{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            built fast, priced right
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-5 text-base md:text-lg text-white/70 max-w-3xl mx-auto">
          We design and build modern websites with full frontend and backend —
          plug-and-play with your existing site, delivered faster and at a lower
          cost than traditional agencies.
        </p>

        {/* Feature points */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-semibold mb-2">
              ⚡ Fast execution
            </h4>
            <p className="text-sm text-white/70">
              Short timelines, clear scope, and rapid delivery without agency
              delays.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-semibold mb-2">
              🔌 Plug & play builds
            </h4>
            <p className="text-sm text-white/70">
              Integrates seamlessly with your existing website or stack — no
              rebuild required.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-semibold mb-2">
              💸 Lower than market pricing
            </h4>
            <p className="text-sm text-white/70">
              Pay only for what you need. No retainers, no unnecessary overhead.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://rapidbuild.cloudisoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
          >
            Build My Website
          </a>

          <a
            href="https://rapidbuild.cloudisoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-white/20 text-white/90 hover:bg-white/5 transition"
          >
            Share Requirements
          </a>
        </div>
      </div>
    </section>
  );
}
