import { useState } from "react";
import Footer from "../components/Footer";
import "../index.css";

export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: "",
    cost: "",
    months: "",
    goal: "growth",
    type: "pricing",
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  // ========================= TEMPLATES ========================= //
  const templates: Record<string, string> = {
    pricing: "Increase subscription pricing by 12% for Pro plan.",
    sales_discount: "Offer 15% discount for annual plan to boost conversions.",
    churn: "Introduce loyalty rewards to reduce churn by 2%.",
    hiring: "Hire 2 Sales Development Reps to increase pipeline.",
    marketing: "Increase ads spend by $4,000 targeting high-intent searches.",
    product: "Launch AI Add-on at $29/mo to existing customers.",
    expansion: "Enter EU region with local pricing and support.",
    ops: "Upgrade backend servers to support 100k extra users.",
    commission: "Increase sales commission from 8% to 12% to motivate closers.",
  };

  // ====================== SMART AI HINT ========================= //
  const smartAssist: Record<string, string> = {
    pricing:
      "Gradual +10–15%. Spread increases across tiers. Expect churn ↑ but ARPU ↑.",
    sales_discount:
      "Annual discount increases upfront MRR and reduces churn. Improves adoption.",
    churn:
      "Introduce anti-churn flow at user downgrade. Offer tier downgrade before cancellation.",
    hiring:
      "Revenue roles first, engineers later. Ramp = 3 months to 100% productivity.",
    marketing:
      "Budget → CAC vs LTV. Improve keywords → reduce CAC 10–30%. Expect slow revenue.",
    product:
      "Launch to 5–15% of customers. Add beta price. Adoption starts slow.",
    expansion:
      "Expansion = slow adoption. Factor support cost + localization + partner integrations.",
    ops:
      "Infra scaling improves retention, causes burn upfront. No instant revenue.",
    commission:
      "Commission ↑ → morale ↑. Short-term burn ↑. Long-term ARR ↑. Expect 2–3 months lag.",
  };

  // ======================== VALIDATION ========================= //
  const validate = () => {
    if (!inputs.scenario.trim()) return "Describe your decision.";
    if (!inputs.revenue) return "Enter monthly revenue.";
    if (!inputs.cost) return "Enter monthly cost.";
    if (!inputs.months) return "Enter timeframe in months.";
    return null;
  };

  // ====================== BUSINESS SIMULATION ====================== //
  const runSimulation = () => {
    const err = validate();
    if (err) return setError(err);

    const r = Number(inputs.revenue);
    const c = Number(inputs.cost);
    const m = Number(inputs.months);

    const growthMatrix: Record<string, number[]> = {
      pricing: [1.18, 1.1, 0.93],
      sales_discount: [1.35, 1.14, 0.9],
      churn: [1.14, 1.08, 0.98],
      hiring: [1.22, 1.1, 0.88],
      marketing: [1.32, 1.16, 0.84],
      product: [1.28, 1.12, 0.88],
      expansion: [1.35, 1.15, 0.85],
      ops: [1.1, 1.03, 0.98],
      commission: [1.21, 1.1, 0.92],
    };

    const curve = growthMatrix[inputs.type];

    const optimistic = r * curve[0] * m - c * 1.12 * m;
    const expected = r * curve[1] * m - c * 1.05 * m;
    const cautious = r * curve[2] * m - c * m;

    const baseRisk: Record<string, number> = {
      pricing: 48,
      sales_discount: 52,
      churn: 35,
      hiring: 38,
      marketing: 50,
      product: 60,
      expansion: 65,
      ops: 42,
      commission: 45,
    };

    const risk = Math.min(95, baseRisk[inputs.type] + m * 2);

    setResult({ optimistic, expected, cautious, risk });
    setError("");
  };

  // ========================= UI ================================ //
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* ============ HERO ============ */}
      <section className="section text-center pt-24 pb-10">
        <h1 className="text-5xl font-extrabold">
          CloudiCore
          <div className="gradient-text">Decision Simulator</div>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 mt-4 text-lg">
          Simulate pricing, hiring, marketing, or product decisions before you commit real budget.
        </p>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <span className="btn-secondary">7-Day Free Trial · 3 Simulations</span>
          <span className="btn-secondary">No Credit Card Required</span>
        </div>
      </section>

      {/* ========= SIMULATOR ========== */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

        {/* LEFT */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-6">1. Describe your decision</h2>

          <select
            className="w-full bg-cloudi-card/70 rounded-xl p-3 border border-slate-800 mb-4"
            value={inputs.type}
            onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          >
            <option value="pricing">Pricing Change</option>
            <option value="sales_discount">Sales Discount Strategy</option>
            <option value="churn">Reduce Subscription Churn</option>
            <option value="hiring">Hire Employees</option>
            <option value="marketing">Increase Marketing Spend</option>
            <option value="product">Launch New Product</option>
            <option value="expansion">Open New Market / Country</option>
            <option value="ops">Operational Scaling / Infra</option>
            <option value="commission">Change Sales Commission</option>
          </select>

          <textarea
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mb-4"
            rows={4}
            placeholder='Describe your business decision clearly...'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <button className="btn-secondary" onClick={() => setInputs({ ...inputs, scenario: templates[inputs.type] })}>
              🧠 Use Template
            </button>
            <button className="btn-secondary" onClick={() => setInputs({ ...inputs, scenario: smartAssist[inputs.type] })}>
              🤖 AI Assist Input
            </button>
          </div>

          {/* Financial Fields */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <FormField label="Monthly Revenue*" value={inputs.revenue} onChange={(v) => setInputs({ ...inputs, revenue: v })}/>
            <FormField label="Monthly Cost*" value={inputs.cost} onChange={(v) => setInputs({ ...inputs, cost: v })}/>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField label="Timeframe (months)*" value={inputs.months} onChange={(v) => setInputs({ ...inputs, months: v })}/>
            <SelectField label="Goal" value={inputs.goal} options={["growth","profit","stability"]} onChange={(v) => setInputs({ ...inputs, goal: v })}/>
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RIGHT RESULTS */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-6">2. Outcomes</h2>

          {!result ? (
            <p className="text-slate-400">Enter values and run a simulation</p>
          ) : (
            <div className="space-y-4">
              <Outcome label="Optimistic" value={result.optimistic} color="text-green-400"/>
              <Outcome label="Expected" value={result.expected} color="text-yellow-300"/>
              <Outcome label="Cautious" value={result.cautious} color="text-red-400"/>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-300 text-sm">Risk Index</p>
                <p className="text-4xl font-bold">{result.risk}/100</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========= PRICING ========= */}
      <Pricing />

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}


// ========================= COMPONENTS ============================ //
function FormField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <input
        className="w-full bg-cloudi-card/60 rounded-xl p-3 mt-1 border border-slate-800"
        type="number"
        placeholder="Enter value"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Outcome({ label, value, color }: any) {
  return (
    <div className="bg-cloudi-card/60 rounded-xl p-4 border border-slate-800">
      <p className={`font-medium ${color}`}>{label}</p>
      <p className="text-2xl font-bold">${Math.floor(value).toLocaleString()}</p>
    </div>
  );
}

// ========================= PRICING ============================ //
function Pricing() {
  return (
    <section id="pricing" className="section mt-28 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-3">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14">

        <PriceCard
          name="Free"
          price="0"
          features={[
            "2 simulations / month",
            "Basic reports",
            "Email support",
          ]}
          cta="Start Free"
        />

        <PriceCard
          name="Starter"
          price="19.99"
          features={[
            "10 simulations / month",
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
            "25 simulations / month",
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
            "Team collaboration",
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

function PriceCard({ name, price, features, cta, highlight }: any) {
  return (
    <div
      className={`rounded-3xl p-8 border border-slate-800 shadow-xl shadow-black/40 ${
        highlight ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white" : "bg-cloudi-card"
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
