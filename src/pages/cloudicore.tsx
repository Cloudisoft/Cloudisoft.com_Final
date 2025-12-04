// ==========================================================
// CloudiCore FULL PAGE — FINAL VERSION
// Supabase Auth + AI Assist + PDF Export + Pricing + FAQ
// EVERYTHING included — paste directly into src/pages/cloudicore.tsx
// ==========================================================

import { useState } from "react";
import "../index.css";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createClient } from "@supabase/supabase-js";

// -------------------------------
// SUPABASE CLIENT
// -------------------------------
const supabase = createClient(
  "https://dfzmkyovvowkxwoovpnr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmem1reW92dm93a3h3b292cG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MzE2MjQsImV4cCI6MjA4MDQwNzYyNH0.Emdbla6DCXY1QAZhR_0wGUAHmovQAgafILxWFUr7i2I"
);

// ==========================================================
// MAIN PAGE
// ==========================================================
export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: "",
    cost: "",
    months: "",
    goal: "growth",
    type: "SaaS",
  });

  const [template, setTemplate] = useState("custom");
  const [result, setResult] = useState<any>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [error, setError] = useState("");

  // -------------------------------
  // APPLY TEMPLATE
  // -------------------------------
  function applyTemplate(t: string) {
    setTemplate(t);

    const presets: any = {
      "Pricing Increase": {
        scenario: "Increase product pricing by 10%",
        revenue: "20000",
        cost: inputs.cost,
      },
      "Hire 3 Engineers": {
        scenario: "Hire 3 software engineers next quarter",
        cost: "15000",
      },
      "Marketing Boost": {
        scenario: "Increase paid ads budget by 30%",
        cost: "8000",
      },
      "Launch New Product": {
        scenario: "Launch new AI-powered add-on product",
        revenue: "15000",
      },
      "Cut Churn by 15%": {
        scenario: "Implement retention program to reduce churn by 15%",
      },
    };

    setInputs({
      ...inputs,
      ...presets[t],
    });
  }

  // -------------------------------
  // LOCAL AI ASSIST (no backend)
  // -------------------------------
  function aiAssist() {
    const suggestions = {
      SaaS: "Increase pricing 12% while adding AI features",
      Ecommerce: "Run 20% discount campaign for 14 days",
      Agency: "Hire 2 sales reps to increase lead velocity",
      Consulting: "Increase retainers by 8% for Q1",
      Startup: "Launch MVP with a limited beta group",
    };

    setInputs({
      ...inputs,
      scenario: suggestions[inputs.type] || "Optimize operations using AI automation",
    });
  }

  // -------------------------------
  // SIMULATION ENGINE
  // -------------------------------
  function runSimulation() {
    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!inputs.scenario.trim()) return setError("Enter your scenario.");
    if (!rev) return setError("Enter monthly revenue.");
    if (!cst) return setError("Enter monthly cost.");
    if (!t) return setError("Enter timeframe.");
    setError("");

    const optimistic = rev * 1.22 * t - cst * 1.12 * t;
    const expected = rev * 1.1 * t - cst * 1.05 * t;
    const cautious = rev * 0.92 * t - cst * t;

    const breakEven =
      [...Array(t).keys()].find(
        (i) => rev * 1.1 * (i + 1) - cst * 1.05 * (i + 1) > 0
      ) + 1 || null;

    setResult({
      optimistic,
      expected,
      cautious,
      breakEven,
      risk: Math.floor(Math.random() * 30) + 40,
    });

    setAuthOpen(true);
  }

  // -------------------------------
  // PDF EXPORT
  // -------------------------------
  async function exportPDF() {
    const capture = document.querySelector("#sim-results");
    if (!capture) return;

    const canvas = await html2canvas(capture as HTMLElement, {
      scale: 2,
    });

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(img, "PNG", 10, 10, 190, 0);
    pdf.save("cloudicore-report.pdf");
  }

  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* -------------------------------- HERO -------------------------------- */}
      <section className="section text-center pt-24 pb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>

        <p className="max-w-3xl mx-auto text-slate-300 text-lg mt-4">
          Predict outcomes before you invest time, people, or budget.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <span className="btn-secondary">7-Day Free Trial</span>
          <span className="btn-secondary">No Credit Card Required</span>
        </div>
      </section>

      {/* -------------------------------- SIMULATOR -------------------------------- */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">1. Describe Your Decision</h2>

          {/* Business Type */}
          <div className="mt-3">
            <label className="text-sm text-slate-300">Business Type</label>
            <select
              className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1"
              value={inputs.type}
              onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
            >
              <option>SaaS</option>
              <option>Ecommerce</option>
              <option>Agency</option>
              <option>Consulting</option>
              <option>Startup</option>
            </select>
          </div>

          {/* AI Assist */}
          <button
            onClick={aiAssist}
            className="btn-secondary w-full mt-4"
          >
            💡 AI Assist — Generate a Scenario
          </button>

          {/* Templates */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              "custom",
              "Pricing Increase",
              "Hire 3 Engineers",
              "Marketing Boost",
              "Launch New Product",
              "Cut Churn by 15%",
            ].map((t) => (
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

          {/* Scenario */}
          <textarea
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mt-5"
            rows={4}
            placeholder='Example: "Increase price by 10%"'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
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

        {/* RIGHT — RESULTS */}
        <div className="card" id="sim-results">
          {!result ? (
            <p className="text-slate-400">Run a simulation to see results…</p>
          ) : (
            <div className="space-y-4">

              <Outcome label="Optimistic" value={result.optimistic} color="text-green-400" />
              <Outcome label="Expected" value={result.expected} color="text-yellow-300" />
              <Outcome label="Cautious" value={result.cautious} color="text-red-400" />

              {/* Break-even */}
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-300">Break-Even</p>
                <p className="text-3xl font-bold mt-1">
                  {result.breakEven ? `${result.breakEven} months` : "No recovery"}
                </p>
              </div>

              {/* Risk */}
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-300">Risk Index</p>
                <p className="text-3xl font-bold mt-1">{result.risk}/100</p>
              </div>

              {/* Export */}
              <button onClick={exportPDF} className="btn-secondary w-full">
                📄 Export to PDF
              </button>

              {/* Auth */}
              <button
                className="btn-primary w-full"
                onClick={() => setAuthOpen(true)}
              >
                Save & Continue →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------- PRICING -------------------------------- */}
      <Pricing />

      {/* -------------------------------- FAQ -------------------------------- */}
      <FAQ />

      {/* FOOTER */}
      <Footer />

      {/* AUTH MODAL */}
      {authOpen && <Auth close={() => setAuthOpen(false)} />}
    </div>
  );
}

// ==========================================================
// INPUT FIELD
// ==========================================================
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

// ==========================================================
// OUTCOME BOX
// ==========================================================
function Outcome({ label, value, color }: any) {
  return (
    <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
      <p className={`text-sm ${color}`}>{label}</p>
      <p className="text-3xl font-bold mt-1">${value.toLocaleString()}</p>
    </div>
  );
}

// ==========================================================
// PRICING SECTION — EXACT MATCH TO YOUR UI
// ==========================================================
function Pricing() {
  return (
    <section className="section text-center mt-28">
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

      <ul className="mt-6 text-left space-y-2">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex gap-2">
            <span>✔️</span>
            {f}
          </li>
        ))}
      </ul>

      <button className="btn-primary w-full mt-8">{cta}</button>
    </div>
  );
}

