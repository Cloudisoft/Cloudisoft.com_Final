// ============================================================
// CLOUDICORE FULL PAGE — CLEAN VERSION (NO CHARTS)
// ============================================================

import { useState } from "react";
import "../index.css";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ============================================================
// MAIN PAGE
// ============================================================

export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: "",
    cost: "",
    months: "",
    goal: "growth",
    businessType: "SaaS",
  });

  const [template, setTemplate] = useState("custom");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // ============================================================
  // APPLY TEMPLATE
  // ============================================================

  function applyTemplate(t: string) {
    setTemplate(t);

    if (t === "Pricing Increase") {
      setInputs({
        ...inputs,
        scenario: "Increase product pricing by 12%",
        revenue: inputs.revenue || "20000",
      });
    }

    if (t === "Hiring 3 Engineers") {
      setInputs({
        ...inputs,
        scenario: "Hire 3 software engineers this quarter",
        cost: inputs.cost || "15000",
      });
    }

    if (t === "Marketing Boost") {
      setInputs({
        ...inputs,
        scenario: "Increase marketing budget by 35% to drive new customers",
        cost: inputs.cost || "8000",
      });
    }

    if (t === "New Market Expansion") {
      setInputs({
        ...inputs,
        scenario: "Expand product into a new international market",
        revenue: inputs.revenue || "25000",
      });
    }

    if (t === "Cost Reduction") {
      setInputs({
        ...inputs,
        scenario: "Reduce operational costs by 18% across departments",
        cost: inputs.cost || "9000",
      });
    }
  }

  // ============================================================
  // AI ASSIST (Client-Side OpenAI call)
  // ============================================================

  async function runAIAssist() {
    setAiLoading(true);

    try {
      const key = import.meta.env.VITE_OPENAI_API_KEY;
      if (!key) {
        alert("Missing VITE_OPENAI_API_KEY in Render!");
        setAiLoading(false);
        return;
      }

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are CloudiCore AI Assist. Generate a concise, actionable business decision scenario.",
            },
            { role: "user", content: "Generate a clear what-if business decision scenario." },
          ],
        }),
      });

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "";

      setInputs({ ...inputs, scenario: text });
    } catch (err) {
      alert("AI Assist failed. Check API key.");
    }

    setAiLoading(false);
  }

  // ============================================================
  // SIMULATION ENGINE
  // ============================================================

  function runSimulation() {
    const r = Number(inputs.revenue);
    const c = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!inputs.scenario) return setError("Describe your decision.");
    if (!r) return setError("Enter monthly revenue.");
    if (!c) return setError("Enter monthly cost.");
    if (!t) return setError("Enter timeframe.");

    setError("");

    const optimistic = Math.round(r * 1.22 * t - c * 1.12 * t);
    const expected = Math.round(r * 1.1 * t - c * 1.05 * t);
    const cautious = Math.round(r * 0.92 * t - c * t);
    const risk = Math.floor(Math.random() * 30) + 35;

    const breakEven = expected > 0 ? Math.ceil(c / (r - c)) : null;

    setResult({ optimistic, expected, cautious, risk, breakEven });
    setAuthOpen(true);
  }

  // ============================================================
  // EXPORT PDF
  // ============================================================

  async function exportPDF() {
    const section = document.querySelector("#sim-output");
    if (!section) return;

    const canvas = await html2canvas(section as HTMLElement);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 8, 8, 195, 0);
    pdf.save("cloudicore_report.pdf");
  }

  // ============================================================
  // UI
  // ============================================================

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
          Simulate business decisions before spending money, hiring, or expanding.
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <span className="btn-secondary">7-Day Free Trial</span>
          <span className="btn-secondary">No Credit Card Required</span>
        </div>
      </section>

      {/* SIMULATOR */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">1. Describe Your Decision</h2>

          {/* Templates */}
          <div className="flex gap-2 flex-wrap mb-5">
            {[
              "custom",
              "Pricing Increase",
              "Hiring 3 Engineers",
              "Marketing Boost",
              "New Market Expansion",
              "Cost Reduction",
            ].map((t) => (
              <button
                key={t}
                onClick={() => applyTemplate(t)}
                className={`px-3 py-1 rounded-xl border text-sm ${
                  t === template ? "border-purple-500 bg-purple-500/20" : "border-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* AI Assist */}
          <button
            onClick={runAIAssist}
            className="btn-secondary w-full mb-4"
            disabled={aiLoading}
          >
            {aiLoading ? "Thinking…" : "💡 AI Assist — Auto-Generate Scenario"}
          </button>

          {/* Scenario */}
          <textarea
            rows={4}
            placeholder='Example: "Increase price by 10%"'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800"
          />

          {/* Business Type */}
          <div className="mt-4">
            <label className="text-sm text-slate-300">Business Type</label>
            <select
              className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1"
              value={inputs.businessType}
              onChange={(e) => setInputs({ ...inputs, businessType: e.target.value })}
            >
              <option>SaaS</option>
              <option>E-commerce</option>
              <option>Agency</option>
              <option>Startup</option>
              <option>Marketplace</option>
              <option>Local Business</option>
            </select>
          </div>

          {/* Fields */}
          <Field label="Current monthly revenue" name="revenue" inputs={inputs} setInputs={setInputs} />
          <Field label="Main monthly cost" name="cost" inputs={inputs} setInputs={setInputs} />
          <Field label="Timeframe (months)" name="months" inputs={inputs} setInputs={setInputs} />

          {error && <p className="text-red-400 mt-3">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RESULTS */}
        <div id="sim-output" className="card min-h-[260px]">
          {!result ? (
            <p className="text-slate-400">Run a simulation to see projections…</p>
          ) : (
            <>
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-300">Break-even time</p>
                <h2 className="text-3xl font-bold mt-1">
                  {result.breakEven ? `${result.breakEven} months` : "No break-even"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
            </>
          )}
        </div>
      </section>

      {/* PRICING */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      <Footer />

      {/* LOGIN MODAL */}
      {authOpen && <Auth close={() => setAuthOpen(false)} />}
    </div>
  );
}

// ============================================================
// FIELD COMPONENT
// ============================================================

function Field({ label, name, inputs, setInputs }: any) {
  return (
    <div className="mt-4">
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

// ============================================================
// OUTCOME BOX
// ============================================================

function Outcome({ label, value, color }: any) {
  return (
    <div className="bg-cloudi-card/60 rounded-xl p-4 border border-slate-800">
      <p className={`font-medium ${color}`}>{label}</p>
      <p className="text-2xl font-bold mt-1">${value.toLocaleString()}</p>
    </div>
  );
}

// ============================================================
// PRICING SECTION (UNCHANGED – YOUR ORIGINAL DESIGN)
// ============================================================

function Pricing() {
  return (
    <section className="section mt-28 text-center">
      <h2 className="text-5xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-3">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14">
        <PriceCard
          name="Free"
          price="0"
          features={["2 simulations / month", "Basic reports", "Email support"]}
          cta="Start Free"
        />

        <PriceCard
          name="Starter"
          price="19.99"
          features={["10 simulations / month", "Summary reports", "Basic templates", "Email support"]}
          cta="Start Simulating"
        />

        <PriceCard
          name="Pro"
          price="49.99"
          highlight
          features={[
            "25 simulations / month",
            "Scenario history",
            "Interactive forecasting",
            "Priority support",
          ]}
          cta="Upgrade to Pro"
        />

        <PriceCard
          name="Enterprise"
          price="99.99"
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
        highlight ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white" : "bg-cloudi-card"
      }`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>

      <p className="text-4xl font-extrabold mt-4">
        ${price}
        <span className="text-lg opacity-70 ml-1">/mo</span>
      </p>

      <ul className="mt-6 space-y-2 text-left text-sm">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex gap-2">
            <span>✔️</span> {f}
          </li>
        ))}
      </ul>

      <button className="btn-primary w-full mt-8">{cta}</button>
    </div>
  );
}

