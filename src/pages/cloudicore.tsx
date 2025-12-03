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

  const templates = {
    pricing: '“Increase product pricing by 12% for premium tier users.”',
    sales_discount: '“Offer 10–20% annual plan discount to improve conversion.”',
    churn: '“Introduce retention program to reduce churn by 2%.”',
    hiring: '“Hire 2 SDRs to accelerate outbound lead pipeline.”',
    marketing: '“Increase paid ads budget by $4,000 targeting high-intent keywords.”',
    product: '“Launch new AI add-on at $29/month to existing customers.”',
    expansion: '“Open new market targeting EU enterprise accounts.”',
    ops: '“Upgrade hosting and infra to support 100k additional users.”',
    commission: '“Increase sales commission from 8% to 12% to boost closings.”',
  };

  const aiAssistSmart = {
    pricing:
      "Raise prices gradually (10–15%) on your best performing tier. Expect +LTV, +MRR, +Support load.",
    sales_discount:
      "Discount annual subscriptions (10–30%). Spike conversions, reduce churn, lower cash on hand.",
    churn:
      "Offer loyalty benefits, downgrade plan instead of cancel. Small churn reduction = big MRR gains.",
    hiring:
      "Hire revenue roles first (SDR → AE). Hiring engineers last. Ramp ~3 months.",
    marketing:
      "Scale performance ads 4–6% of revenue. Avoid brand spend at MVP stage.",
    product:
      "Launch beta to <15% customers. Add tier pricing. Product will not offset dev cost in first 3 months.",
    ops:
      "Infra scaling burns cash. ROI only above user threshold. Always simulate peak + fail cost.",
    expansion:
      "Expansion takes 3–6 months. Localize pricing + customer success or churn = disaster.",
    commission:
      "Commission changes change morale instantly. Expect short-term burn + long-term ARR climb.",
  };

  // ================== VALIDATION =====================
  function validateInputs() {
    if (!inputs.scenario.trim()) return "Please describe your decision.";
    if (!inputs.revenue) return "Monthly revenue is required.";
    if (!inputs.cost) return "Monthly cost is required.";
    if (!inputs.months) return "Timeframe is required.";
    return null;
  }

  // ==============================================
  // ⬇ SIMULATION LOGIC V2.5 (MORE REALISTIC)
  // ==============================================
  function runSimulation() {
    const err = validateInputs();
    if (err) {
      setError(err);
      return;
    }

    const r = Number(inputs.revenue);
    const c = Number(inputs.cost);
    const m = Number(inputs.months);

    let optimistic = 0;
    let expected = 0;
    let cautious = 0;

    // GOOD multipliers
    const growth = {
      pricing: [1.18, 1.1, 0.93],
      sales_discount: [1.4, 1.18, 0.85],
      churn: [1.15, 1.08, 0.97],
      hiring: [1.22, 1.12, 0.88],
      marketing: [1.32, 1.15, 0.83],
      product: [1.3, 1.12, 0.88],
      expansion: [1.35, 1.16, 0.9],
      ops: [1.1, 1.02, 0.98],
      commission: [1.25, 1.12, 0.92],
    };

    const curve = growth[inputs.type];

    optimistic = r * curve[0] * m - c * 1.1 * m;
    expected = r * curve[1] * m - c * 1.05 * m;
    cautious = r * curve[2] * m - c * m;

    const risk = Math.min(
      95,
      45 + m * 3 + (inputs.type === "expansion" ? 10 : 0)
    );

    setResult({ optimistic, expected, cautious, risk });
    setError("");
  }

  // ==============================================
  // AI ASSIST BUTTON → populates scenario input
  // ==============================================
  const useTemplate = () => {
    setInputs((prev) => ({ ...prev, scenario: templates[prev.type] }));
  };

  const useSmartAssist = () => {
    setInputs((prev) => ({
      ...prev,
      scenario: aiAssistSmart[prev.type],
    }));
  };

  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">
      {/* HERO */}
      <section className="section text-center pt-24 pb-10">
        <h1 className="text-5xl font-extrabold">
          CloudiCore
          <div className="gradient-text">Decision Simulator</div>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 mt-4 text-lg">
          Simulate pricing, churn, expansion, hiring, marketing or product launches before spending real money.
        </p>
      </section>

      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-6">
            1. Describe Your Decision
          </h2>

          {/* Input Type */}
          <select
            className="w-full bg-cloudi-card/70 rounded-xl p-3 border border-slate-800 mb-4"
            value={inputs.type}
            onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          >
            <option value="pricing">Pricing Change</option>
            <option value="sales_discount">Sales Discount Strategy</option>
            <option value="churn">Churn Reduction</option>
            <option value="hiring">Hiring New Employees</option>
            <option value="marketing">Increase Marketing Spend</option>
            <option value="product">Launch New Product</option>
            <option value="expansion">New Market Expansion</option>
            <option value="ops">Operational Scaling / Infra</option>
            <option value="commission">Sales Commission Model</option>
          </select>

          {/* Scenario */}
          <textarea
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mb-4"
            rows={4}
            placeholder='Describe your business decision...'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          {/* AI Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-secondary" onClick={useTemplate}>
              🧠 Use Template
            </button>
            <button className="btn-secondary" onClick={useSmartAssist}>
              🤖 AI Assist Input
            </button>
          </div>

          {/* Financial Inputs */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <InputField label="Monthly Revenue*" value={inputs.revenue} onChange={(v) => setInputs({ ...inputs, revenue: v })}/>
            <InputField label="Monthly Cost*" value={inputs.cost} onChange={(v) => setInputs({ ...inputs, cost: v })}/>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField label="Timeframe (months)*" value={inputs.months} onChange={(v) => setInputs({ ...inputs, months: v })}/>
            <SelectField label="Goal" options={["growth","profit","stability"]} value={inputs.goal} onChange={(v) => setInputs({ ...inputs, goal: v })}/>
          </div>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RESULTS */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-6">2. Outcomes</h2>
          {!result ? (
            <p className="text-slate-400">
              Enter values and run a simulation
            </p>
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

      <div className="mt-28">
        <Footer />
      </div>
    </div>
  );
}

/* ======================= COMPONENTS ============================= */

function InputField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <input
        className="w-full bg-cloudi-card/60 rounded-xl p-3 mt-1 border border-slate-800"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter value"
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
      <p className={`${color} font-medium`}>{label}</p>
      <p className="text-2xl font-bold">${Math.floor(value).toLocaleString()}</p>
    </div>
  );
}