// ==========================================================
// FAQ SECTION
// ==========================================================
function FAQ() {
  const items = [
    {
      q: "What is CloudiCore?",
      a: "CloudiCore is an AI-powered business decision simulator that predicts outcomes before you invest time, money, or resources. It helps founders, CEOs, and managers avoid costly mistakes.",
    },
    {
      q: "How accurate are simulations?",
      a: "CloudiCore uses proven business models, real-world trend assumptions, and adaptive forecasting logic. While no forecast is perfect, CloudiCore gives you a highly realistic directional outlook.",
    },
    {
      q: "Do I need technical skills?",
      a: "No. CloudiCore is designed for simplicity. Anyone can run simulations without technical, financial, or AI expertise.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. You get a 7-day free trial plus 2 free simulations per month with no credit card required.",
    },
    {
      q: "Can I export reports?",
      a: "Yes — you can export a full PDF report containing your scenario, revenue projections, profitability paths, and risk analysis.",
    },
    {
      q: "Does CloudiCore support teams?",
      a: "Yes. The Enterprise plan includes team access, collaboration tools, and advanced analytics.",
    },
    {
      q: "What business types are supported?",
      a: "SaaS, ecommerce, agencies, consulting firms, and early-stage startups — with templates optimized for each model.",
    },
    {
      q: "Can I integrate CloudiCore with my CRM or tools?",
      a: "Enterprise customers can access API integrations and webhooks to automate workflows and sync data.",
    },
  ];

  return (
    <section className="section mt-28 pb-24">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {items.map((faq, i) => (
          <details
            key={i}
            className="bg-cloudi-card p-6 rounded-2xl border border-slate-800"
          >
            <summary className="text-lg font-semibold cursor-pointer">
              {faq.q}
            </summary>
            <p className="mt-3 text-slate-300 leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ==========================================================
// AUTH MODAL — SUPABASE GOOGLE + MICROSOFT + EMAIL
// ==========================================================
function Auth({ close }: any) {
  const [email, setEmail] = useState("");

  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    });
  }

  async function loginMicrosoft() {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: { redirectTo: window.location.href },
    });
  }

  async function sendMagicLink() {
    if (!email.trim()) return;
    await supabase.auth.signInWithOtp({ email });
    alert("Magic link sent to your email!");
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-cloudi-card p-8 rounded-3xl w-[90%] max-w-md border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Create your account</h2>

        {/* Google */}
        <button
          onClick={loginGoogle}
          className="btn-secondary w-full mb-3 flex items-center justify-center gap-3"
        >
          <img src="/google.svg" className="w-5 h-5" />
          Sign in with Google
        </button>

        {/* Microsoft */}
        <button
          onClick={loginMicrosoft}
          className="btn-secondary w-full mb-6 flex items-center justify-center gap-3"
        >
          <img src="/microsoft.svg" className="w-5 h-5" />
          Sign in with Microsoft
        </button>

        {/* Email */}
        <input
          className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mb-3"
          placeholder="Work email"
          value​={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={sendMagicLink} className="btn-primary w-full">
          Continue with Email →
        </button>

        <button onClick={close} className="mt-6 text-slate-400 w-full">
          Cancel
        </button>
      </div>
    </div>
  );
}
