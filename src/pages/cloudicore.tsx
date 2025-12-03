import { useState } from "react";

const formatMoney = (n: number) =>
  "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: 20000,
    cost: 8000,
    months: 3,
    goal: "growth",
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const run = () => {
    if (!inputs.scenario.trim()) return setError("Describe your decision first.");

    /** ——— SIMPLE BUSINESS SIM ——— **/
    const r = inputs.revenue;
    const c = inputs.cost;
    const t = inputs.months;

    const optimistic = r * 1.22 * t - c * 1.12 * t;
    const expected = r * 1.1 * t - c * 1.04 * t;
    const cautious = r * 0.92 * t - c * t;

    const risk = Math.floor(Math.random() * 30) + 35;

    setResult({ optimistic, expected, cautious, risk });
    setError("");
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-40">

      {/* HERO */}
      <section className="pt-28 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold">
          CloudiCore Simulator
        </h1>

        <p className="mt-4 text-slate-300 text-lg max-w-3xl mx-auto">
          Test a business decision before committing budget, time or headcount.
          CloudiCore gives realistic outcomes, risk and profit impact.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <span className="px-4 py-1 bg-white/10 rounded-full text-sm border border-white/5">
            7-Day Free Trial · 3 Simulations
          </span>
          <span className="px-4 py-1 bg-white/10 rounded-full text-sm border border-white/5">
            No Credit Card Required
          </span>
        </div>
      </section>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 lg:px-0 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* INPUTS PANEL */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <h2 className="text-xl font-semibold mb-6">1. Describe Your Decision</h2>

          <label className="text-sm text-slate-300">Describe Scenario</label>
          <textarea
            rows={4}
            className="bg-white/10 w-full p-3 rounded-lg mt-1 mb-4"
            placeholder='Example: "Increase product pricing by 12%"'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-300">
                Current Monthly Revenue
              </label>
              <input
                className="bg-white/10 w-full p-3 rounded-lg mt-1"
                type="number"
                value={inputs.revenue}
                onChange={(e) => setInputs({ ...inputs, revenue: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Main Monthly Cost</label>
              <input
                className="bg-white/10 w-full p-3 rounded-lg mt-1"
                type="number"
                value={inputs.cost}
                onChange={(e) => setInputs({ ...inputs, cost: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-slate-300">Timeframe (months)</label>
              <input
                className="bg-white/10 w-full p-3 rounded-lg mt-1"
                type="number"
                min={1}
                max={12}
                value={inputs.months}
                onChange={(e) => setInputs({ ...inputs, months: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Primary Objective</label>
              <select
                className="bg-white/10 w-full p-3 rounded-lg mt-1"
                value={inputs.goal}
                onChange={(e) => setInputs({ ...inputs, goal: e.target.value })}
              >
                <option value="growth">Growth</option>
                <option value="profit">Profit</option>
                <option value="stability">Stability</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

          <button
            onClick={run}
            className="w-full mt-6 py-3 font-semibold text-lg rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 shadow-lg"
          >
            Run Simulation
          </button>
        </div>

        {/* OUTPUTS PANEL */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur min-h-[300px]">
          <h2 className="text-xl font-semibold mb-6">2. Outcomes</h2>

          {!result && (
            <p className="text-slate-400">
              Run a simulation to see projected results.
            </p>
          )}

          {result && (
            <div className="space-y-4">
              <OutcomeCard label="Optimistic" color="text-green-400" value={result.optimistic} />
              <OutcomeCard label="Expected" color="text-yellow-300" value={result.expected} />
              <OutcomeCard label="Cautious" color="text-red-400" value={result.cautious} />

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm text-slate-300 mb-1">Risk Index</h3>
                <p className="text-3xl font-bold">{result.risk}/100</p>
              </div>

              {showLogin && (
                <div className="mt-6 bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-slate-300">
                    Create an account to save, export, and run unlimited simulations.
                  </p>
                  <button
                    onClick={() => alert("Connect auth provider here")}
                    className="mt-3 w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </main>

      <PricingSection setPlan={() => {}} />
    </div>
  );
}

function OutcomeCard({ label, value, color }: any) {
  return (
    <div className="bg-white/10 p-4 rounded-lg">
      <p className={`font-semibold text-sm ${color}`}>{label}</p>
      <p className="text-2xl font-bold mt-1">{formatMoney(value)}</p>
    </div>
  );
}

/** ————— Pricing Section matching Cloudisoft Landing ————— */

function PricingSection({ setPlan }: any) {
  return (
    <section className="mt-28 max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

        <PriceCard
          name="Starter"
          price="19.99"
          features={[
            "5 simulations per month",
            "Summary reports",
            "Basic templates",
            "Email support",
          ]}
          button="Start Simulating Now"
          highlight={false}
        />

        <PriceCard
          name="Pro"
          price="49.99"
          features={[
            "25 simulations per month",
            "Interactive dashboard",
            "Scenario history",
            "Advanced templates",
            "Priority support",
          ]}
          button="Start Simulating Now"
          highlight={true}
        />

        <PriceCard
          name="Enterprise"
          price="99.99"
          features={[
            "Unlimited simulations",
            "Team access & collaboration",
            "Advanced analytics",
            "Custom templates",
            "API access",
          ]}
          button="Start Simulating Now"
          highlight={false}
        />

      </div>
    </section>
  );
}

function PriceCard({ name, price, features, button, highlight }: any) {
  return (
    <div
      className={`rounded-2xl p-6 border ${
        highlight
          ? "bg-gradient-to-b from-blue-600 to-indigo-600 border-blue-400"
          : "bg-white/5 border-white/10"
      } shadow-xl`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="mt-2 text-4xl font-extrabold">${price}
        <span className="text-lg opacity-60 ml-1">/mo</span>
      </p>

      <ul className="mt-6 space-y-2 text-sm">
        {features.map((f: string) => (
          <li key={f} className="flex gap-2 items-start">
            ✔️ <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 w-full py-3 rounded-xl font-semibold ${
          highlight ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
        }`}
      >
        {button}
      </button>
    </div>
  );
}
