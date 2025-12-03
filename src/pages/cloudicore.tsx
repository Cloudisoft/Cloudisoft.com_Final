import { useState } from "react";

const TEMPLATES = [
  "Pricing change",
  "Hiring decision",
  "Expansion / new location",
  "Marketing budget adjustment",
  "Product launch",
  "Operational scaling",
  "Sales strategy",
];

export default function CloudiCore() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [simulationsUsed, setSimulationsUsed] = useState(0);
  const [plan, setPlan] = useState("trial");

  const [inputs, setInputs] = useState({
    template: "Pricing change",
    description: "",
    revenue: 20000,
    cost: 8000,
    months: 3,
    goal: "growth",
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const trialLimit = 3;

  const simulate = () => {
    if (!isLoggedIn) return setError("Sign in to run a simulation.");
    if (!inputs.description.trim())
      return setError("Describe your scenario.");
    if (plan === "trial" && simulationsUsed >= trialLimit)
      return setError("Trial limit reached. Upgrade to continue.");

    const optimistic = inputs.revenue * 1.25 - inputs.cost * 1.12;
    const expected = inputs.revenue * 1.12 - inputs.cost * 1.05;
    const cautious = inputs.revenue * 0.9 - inputs.cost;

    setResult({
      optimistic,
      expected,
      cautious,
      risk: Math.floor(Math.random() * 40) + 40,
    });

    setSimulationsUsed(simulationsUsed + 1);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* HERO — MATCHES Cloudisoft Style */}
      <section className="pt-24 pb-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold">
          CloudiCore
          <span className="gradient-text block">Decision Simulator</span>
        </h1>
        <p className="mt-4 text-slate-300 max-w-3xl mx-auto">
          Run realistic business scenarios before committing your budget,
          team, or time. See revenue impact, profitability, and risk —
          all in one guided view.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/5">
            5-Day Free Trial · 3 Simulations
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/5">
            No Credit Card Required
          </span>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <main className="max-w-6xl mx-auto px-4 lg:px-0 space-y-16 pb-32">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT — INPUT PANEL */}
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">
              1. Describe your decision
            </h2>

            {!isLoggedIn && (
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold"
                >
                  Continue with Google
                </button>

                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold"
                >
                  Continue with Microsoft
                </button>

                <div className="text-center text-slate-500 text-xs">or</div>

                <input
                  className="w-full bg-white/10 p-2 rounded-md"
                  placeholder="Work email"
                />
                <input
                  type="password"
                  className="w-full bg-white/10 p-2 rounded-md"
                  placeholder="Password"
                />
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
                >
                  Sign in
                </button>

                <p className="text-xs text-slate-500">
                  Demo login — connect auth later.
                </p>
              </div>
            )}

            <label className="block text-sm text-slate-300 mb-2">
              Template
            </label>
            <select
              value={inputs.template}
              onChange={(e) =>
                setInputs({ ...inputs, template: e.target.value })
              }
              className="w-full bg-white/10 p-3 rounded-lg mb-4"
            >
              {TEMPLATES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <label className="block text-sm text-slate-300 mb-2">
              Scenario
            </label>
            <textarea
              className="bg-white/10 p-3 rounded-lg w-full mb-4"
              rows={4}
              placeholder='Example: "Increase pricing by 10%"'
              value={inputs.description}
              onChange={(e) =>
                setInputs({ ...inputs, description: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-300">
                  Monthly revenue
                </label>
                <input
                  type="number"
                  className="bg-white/10 p-3 rounded-lg w-full"
                  value={inputs.revenue}
                  onChange={(e) =>
                    setInputs({ ...inputs, revenue: Number(e.target.value) })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">
                  Monthly cost
                </label>
                <input
                  type="number"
                  className="bg-white/10 p-3 rounded-lg w-full"
                  value={inputs.cost}
                  onChange={(e) =>
                    setInputs({ ...inputs, cost: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-4">{error}</p>
            )}

            <button
              onClick={simulate}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 rounded-lg font-semibold"
            >
              Run Simulation
            </button>
          </div>

          {/* RIGHT — RESULTS */}
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg min-h-[300px]">
            <h2 className="text-xl font-semibold mb-6">
              2. Outcomes
            </h2>

            {!result ? (
              <p className="text-slate-400">
                Run simulation to view projections.
              </p>
            ) : (
              <div className="space-y-4">
                <OutcomeCard
                  label="Optimistic"
                  value={result.optimistic}
                  color="text-green-400"
                />
                <OutcomeCard
                  label="Expected"
                  value={result.expected}
                  color="text-yellow-400"
                />
                <OutcomeCard
                  label="Cautious"
                  value={result.cautious}
                  color="text-red-400"
                />

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-sm text-slate-300 mb-1">Risk Index</h3>
                  <p className="text-3xl font-bold">{result.risk}/100</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PRICING */}
        <section className="pt-10">
          <h2 className="text-4xl font-bold">Pricing</h2>
          <p className="text-slate-300 mt-3">
            Upgrade anytime after your trial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

            <PlanCard
              name="Starter"
              price="$19.99"
              active={plan === "starter"}
              select={() => setPlan("starter")}
            />

            <PlanCard
              name="Pro"
              price="$49.99"
              highlight
              active={plan === "pro"}
              select={() => setPlan("pro")}
            />

            <PlanCard
              name="Enterprise"
              price="$99.99"
              active={plan === "enterprise"}
              select={() => setPlan("enterprise")}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------------------ Small UI Components ------------------ */

const OutcomeCard = ({ label, value, color }: any) => (
  <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
    <p className={`font-semibold text-sm ${color}`}>{label}</p>
    <p className="text-2xl font-bold mt-1">
      {value.toLocaleString()}
    </p>
  </div>
);

const PlanCard = ({ name, price, highlight, active, select }: any) => (
  <div
    className={`p-6 rounded-2xl border ${
      highlight ? "bg-gradient-to-b from-blue-600 to-indigo-600" : "bg-white/5"
    } ${active ? "border-blue-400" : "border-white/10"}`}
  >
    <h3 className="text-2xl font-bold">{name}</h3>
    <p className="text-3xl font-extrabold mt-2">{price}/mo</p>

    <button
      onClick={select}
      className={`mt-6 w-full py-2 rounded-lg ${
        highlight
          ? "bg-white text-black font-semibold"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      {highlight ? "Upgrade to Pro" : "Choose " + name}
    </button>
  </div>
);
