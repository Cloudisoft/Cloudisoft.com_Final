import { useState } from "react";
import "../index.css"; // ensures classes are available globally
import Footer from "../components/Footer";
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

  const runSimulation = () => {
    if (!inputs.scenario.trim()) {
      setError("Describe your decision first.");
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
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* HERO */}
      <section className="section text-center flex flex-col gap-6 pt-24 pb-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>
        <p className="max-w-3xl mx-auto text-slate-300 text-lg">
          Run realistic what-if scenarios before committing budget, time, or headcount.
          See revenue impact, profit, and risk in one guided view.
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
      <section className="section mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6">1. Describe Your Decision</h2>

          <textarea
            className="w-full bg-cloudi-card/60 rounded-xl p-4 text-white mb-4 border border-slate-800"
            rows={4}
            placeholder='Example: "Increase product pricing by 12%"'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Current Monthly Revenue"
              value={inputs.revenue}
              onChange={(v) => setInputs({ ...inputs, revenue: v })}
            />
            <InputField
              label="Main Monthly Cost"
              value={inputs.cost}
              onChange={(v) => setInputs({ ...inputs, cost: v })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField
              label="Timeframe (months)"
              value={inputs.months}
              onChange={(v) => setInputs({ ...inputs, months: v })}
            />
            <SelectField
              label="Primary Objective"
              value={inputs.goal}
              options={["growth", "profit", "stability"]}
              onChange={(v) => setInputs({ ...inputs, goal: v })}
            />
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="card min-h-[300px]">
          <h2 className="text-2xl font-semibold mb-6">2. Outcomes</h2>

          {!result ? (
            <p className="text-slate-400">Run a simulation to view projections</p>
          ) : (
            <div className="space-y-4">
              <Outcome label="Optimistic" value={result.optimistic} color="text-green-400" />
              <Outcome label="Expected" value={result.expected} color="text-yellow-300" />
              <Outcome label="Cautious" value={result.cautious} color="text-red-400" />

              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-300 text-sm">Risk Index</p>
                <p className="text-4xl font-bold">{result.risk}/100</p>
              </div>

              {showLogin && (
                <div className="bg-cloudi-card p-4 rounded-xl mt-6 border border-slate-800">
                  <p className="text-sm text-slate-300">
                    Create an account to save, export, and run unlimited simulations.
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

      {/* PRICING SECTION */}
      <PricingCards />
    </div>
  );
}

function InputField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <input
        className="w-full bg-cloudi-card/60 rounded-xl p-3 mt-1 border border-slate-800"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function SelectField({ label, options, value, onChange }: any) {
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
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

function Outcome({ label, value, color }: any) {
  return (
    <div className="bg-cloudi-card/60 rounded-xl p-4 border border-slate-800">
      <p className={`font-medium ${color}`}>{label}</p>
      <p className="text-2xl font-bold mt-1">
        ${value.toLocaleString()}
      </p>
    </div>
  );
}

function PricingCards() {
  return (
    <section className="section mt-28 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14">

        {/* FREE PLAN */}
        <PriceCard
          name="Free"
          price="0"
          features={[
            "2 simulations per month",
            "Basic reports",
            "Email support",
          ]}
          cta="Start Free"
          highlight={false}
        />

        {/* STARTER PLAN */}
        <PriceCard
          name="Starter"
          price="19.99"
          features={[
            "10 simulations per month",
            "Summary reports",
            "Basic templates",
            "Email support",
          ]}
          cta="Start Simulating"
          highlight={false}
        />

        {/* PRO PLAN — HIGHLIGHT */}
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
          cta="Upgrade to Pro"
          highlight={true}
        />

        {/* ENTERPRISE */}
        <PriceCard
          name="Enterprise"
          price="99.99"
          features={[
            "Unlimited simulations",
            "Team access & collaboration",
            "Advanced analytics",
            "Custom templates",
            "API access",
            "Dedicated support",
          ]}
          cta="Talk to Sales"
          highlight={false}
        />
      </div>
    </section>
  );
}

function PriceCard({ name, price, features, cta, highlight }: any) {
  return (
    <div
      className={`rounded-3xl p-8 border border-slate-800 shadow-xl shadow-black/40 
      ${
        highlight
          ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white"
          : "bg-cloudi-card"
      }`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>

      <p className="text-4xl font-extrabold mt-4">
        ${price}
        <span className="text-lg opacity-70 ml-1">/mo</span>
      </p>

      <ul className="mt-6 space-y-2 text-left text-sm">
        {features.map((f: string, idx: number) => (
          <li key={idx} className="flex gap-2">
            <span>✔️</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        className="btn-primary w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500"
      >
        {cta}
      </button>
    </div>
    <Footer />
  );
}