// ============================================================
// FAQ SECTION
// ============================================================

function FAQ() {
  const items = [
    {
      q: "What is CloudiCore?",
      a: "CloudiCore is an AI-powered business decision simulator that helps founders test pricing, hiring, and growth strategies before spending money.",
    },
    {
      q: "How accurate are the simulations?",
      a: "CloudiCore uses real-world business patterns, financial models, and industry dynamics to generate realistic projections.",
    },
    {
      q: "Is the free plan really free?",
      a: "Yes — no credit card required. You get 2 simulations each month with basic insights.",
    },
    {
      q: "Can I export results?",
      a: "Yes! CloudiCore lets you export your full simulation report as a downloadable PDF.",
    },
    {
      q: "Who is CloudiCore for?",
      a: "Founders, managers, product teams, agencies, and anyone who makes budget or strategy decisions.",
    },
    {
      q: "Do I need technical skills?",
      a: "Not at all. CloudiCore is built for non-technical users — clean UI, simple inputs, powerful insights.",
    },
    {
      q: "Is my data secure?",
      a: "Yes — all data is encrypted, and we use Supabase authentication with industry-standard security.",
    },
    {
      q: "Can I upgrade or cancel anytime?",
      a: "Absolutely. Upgrade when you need more simulations or downgrade without penalties.",
    },
  ];

  return (
    <section className="section mt-32">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {items.map((f, i) => (
          <details
            key={i}
            className="bg-cloudi-card p-5 rounded-xl border border-slate-800 cursor-pointer"
          >
            <summary className="text-lg font-semibold cursor-pointer">{f.q}</summary>
            <p className="text-slate-300 mt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// LOGIN / SIGNUP MODAL
// ============================================================

function Auth({ close }: any) {
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full p-8 relative">

        <button
          onClick={close}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Create your CloudiCore account</h2>

        {/* Email */}
        <input
          className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mb-3"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn-primary w-full mb-4">Continue</button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="px-3 text-slate-400 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Google */}
        <button className="btn-secondary w-full mb-3 flex items-center justify-center gap-2">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        {/* Microsoft */}
        <button className="btn-secondary w-full flex items-center justify-center gap-2">
          <img
            src="https://www.svgrepo.com/show/303157/microsoft.svg"
            className="w-5 h-5"
          />
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
}
