import { useState } from "react";

export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: 20000,
    cost: 8000,
    months: 3,
    goal: "growth",
  });

  const [result, setResult] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState("");

  const run = () => {
    if (!inputs.scenario.trim()) {
      setError("Describe your business decision.");
      return;
    }

    const r = inputs.revenue;
    const c = inputs.cost;
    const t = inputs.months;

    const optimistic = r * 1.22 * t - c * 1.12 * t;
    const expected = r * 1.1 * t - c * 1.05 * t;
    const cautious = r * 0.92 * t - c * t;
    const risk = Math.floor(Math.random() * 30) + 35;

    setResult({ optimistic, expected, cautious, risk });
    setShowLogin(true);
  };

  return (
    <div className="bg-cloudi-bg text-white min-h-screen pb-32">

      {/* HERO */}
      <section className="section text-center flex flex-col gap-6 pt-28 pb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          CloudiCore
          <br />
          <span className="gradient-text">Business Decision Simulator</span>
        </h1>

        <p className="max-w-3xl mx-auto text-slate-300 text-lg">
          Simulate real business actions. See revenue impact, profit changes, and risks
          before committing time, budget, or headcount.
        </p>

        <div className="flex justify-center gap-4 mt-2">
          <span className="btn-secondary">
            7-Day Free Trial · 3 Simulations
          </span>
          <span className="btn-secondary">
            No Credit Card Required
          </span>
        </div>
      </section>

      {/* SIMULATOR */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* INPUT PANEL */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6">
            1. Describe Your Decision
          </h2>

          <textarea
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 text-white"
            rows={4}
            placeholder='Example: "Increase product pricing by 12% next quarter."'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Field
              label="Current Monthly Revenue"
              value={inputs.revenue}
              onChange={(v) => setInputs({ ...inputs, revenue: v })}
            />
            <Field
              label="Main Monthly Cost"
              value={inputs.cost}
              onChange={(v) => setInputs({ ...inputs, cost: v })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field
              label="Timeframe (months)"
              value={inputs.months}
              onChange={(v) => setInputs({ ...inputs, months: v })}
            />
            <Select
              label="Primary Objective"
              value={inputs.goal}
              options={["growth", "profit", "stability"]}
              onChange={(v) => setInputs({ ...inputs, goal: v })}
            />
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={run}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RESULTS PANEL */}
        <div className="card min-h-[320px]">
          <h2 className="text-2xl font-semibold mb-6">2. Projected Outcomes</h2>

          {!result && (
            <p className="text-slate-400">
              Run a simulation to see optimistic, expected, and cautious paths.
            </p>
          )}

          {result && (
            <div className="space-y-4">

              <Outcome label="Optimistic" color="text-green-400" value={result.optimistic} />
              <Outcome label="Expected" color="text-yellow-300" value={result.expected} />
              <Outcome label="Cautious" color="text-red-400" value={result.cautious} />

              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-300 text-sm">Risk Index</p>
                <p className="text-4xl font-bold">{result.risk}/100</p>
              </div>

              {showLogin && (
                <div className="bg-cloudi-card p-4 rounded-xl border border-slate-800 mt-6">
                  <p className="text-sm text-slate-300">
                    Sign in to save simulations and unlock more templates.
                  </p>
                  <button className="btn-primary w-full mt-3">
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <input
        type="number"
        className="w-full bg-cloudi-card/60 rounded-xl p-3 mt-1 border border-slate-800"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Select({ label, options, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <select
        className="w-full bg-cloudi-card/60 rounded-xl p-3 mt-1 border border-slate-800"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

function Outcome({ label, value, color }: any) {
  return (
    <div className="bg-cloudi-card/80 rounded-xl p-4 border border-slate-800 shadow-lg shadow-black/40">
      <p className={`font-medium ${color}`}>{label}</p>
      <p className="text-2xl font-bold mt-1">${value.toLocaleString()}</p>
    </div>
  );
}
