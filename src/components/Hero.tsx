export default function Hero() {
  return (
    <section id="home" className="section text-center flex flex-col gap-8 pt-20">
      <div className="inline-flex px-4 py-1 bg-cloudi-card/60 border border-slate-700 text-xs rounded-full">
        🧠 ⚡ Custom AI Agents &amp; Business Simulations
      </div>

      <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
        Automate Intelligence.
        <br />
        <span className="gradient-text">Amplify Growth.</span>
      </h1>

      <p className="max-w-2xl mx-auto text-slate-300">
        Harness the power of custom AI Agents and predictive simulations to
        transform operations and decision-making.
      </p>

      <div className="flex justify-center gap-4">
        <a className="btn-primary" href="#agents">Explore AI Agents ✨</a>
        <a className="btn-secondary" href="#cloudicore">Try CloudiCore</a>
      </div>
    </section>
  );
}
