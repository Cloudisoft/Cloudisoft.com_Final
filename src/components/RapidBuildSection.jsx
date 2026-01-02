export default function RapidBuildSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c7cff10] to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm text-white/80 mb-6">
          RapidBuild — powered by Cloudisoft
        </div>

        {/* headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Custom websites & landing pages
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            built fast, priced right
          </span>
        </h2>

        {/* sub text */}
        <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
          We design and build modern websites with full frontend and backend —
          plug-and-play with your existing site, delivered faster and at a lower
          cost than traditional agencies.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a
            href="https://rapidbuild.cloudisoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
          >
            Build My Website
          </a>

          <a
            href="https://rapidbuild.cloudisoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl border border-white/15 text-white/80 hover:bg-white/5 transition"
          >
            View Details
          </a>
        </div>
      </div>
    </section>
  );
}
