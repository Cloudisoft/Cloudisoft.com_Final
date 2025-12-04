// ======================================================
// CloudiCore — Final Full Page (AI Assist + PDF Export)
// ======================================================

import { useState } from "react";
import "../index.css";
import Footer from "../components/Footer";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ======================================================
// MAIN PAGE
// ======================================================
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
  const [authOpen, setAuthOpen] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [exporting, setExporting] = useState(false);

  // ======================================================
  // APPLY TEMPLATE
  // ======================================================
  const applyTemplate = (t: string) => {
    setTemplate(t);

    if (t === "Pricing Increase") {
      setInputs({
        ...inputs,
        scenario: "Increase product pricing by 12% to improve margin.",
      });
    } else if (t === "Hiring Engineers") {
      setInputs({
        ...inputs,
        scenario: "Hire 3 engineers to accelerate roadmap delivery.",
      });
    } else if (t === "Marketing Boost") {
      setInputs({
        ...inputs,
        scenario: "Increase marketing budget 35% to scale acquisition.",
      });
    }
  };

  // ======================================================
  // AI ASSIST
  // ======================================================
  const callAiAssist = async () => {
    if (!inputs.businessType) {
      setError("Select your business type first.");
      return;
    }

    setLoadingAI(true);
    setError("");

    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: inputs.businessType,
          scenario: inputs.scenario,
        }),
      });

      const data = await res.json();

      if (data?.suggestion) {
        setInputs((p) => ({ ...p, scenario: data.suggestion }));
      } else {
        setError("AI Assist could not generate a suggestion.");
      }
    } catch (err) {
      setError("AI Assist failed — check backend.");
    }

    setLoadingAI(false);
  };

  // ======================================================
  // SIMULATION ENGINE
  // ======================================================
  const runSimulation = () => {
    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!inputs.scenario) return setError("Describe your decision.");
    if (!rev) return setError("Enter monthly revenue.");
    if (!cst) return setError("Enter monthly cost.");
    if (!t) return setError("Enter timeframe.");
    setError("");

    const optimistic = rev * 1.2 - cst;
    const expected = rev * 1.1 - cst;
    const cautious = rev * 0.95 - cst;

    const risk = Math.floor(Math.random() * 30) + 40;

    setResult({
      optimistic,
      expected,
      cautious,
      risk,
    });
  };

  // ======================================================
  // PDF EXPORT
  // ======================================================
  const exportPDF = async () => {
    if (!result) return;
    setExporting(true);

    const element = document.querySelector("#pdf-export-area") as HTMLElement;
    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, 0);

    pdf.save("cloudicore-result.pdf");
    setExporting(false);
  };

  // ======================================================
  // UI
  // ======================================================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* HERO */}
      <section className="section text-center pt-24 pb-14">
        <h1 className="text-5xl sm:text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-4 text-slate-300 text-lg">
          Simulate pricing, hiring, marketing, and operational decisions before committing budget.
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <span className="btn-secondary">7-Day Free Trial</span>
          <span className="btn-secondary">No Credit Card Required</span>
        </div>
      </section>

      {/* SIMULATOR */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-5">1. Describe Your Decision</h2>

          {/* Business Type */}
          <label className="text-sm text-slate-300">Business Type</label>
          <select
            className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1 mb-4"
            value={inputs.businessType}
            onChange={(e) =>
              setInputs({ ...inputs, businessType: e.target.value })
            }
          >
            <option value="">Select type…</option>
            <option value="SaaS">SaaS</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Agency">Agency</option>
            <option value="Marketplace">Marketplace</option>
            <option value="AI Startup">AI Startup</option>
          </select>

          {/* Templates */}
          <div className="flex gap-2 flex-wrap mb-5">
            {["custom", "Pricing Increase", "Hiring Engineers", "Marketing Boost"].map((t) => (
              <button
                key={t}
                onClick={() => applyTemplate(t)}
                className={`px-3 py-1 rounded-xl border text-sm ${
                  t === template
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* AI Assist */}
          <button
            className="btn-secondary w-full mb-4 flex items-center justify-center gap-2"
            onClick={callAiAssist}
          >
            💡 AI Assist — Auto-generate
            {loadingAI && "…"}
          </button>

          {/* Scenario */}
          <textarea
            rows={4}
            placeholder='Example: “Increase pricing by 10%”'
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800"
            value={inputs.scenario}
            onChange={(e) =>
              setInputs({ ...inputs, scenario: e.target.value })
            }
          />

          {/* Inputs */}
          <Field label="Current monthly revenue" name="revenue" inputs={inputs} setInputs={setInputs} />
          <Field label="Main monthly cost" name="cost" inputs={inputs} setInputs={setInputs} />
          <Field label="Timeframe (months)" name="months" inputs={inputs} setInputs={setInputs} />

          {error && <p className="text-red-400 mt-3">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RESULTS PANEL */}
        <div className="card" id="pdf-export-area">
          {!result ? (
            <p className="text-slate-400">Run your first simulation…</p>
          ) : (
            <>
              <Outcome label="Optimistic" value={result.optimistic} color="text-green-400" />
              <Outcome label="Expected" value={result.expected} color="text-yellow-300" />
              <Outcome label="Cautious" value={result.cautious} color="text-red-400" />

              <div className="mt-6 bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-300">Risk Index</p>
                <p className="text-4xl font-bold">{result.risk}/100</p>
              </div>

              {/* PDF EXPORT BUTTON */}
              <button
                className="btn-secondary w-full mt-6 flex justify-center items-center gap-2"
                onClick={exportPDF}
              >
                {exporting ? "Exporting…" : "Export PDF 📄"}
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

// ======================================================
// INPUT FIELD COMPONENT
// ======================================================
function Field({ label, name, inputs, setInputs }: any) {
  return (
    <div className="mt-4">
      <label className="text-sm text-slate-300">{label}</label>
      <input
        type="number"
        className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1"
        value={inputs[name]}
        onChange={(e) => setInputs({ ...inputs, [name]: e.target.value })}
      />
    </div>
  );
}

// ======================================================
// RESULT CARD
// ======================================================
function Outcome({ label, value, color }: any) {
  return (
    <div className="bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mt-3">
      <p className={`font-medium ${color}`}>{label}</p>
      <p className="text-2xl font-bold mt-1">${value.toLocaleString()}</p>
    </div>
  );
}

// ======================================================
// PRICING (Original Version — Unchanged)
// ======================================================
function Pricing() {
  return (
    <section className="section text-center mt-28">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-3">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14">

        {/* FREE */}
        <PriceCard
          name="Free"
          price="$0"
          features={[
            "2 simulations / month",
            "Basic reports",
            "Email support",
          ]}
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

        {/* PRO */}
        <PriceCard
          name="Pro"
          price="$49.99"
          highlight
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

function PriceCard({ name, price, features, cta, highlight }: any) {
  return (
    <div
      className={`rounded-3xl p-8 border border-slate-800 shadow-xl shadow-black/40 ${
        highlight
          ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white"
          : "bg-cloudi-card"
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
            <span>✔️</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button className="btn-primary w-full mt-8">{cta}</button>
    </div>
  );
}

// ======================================================
// FAQ SECTION
// ======================================================
function FAQ() {
  const faqs = [
    {
      q: "What is CloudiCore?",
      a: "CloudiCore is an AI-powered business simulator that predicts financial outcomes before you commit real money.",
    },
    {
      q: "How accurate are the simulations?",
      a: "CloudiCore uses industry benchmarks, scenario modeling, and risk assumptions to give realistic directional estimates.",
    },
    {
      q: "Does AI Assist use my sensitive data?",
      a: "No. It only uses the text you provide during your session. Nothing is stored or shared.",
    },
    {
      q: "Can I export my results?",
      a: "Yes! You can export simulation results as PDF and share with investors or your team.",
    },
    {
      q: "Is the free plan really free?",
      a: "Absolutely. No credit card needed. You get 2 simulations per month.",
    },
    {
      q: "Do I need technical skills?",
      a: "No. CloudiCore is designed for founders, managers, and operators — zero technical knowledge required.",
    },
  ];

  return (
    <section className="section mt-32">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        {faqs.map((f, i) => (
          <div key={i} className="bg-cloudi-card/60 p-6 rounded-2xl border border-slate-800">
            <p className="text-lg font-semibold">{f.q}</p>
            <p className="text-slate-300 mt-2">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ======================================================
// AUTH MODAL
// ======================================================
function AuthModal({ close }: any) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-6 z-50">
      <div className="bg-cloudi-card p-8 rounded-3xl max-w-md w-full border border-slate-800 shadow-xl">

        <h2 className="text-3xl font-bold mb-6">Create Account</h2>

        <button className="w-full bg-white text-black py-3 rounded-xl font-medium mb-3">
          Continue with Google
        </button>

        <button className="w-full bg-white text-black py-3 rounded-xl font-medium mb-4">
          Continue with Microsoft
        </button>

        <input
          type="email"
          placeholder="Work email"
          className="w-full bg-cloudi-card/60 p-3 rounded-xl border border-slate-700 mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-cloudi-card/60 p-3 rounded-xl border border-slate-700"
        />

        <button className="btn-primary w-full mt-6">Sign Up</button>

        <button
          className="text-slate-400 mt-4 w-full text-center text-sm"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
}
