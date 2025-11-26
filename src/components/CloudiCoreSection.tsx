const steps = [
  {
    number: "1",
    title: "Input a Scenario",
    desc: "Type or select from templates (Pricing, Hiring, Expansion, etc.) to define the decision you want to test.",
    icon: "🎯"
  },
  {
    number: "2",
    title: "Simulation Engine",
    desc: "CloudiCore uses your company data and industry models to forecast outcomes across multiple scenarios.",
    icon: "🧠"
  },
  {
    number: "3",
    title: "Dashboard",
    desc: "Review financial projections, risk index, and AI recommendations in a clear, interactive dashboard.",
    icon: "📊"
  }
];

export default function CloudiCoreSection() {
  return (
    <section id="cloudicore" className="section space-y-12">
      {/* Top hero */}
      <div className="space-y-6 text-center">
        <div className="inline-flex px-4 py-1 rounded-full border border-slate-700 bg-cloudi-card/80 text-xs text-slate-300">
          CloudiCore AI Simulator
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold">
          See the outcome <span className="gradient-text">before you decide.</span>
        </h2>

        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base">
          CloudiCore lets leaders test business decisions before making them.
          Predict profits, risks, and real-world outcomes with simulation models
          tuned to your business.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a href="#contact" className="btn-primary text-sm">
            Get a Custom AI Agent
          </a>
          <a href="#contact" className="btn-secondary text-sm">
            Let&apos;s Automate Your Business
          </a>
        </div>
      </div>

      {/* The Problem We Solve */}
      <div className="card max-w-4xl mx-auto text-center space-y-3">
        <h3 className="text-xl font-semibold">The Problem We Solve</h3>
        <p className="text-sm sm:text-base text-slate-300">
          Most businesses rely on gut feeling or trial and error. CloudiCore
          changes that by letting you simulate decisions before acting—
          preventing mistakes and optimizing results.
        </p>
      </div>

      {/* How It Works */}
      <div className="space-y-6">
        <h3 className="text-center text-2xl font-semibold">How It Works</h3>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(step => (
            <div
              key={step.number}
              className="card flex flex-col items-center text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold">
                {step.number}
              </div>
              <div className="text-3xl">{step.icon}</div>
              <h4 className="font-semibold">{step.title}</h4>
              <p className="text-sm text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
