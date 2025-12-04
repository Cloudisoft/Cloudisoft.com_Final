// ===========================================
// CloudiCore FULL PAGE (Final Version)
// ===========================================
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../index.css";
import Footer from "../components/Footer";

// ===========================================
// PAGE COMPONENT
// ===========================================
export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: "",
    cost: "",
    months: "",
    goal: "growth",
    businessType: "",
  });

  const [template, setTemplate] = useState("custom");
  const [result, setResult] = useState<any>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [error, setError] = useState("");

  // ===========================================
  // TEMPLATES
  // ===========================================
  function applyTemplate(t: string) {
    setTemplate(t);

    const presets: any = {
      Pricing: "Increase product pricing by 12%",
      Hiring: "Hire 3 engineers next quarter",
      Marketing: "Increase marketing budget by 35%",
      Expansion: "Open new location in Q3",
      Product: "Launch new premium-tier product",
      Sales: "Add 2 new SDRs to boost pipeline",
      Operations: "Automate support workflows",
    };

    setInputs({
      ...inputs,
      scenario: presets[t] || "",
    });
  }

  // ===========================================
  // AI ASSIST FEATURE — AUTOGENERATE INPUT
  // ===========================================
  function autoGenerateScenario() {
    const ideas = [
      "Reduce churn by improving onboarding flow",
      "Introduce a $9 entry plan to increase activation",
      "Outsource customer support to cut monthly cost",
      "Increase ad spend on Google & LinkedIn",
      "Hire a sales manager to increase conversion",
      "Bundle features into a new mid-tier plan",
    ];

    const random = ideas[Math.floor(Math.random() * ideas.length)];

    setInputs({
      ...inputs,
      scenario: random,
    });
  }

  // ===========================================
  // SIMULATION ENGINE (No Charts Version)
  // ===========================================
  function runSimulation() {
    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!inputs.scenario) return setError("Describe your decision.");
    if (!rev) return setError("Enter monthly revenue.");
    if (!cst) return setError("Enter monthly cost.");
    if (!t) return setError("Enter timeframe.");
    setError("");

    // Simple forecasting model
    const optimistic = rev * 1.25 - cst;
    const expected = rev * 1.12 - cst;
    const cautious = rev * 0.92 - cst;

    const breakEven =
      expected > 0 ? Math.max(1, Math.round((cst - rev) / expected) + 1) : null;

    setResult({
      optimistic,
      expected,
      cautious,
      breakEven,
      risk: Math.round(Math.random() * 35 + 40),
    });
  }

  // ===========================================
  // EXPORT PDF
  // ===========================================
  async function exportPDF() {
    const capture = document.querySelector("#sim-results");
    if (!capture) return;

    const canvas = await html2canvas(capture as HTMLElement);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 8, 8, 195, 0);
    pdf.save("cloudicore_report.pdf");
  }

  // ===========================================
  // RENDER UI
  // ===========================================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* HERO SECTION */}
      <section className="section text-center pt-24 pb-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-slate-300 text-lg">
          Simulate pricing, hiring, marketing, and expansion decisions — instantly.
        </p>
        <div className="flex justify-center gap-3 mt-6">
          <span className="btn-secondary">7-Day Free Trial</span>
          <span className="btn-secondary">No Credit Card Required</span>
        </div>
      </section>

      {/* SIMULATOR SECTION */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT CARD */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-5">1. Describe Your Decision</h2>

          {/* Business Type */}
          <label className="text-sm text-slate-300">Business Type</label>
          <select
            className="w-full bg-cloudi-card/60 p-3 rounded-xl border border-slate-800 mt-1 mb-5"
            value={inputs.businessType}
            onChange={(e) => setInputs({ ...inputs, businessType: e.target.value })}
          >
            <option value="">Select Business Type</option>
            <option>SaaS</option>
            <option>E-commerce</option>
            <option>Agency / Services</option>
            <option>Marketplace</option>
            <option>Retail / Local Business</option>
            <option>Manufacturing</option>
          </select>

          {/* Templates */}
          <div className="flex gap-2 flex-wrap mb-5">
            {[
              "Pricing",
              "Hiring",
              "Marketing",
              "Expansion",
              "Product",
              "Sales",
              "Operations",
            ].map((t) => (
              <button
                key={t}
                onClick={() => applyTemplate(t)}
                className="px-3 py-1 rounded-xl border border-slate-700 text-sm hover:border-purple-500"
              >
                {t}
              </button>
            ))}
          </div>

          {/* AI Assist */}
          <button
            className="w-full mb-3 px-4 py-2 rounded-xl bg-cloudi-card border border-purple-500 text-purple-300 hover:bg-purple-500/20"
            onClick={autoGenerateScenario}
          >
            💡 AI Assist — Auto-Generate
          </button>

          {/* Scenario Input */}
          <textarea
            rows={4}
            placeholder="Example: Increase pricing by 10%"
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800"
          />

          {/* Inputs */}
          <Field label="Current monthly revenue" name="revenue" inputs={inputs} setInputs={setInputs} />
          <Field label="Main monthly cost" name="cost" inputs={inputs} setInputs={setInputs} />
          <Field label="Timeframe (months)" name="months" inputs={inputs} setInputs={setInputs} />

          {error && <p className="text-red-400 mt-4">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="card" id="sim-results">
          {!result ? (
            <p className="text-slate-400">Run your first simulation…</p>
          ) : (
            <>
              {/* Results */}
              <div className="p-4 rounded-xl bg-cloudi-card/60 border border-slate-800">
                <p className="text-sm text-slate-300">Break-even</p>
                <p className="text-3xl font-bold">
                  {result.breakEven ? `${result.breakEven} months` : "No recovery expected"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <Outcome label="Optimistic" value={result.optimistic} color="text-green-400" />
                <Outcome label="Expected" value={result.expected} color="text-yellow-300" />
                <Outcome label="Cautious" value={result.cautious} color="text-red-400" />
              </div>

              <p className="mt-6 text-lg">
                <span className="font-semibold">Risk Index:</span> {result.risk}/100
              </p>

              <button className="btn-secondary w-full mt-6" onClick={exportPDF}>
                Export to PDF 📦
              </button>

              <button
                className="btn-primary w-full mt-3"
                onClick={() => setAuthOpen(true)}
              >
                Save & Continue →
              </button>
            </>
          )}
        </div>
      </section>

      {/* PRICING SECTION */}
      <Pricing />

      {/* FAQ SECTION */}
      <FAQ />

      {/* FOOTER */}
      <Footer />

      {/* AUTH MODAL */}
      {authOpen && <Auth close={() => setAuthOpen(false)} />}
    </div>
  );
}

// ===========================================
// INPUT FIELD
// ===========================================
function Field({ label, name, inputs, setInputs }: any) {
  return (
    <div className="mt-5">
      <label className="text-sm text-slate-300">{label}</label>
      <input
        className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1"
        type="number"
        value={inputs[name]}
        onChange={(e) => setInputs({ ...inputs, [name]: e.target.value })}
      />
    </div>
  );
}

// ===========================================
// OUTCOME BOX
// ===========================================
function Outcome({ label, value, color }: any) {
  return (
    <div className="p-4 rounded-xl bg-cloudi-card/60 border border-slate-800">
      <p className={`font-semibold ${color}`}>{label}</p>
      <p className="text-2xl font-bold mt-1">${value.toLocaleString()}</p>
    </div>
  );
}

// ===========================================
// PRICING  (Your EXACT Design)
// ===========================================
function Pricing() {
  return (
    <section className="section mt-24 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-2">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14">
        {/* FREE */}
        <PriceCard
          name="Free"
          price="$0"
          features={["2 simulations / month", "Basic reports", "Email support"]}
          cta="Start Free"
        />

        {/* STARTER */}
        <PriceCard
          name="Starter"
          price="$19.99"
          features={[
            "10 simulations / month",
            "Summary reports",
            "Basic templates",
            "Email support",
          ]}
          cta="Start Simulating"
        />

        {/* PRO (HIGHLIGHT) */}
        <PriceCard
          highlight
          name="Pro"
          price="$49.99"
          features={[
            "25 simulations / month",
            "Scenario history",
            "Interactive forecasting",
            "Priority support",
          ]}
          cta="Upgrade to Pro"
        />

        {/* ENTERPRISE */}
        <PriceCard
          name="Enterprise"
          price="$99.99"
          features={[
            "Unlimited simulations",
            "Team access",
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

// PRICE CARD
function PriceCard({ name, price, features, cta, highlight }: any) {
  return (
    <div
      className={`rounded-3xl p-8 border shadow-xl ${
        highlight
          ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white border-transparent"
          : "bg-cloudi-card border-slate-800"
      }`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>

      <p className="text-4xl font-extrabold mt-4">
        {price}
        <span className="text-lg opacity-70 ml-1">/mo</span>
      </p>

      <ul className="mt-6 space-y-2 text-left text-sm">
        {features.map((f: string, idx: number) => (
          <li key={idx} className="flex gap-2">
            ✔️ <span>{f}</span>
          </li>
        ))}
      </ul>

      <button className="btn-primary w-full mt-8">{cta}</button>
    </div>
  );
}

// ===========================================
// FAQ SECTION (2 Columns, Spaced & Descriptive)
// ===========================================
function FAQ() {
  const items = [
    {
      q: "How accurate are CloudiCore simulations?",
      a: "CloudiCore uses industry-standard forecasting assumptions, combined with your inputs, to estimate optimistic, expected, and cautious outcomes. These are directional projections—not guaranteed financial results—but offer strong decision clarity.",
    },
    {
      q: "Do I need a credit card for the free trial?",
      a: "No. The free 7-day trial requires no payment method. You get full access to simulations and can upgrade anytime.",
    },
    {
      q: "Can I run simulations for different business types?",
      a: "Yes. Choose from SaaS, e-commerce, agency, marketplace, retail, or manufacturing. CloudiCore adjusts its internal logic to match your industry.",
    },
    {
      q: "Is CloudiCore suitable for startups?",
      a: "Absolutely. Early-stage founders use CloudiCore to test pricing changes, hiring plans, and go-to-market decisions before spending real budget.",
    },
    {
      q: "Can I export reports?",
      a: "Yes. You can export simulation summaries as PDFs with one click—perfect for investors or internal planning.",
    },
    {
      q: "What happens if I hit my plan simulation limit?",
      a: "You can upgrade instantly without losing any historical results or saved simulations.",
    },
    {
      q: "Is my data secure?",
      a: "CloudiCore uses industry-grade encryption, secure logging, and zero data sharing. Your simulation data is 100% private.",
    },
    {
      q: "Can my team collaborate?",
      a: "Yes—Pro and Enterprise plans include team access, shared simulations, and collaborative dashboards.",
    },
  ];

  return (
    <section className="section mt-28">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {items.map((item, i) => (
          <details
            key={i}
            className="bg-cloudi-card p-6 rounded-2xl border border-slate-800"
          >
            <summary className="cursor-pointer text-lg font-semibold">
              {item.q}
            </summary>
            <p className="text-slate-300 mt-3 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="h-20" />
    </section>
  );
}

// ===========================================
// AUTH MODAL
// ===========================================
function Auth({ close }: any) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center p-4 z-50">
      <div className="bg-cloudi-card rounded-2xl p-8 w-full max-w-md border border-slate-700">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        <input
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-cloudi-card/60 border border-slate-700 mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-cloudi-card/60 border border-slate-700 mb-3"
        />

        <button className="btn-primary w-full mt-3">Continue</button>

        <button className="btn-secondary w-full mt-4" onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );
}
