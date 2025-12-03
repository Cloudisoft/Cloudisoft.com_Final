import { useState } from "react";
import Footer from "../components/Footer";
import "../index.css";

export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: 20000,
    cost: 8000,
    months: 3,
    goal: "growth",
    type: "pricing",
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [aiHint, setAiHint] = useState("");

  // ==============================================
  // BUSINESS LOGIC V2
  // ==============================================
  const runSimulation = () => {
    if (!inputs.scenario.trim()) {
      setError("Describe your decision first.");
      return;
    }

    const r = inputs.revenue;
    const c = inputs.cost;
    const months = inputs.months;

    // Derive customer count (assume ARPU ≈ $100)
    const customers = Math.max(1, Math.floor(r / 100));

    const elasticity = 0.6;
    const churn = 0.03;
    const hiringRamp = [0.25, 0.6, 0.8, 1];
    const adoption = [0.05, 0.2, 0.4, 0.55, 0.65, 0.7];

    // PRICING MODEL
    function modelPricing() {
      const priceUp = 0.15;
      const arpuOld = r / customers;
      const arpuNew = arpuOld * (1 + priceUp);

      const churnRate = churn + elasticity * priceUp;

      function calc(mult: number) {
        const cust = customers * (1 - churnRate * mult);
        const rev = cust * arpuNew * months;
        return rev - c * months;
      }

      return {
        optimistic: calc(0.6),
        expected: calc(1),
        cautious: calc(1.4),
      };
    }

    // HIRING MODEL
    function modelHiring() {
      const hires = 2;
      const salary = 4500;
      const baseRevenue = 12000;

      function calc(scale: number) {
        let revenue = 0;
        for (let m = 0; m < months; m++) {
          const ramp = hiringRamp[Math.min(m, hiringRamp.length - 1)];
          revenue += baseRevenue * ramp * scale;
        }
        const cost = salary * hires * months + 5000;
        return revenue - cost;
      }

      return {
        optimistic: calc(1.25),
        expected: calc(1),
        cautious: calc(0.7),
      };
    }

    // MARKETING MODEL
    function modelMarketing() {
      const spendBoost = 4000;
      const CAC = 120;
      const conv = 0.07;
      const LTV = 1100;

      function calc(scale: number) {
        const leads = spendBoost * scale;
        const buyers = leads * conv;
        const revenue = buyers * LTV;
        return revenue - (c + spendBoost * scale) * months;
      }

      return {
        optimistic: calc(1.4),
        expected: calc(1),
        cautious: calc(0.6),
      };
    }

    // PRODUCT LAUNCH
    function modelProduct() {
      const baseRev = 10000;
      function calc(scale: number) {
        return (
          adoption
            .slice(0, months)
            .reduce((t, p) => t + p * baseRev * scale, 0) -
          c * months
        );
      }

      return {
        optimistic: calc(1.25),
        expected: calc(1),
        cautious: calc(0.7),
      };
    }

    let sim;
    switch (inputs.type) {
      case "pricing":
        sim = modelPricing();
        break;
      case "hiring":
        sim = modelHiring();
        break;
      case "marketing":
        sim = modelMarketing();
        break;
      case "product":
        sim = modelProduct();
        break;
      default:
        sim = modelPricing();
    }

    // Risk Score
    const riskBase = {
      pricing: 48,
      hiring: 35,
      marketing: 52,
      product: 60,
    }[inputs.type];

    const risk = Math.min(95, riskBase + months * 2);

    setResult({
      optimistic: sim.optimistic,
      expected: sim.expected,
      cautious: sim.cautious,
      risk,
    });

    setError("");
  };

  // ==============================================
  // AI Assist (suggest scenarios)
  // ==============================================
  const generateAIHint = () => {
    const prompt = {
      pricing: "Try a gradual 10–15% increase on your best selling plan.",
      hiring: "Hire SDRs first, engineers latest. Ramp takes ~3 months.",
      marketing: "Invest 4–6% of revenue in paid acquisition.",
      product: "Launch only to 5–15% of customers as beta.",
    };
    setAiHint(prompt[inputs.type]);
  };

  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* ================= HERO ================= */}
      <section className="section text-center pt-24 pb-10">
        <h1 className="text-5xl font-extrabold">
          CloudiCore
          <div className="gradient-text">Business Simulator</div>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 mt-4 text-lg">
          Model pricing changes, hiring plans, marketing spend, or launches —
          see revenue, profit and risk like a founder.
        </p>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <span className="btn-secondary">7-Day Free Trial · 3 Simulations</span>
          <span className="btn-secondary">No Credit Card Required</span>
        </div>
      </section>

      {/* ================= SIMULATOR ================= */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

        {/* ---- LEFT PANEL ---- */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-6">1. Describe Your Decision</h2>

          <select
            className="w-full bg-cloudi-card/70 rounded-xl p-3 border border-slate-800 mb-4"
            value={inputs.type}
            onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          >
            <option value="pricing">Pricing Change</option>
            <option value="hiring">Hire Employees</option>
            <option value="marketing">Increase Marketing Spend</option>
            <option value="product">Launch New Product</option>
          </select>

          <textarea
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mb-4"
            rows={4}
            placeholder='Example: “Increase pricing on Pro plan by 12%”'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <button onClick={generateAIHint} className="btn-secondary w-full">
            💡 AI Assist Input
          </button>

          {aiHint && <p className="mt-3 text-blue-300 text-sm">{aiHint}</p>}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <InputField label="Monthly Revenue" value={inputs.revenue}
              onChange={(v) => setInputs({ ...inputs, revenue: v })} />
            <InputField label="Monthly Cost" value={inputs.cost}
              onChange={(v) => setInputs({ ...inputs, cost: v })} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField label="Timeframe (months)" value={inputs.months}
              onChange={(v) => setInputs({ ...inputs, months: v })} />
            <SelectField
              label="Objective"
              options={["growth", "profit", "stability"]}
              value={inputs.goal}
              onChange={(v) => setInputs({ ...inputs, goal: v })}
            />
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* ---- RIGHT PANEL ---- */}
        <div className="card p-6">
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
            </div>
          )}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <PricingCards />

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

// ================= COMPONENTS ==================

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
            {o[0].toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

function Outcome({ label, value, color }: any) {
  return (
    <div className="bg-cloudi-card/60 rounded-xl p-4 border border-slate-800">
      <p className={`${color} font-medium`}>{label}</p>
      <p className="text-2xl font-bold">${Math.floor(value).toLocaleString()}</p>
    </div>
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

      <button className="btn-primary w-full mt-8">
        {cta}
      </button>
    </div>
  );
}

function PricingCards() {
  return (
    <section id="plans" className="section mt-24 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-2">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14">
        <PriceCard
          name="Free"
          price="0"
          features={[
            "2 simulations per month",
            "Basic reports",
            "Email support",
          ]}
          cta="Start Free"
        />

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
        />

        <PriceCard
          name="Pro"
          price="49.99"
          highlight
          features={[
            "25 simulations per month",
            "Interactive dashboard",
            "Scenario history",
            "Advanced templates",
            "Priority support",
          ]}
          cta="Upgrade to Pro"
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
            "Dedicated support",
          ]}
          cta="Talk to Sales"
        />
      </div>
    </section>
  );
}
