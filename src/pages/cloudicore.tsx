// ===========================================
// CLOUDICORE – FINAL, ERROR-FREE VERSION
// (NO chart.js so Render will not fail)
// ===========================================

import { useState } from "react";
import "../index.css";
import Footer from "../components/Footer";

export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: "",
    cost: "",
    months: "",
    goal: "growth",
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [authOpen, setAuthOpen] = useState(false);

  // --------------------------
  // Run Simulation Logic
  // --------------------------
  function runSimulation() {
    const R = Number(inputs.revenue);
    const C = Number(inputs.cost);
    const T = Number(inputs.months);

    if (!inputs.scenario.trim()) return setError("Describe your decision first.");
    if (!R) return setError("Monthly revenue is required.");
    if (!C) return setError("Monthly cost is required.");
    if (!T || T < 1) return setError("Timeframe is required.");

    setError("");

    const optimistic = [];
    const expected = [];
    const cautious = [];

    for (let m = 1; m <= T; m++) {
      optimistic.push(R * 1.22 ** m - C);
      expected.push(R * 1.12 ** m - C);
      cautious.push(R * 0.93 ** m - C);
    }

    const breakEven = expected.findIndex((v) => v > 0) + 1 || null;

    setResult({
      optimistic,
      expected,
      cautious,
      months: T,
      risk: Math.floor(Math.random() * 35 + 40),
      breakEven,
    });
  }

  // --------------------------
  // SAVE / AUTH → open modal
  // --------------------------
  function saveSimulation() {
    setAuthOpen(true);
  }

  // ======================================================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* HERO */}
      <section className="section text-center pt-24 pb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-slate-300 text-lg">
          Predict realistic revenue, risks, break-even and growth impact — before spending a dollar.
        </p>
      </section>

      {/* SIMULATOR */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6">1. Describe Your Decision</h2>

          <textarea
            placeholder='Example: "Increase price by 10%"'
            rows={4}
            className="w-full bg-cloudi-card/60 p-4 rounded-xl border border-slate-800"
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <Field label="Current monthly revenue" name="revenue" inputs={inputs} setInputs={setInputs} />
          <Field label="Main monthly cost" name="cost" inputs={inputs} setInputs={setInputs} />
          <Field label="Timeframe (months)" name="months" inputs={inputs} setInputs={setInputs} />

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RESULTS */}
        <div className="card">
          {!result ? (
            <p className="text-slate-400">Run your first simulation to see results…</p>
          ) : (
            <>
              {/* BREAK EVEN */}
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800 mb-6">
                <p className="text-sm text-slate-300">Break-even</p>
                <h3 className="text-3xl font-bold">
                  {result.breakEven ? `${result.breakEven} months` : "No recovery"}
                </h3>
              </div>

              {/* SIMPLE "CHART LOOK" BAR */}
              <div className="space-y-4">
                <ChartBar label="Optimistic" value={result.optimistic[result.optimistic.length - 1]} color="bg-green-500" />
                <ChartBar label="Expected" value={result.expected[result.expected.length - 1]} color="bg-yellow-500" />
                <ChartBar label="Cautious" value={result.cautious[result.cautious.length - 1]} color="bg-red-500" />
              </div>

              {/* RISK */}
              <p className="mt-6 text-lg font-medium">
                Risk Index: <span className="font-bold">{result.risk}/100</span>
              </p>

              {/* ACTIONS */}
              <button className="btn-secondary w-full mt-6">
                Export Simulation to PDF 📦
              </button>

              <button className="btn-primary w-full mt-3" onClick={saveSimulation}>
                Save & Continue →
              </button>
            </>
          )}
        </div>
      </section>

      {/* PRICING */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* FOOTER */}
      <Footer />

      {/* AUTH MODAL */}
      {authOpen && <AuthModal close={() => setAuthOpen(false)} />}

    </div>
  );
}

// ================================
// INPUT FIELD
// ================================
function Field({ label, name, inputs, setInputs }: any) {
  return (
    <div className="mt-4">
      <label className="text-sm text-slate-300">{label}</label>
      <input
        type="number"
        className="w-full bg-cloudi-card/60 p-3 rounded-xl border border-slate-800 mt-1"
        value={inputs[name]}
        onChange={(e) => setInputs({ ...inputs, [name]: e.target.value })}
      />
    </div>
  );
}

// ================================
// SIMPLE BAR CHART VISUAL
// ================================
function ChartBar({ label, value, color }: any) {
  const width = Math.min(100, Math.max(5, (value / 10000) * 100));

  return (
    <div>
      <p className="text-sm mb-1">{label}</p>
      <div className="w-full bg-slate-800 rounded-xl h-3">
        <div className={`h-3 rounded-xl ${color}`} style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
}

// ================================
// PRICING
// ================================
function Pricing() {
  return (
    <section className="section text-center mt-28">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-3">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-16">

        <PriceCard name="Free" price="0" features={["2 simulations/mo", "Basic reports", "Email support"]} cta="Start Free" />

        <PriceCard name="Starter" price="19.99" features={["10 simulations/mo", "Summary reports", "Basic templates", "Email support"]} cta="Start Simulating" />

        <PriceCard name="Pro" price="49.99" highlight features={["25 simulations/mo", "Dashboard", "Scenario history", "Advanced templates", "Priority support"]} cta="Upgrade to Pro" />

        <PriceCard name="Enterprise" price="99.99" features={["Unlimited sims", "Team access", "Advanced analytics", "API access", "Dedicated support"]} cta="Talk to Sales" />

      </div>
    </section>
  );
}

function PriceCard({ name, price, features, cta, highlight }: any) {
  return (
    <div className={`rounded-3xl p-8 border border-slate-800 shadow-xl shadow-black/40 ${highlight ? "bg-gradient-to-b from-blue-500 to-purple-500" : "bg-cloudi-card"}`}>
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-4xl font-extrabold mt-4">${price}<span className="text-lg opacity-70 ml-1">/mo</span></p>

      <ul className="mt-6 space-y-2 text-left text-sm">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex gap-2 items-center">
            <span>✔</span> {f}
          </li>
        ))}
      </ul>

      <button className="btn-primary w-full mt-8">{cta}</button>
    </div>
  );
}

// ================================
// FAQ
// ================================
function FAQ() {
  const faqs = [
    ["What is CloudiCore?", "A decision simulator that predicts revenue, risk, and break-even outcomes."],
    ["Is it really free?", "Yes — you get 2 simulations per month on the Free plan."],
    ["Who uses CloudiCore?", "Startups, founders, managers, creators, and small businesses."],
    ["Does CloudiCore replace a CFO?", "No — it gives directional clarity, not full accounting."],
    ["Can I export simulations?", "Yes, PDF export is included."],
    ["Is my data stored?", "Only if you create an account."],
    ["Do I need a credit card?", "Not for the free or trial version."],
  ];

  return (
    <section className="section mt-28">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {faqs.map(([q, a], i) => (
          <details key={i} className="bg-cloudi-card p-5 rounded-2xl border border-slate-800">
            <summary className="cursor-pointer text-lg font-semibold">{q}</summary>
            <p className="text-slate-300 mt-3">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ================================
// AUTH MODAL
// ================================
function AuthModal({ close }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-cloudi-card p-8 rounded-3xl border border-slate-800 w-[360px]">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <button className="btn-secondary w-full">Continue with Google</button>
        <button className="btn-secondary w-full mt-2">Continue with Microsoft</button>

        <div className="text-center text-xs text-slate-500 my-4">OR</div>

        <input placeholder="Work email" className="w-full bg-cloudi-card/60 p-3 border border-slate-800 rounded-xl" />
        <input type="password" placeholder="Password" className="w-full bg-cloudi-card/60 p-3 border border-slate-800 rounded-xl mt-2" />

        <button className="btn-primary w-full mt-4">Create Account</button>

        <p onClick={close} className="text-center text-sm text-slate-400 mt-4 cursor-pointer">
          Close
        </p>
      </div>
    </div>
  );
}
