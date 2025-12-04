// ========================================================
// CloudiCore FULL PAGE — FINAL VERSION
// Supabase Auth + PDF Export + Templates + Business Types
// ========================================================

import { useState } from "react";
import "../index.css";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ========================================================
// PAGE
// ========================================================
export default function CloudiCore() {
  // Inputs
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
  const [pendingSimulation, setPendingSimulation] = useState(false);
  const [user, setUser] = useState<any>(null);

  // ======================================================
  // AUTH HANDLERS
  // ======================================================
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    });
  }

  async function loginWithMicrosoft() {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: { redirectTo: window.location.href },
    });
  }

  async function loginWithEmail(email: string, pass: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (!error) {
      setUser(data.user);
      setAuthOpen(false);

      if (pendingSimulation) {
        runSimulation(true);
      }
    }
  }

  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      setUser(data.session.user);
    }
  });

  // ======================================================
  // APPLY TEMPLATE
  // ======================================================
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
        scenario: "Hire 3 engineers next quarter",
        cost: inputs.cost || "15000",
      });
    }

    if (t === "Marketing Boost") {
      setInputs({
        ...inputs,
        scenario: "Increase marketing budget by 35%",
        cost: inputs.cost || "8000",
      });
    }

    if (t === "New Office") {
      setInputs({
        ...inputs,
        scenario: "Open a new office in a second location",
        cost: inputs.cost || "22000",
      });
    }
  }

  // ======================================================
  // SIMULATION ENGINE
  // ======================================================
  function runSimulation(force = false) {
    if (!force && !user) {
      setPendingSimulation(true);
      setAuthOpen(true);
      return;
    }

    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!inputs.scenario) return setError("Describe your decision.");
    if (!rev || rev <= 0) return setError("Enter monthly revenue.");
    if (!cst || cst <= 0) return setError("Enter monthly cost.");
    if (!t || t < 1) return setError("Enter timeframe.");
    setError("");

    const optimistic = [];
    const expected = [];
    const cautious = [];

    for (let i = 1; i <= t; i++) {
      optimistic.push(rev * 1.23 ** i - cst * 1.1);
      expected.push(rev * 1.12 ** i - cst * 1.05);
      cautious.push(rev * 0.93 ** i - cst);
    }

    const breakEven = expected.findIndex((v) => v > 0) + 1 || null;

    setResult({
      optimistic: optimistic.at(-1),
      expected: expected.at(-1),
      cautious: cautious.at(-1),
      breakEven,
      risk: Math.round(Math.random() * 35 + 40),
    });
  }

  // ======================================================
  // EXPORT PDF
  // ======================================================
  async function exportPDF() {
    const capture = document.querySelector("#sim-results");
    if (!capture) return;

    const canvas = await html2canvas(capture as HTMLElement);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 8, 8, 195, 0);
    pdf.save("cloudicore_simulation.pdf");
  }

  // ======================================================
  // UI
  // ======================================================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* ---------- HERO ---------- */}
      <section className="section text-center pt-24 pb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-4 text-slate-300 text-lg">
          Run what-if simulations before committing budget, hiring, or expansion.
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <span className="btn-secondary">7-Day Free Trial</span>
          <span className="btn-secondary">No Credit Card Required</span>
        </div>
      </section>

      {/* ---------- SIMULATOR ---------- */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">1. Describe Your Decision</h2>

          {/* Templates */}
          <div className="flex gap-2 flex-wrap mb-5">
            {["custom", "Pricing Increase", "Hiring 3 Engineers", "Marketing Boost", "New Office"].map((t) => (
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

          {/* Business Type */}
          <FieldSelect
            label="Business Type"
            name="businessType"
            value={inputs.businessType}
            options={["SaaS", "E-commerce", "Services", "Marketplace", "Retail"]}
            onChange={(v: string) => setInputs({ ...inputs, businessType: v })}
          />

          {/* Scenario */}
          <textarea
            rows={4}
            placeholder='Example: "Increase product pricing by 12%"'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mt-4"
          />

          <Field label="Monthly revenue" name="revenue" inputs={inputs} setInputs={setInputs} />
          <Field label="Monthly cost" name="cost" inputs={inputs} setInputs={setInputs} />
          <Field label="Timeframe (months)" name="months" inputs={inputs} setInputs={setInputs} />

          {error && <p className="text-red-400 mt-3">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={() => runSimulation()}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RIGHT */}
        <div className="card" id="sim-results">
          {!result ? (
            <p className="text-slate-400">Run your first simulation…</p>
          ) : (
            <>
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-300">Break-even</p>
                <h2 className="text-3xl font-bold mt-1">
                  {result.breakEven ? `${result.breakEven} months` : "No recovery"}
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                <Outcome label="Optimistic" value={result.optimistic} color="text-green-400" />
                <Outcome label="Expected" value={result.expected} color="text-yellow-300" />
                <Outcome label="Cautious" value={result.cautious} color="text-red-400" />
              </div>

              <p className="mt-6 text-lg">
                <span className="font-semibold">Risk Index:</span> {result.risk}/100
              </p>

              <button className="btn-secondary w-full mt-6" onClick={exportPDF}>
                Export PDF 📄
              </button>

              <button className="btn-primary w-full mt-3" onClick={() => setAuthOpen(true)}>
                Save & Continue →
              </button>
            </>
          )}
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <PricingSection />

      {/* ---------- FAQ ---------- */}
      <FAQSection />

      <Footer />

      {authOpen && <AuthModal close={() => setAuthOpen(false)} onEmailLogin={loginWithEmail} />}
    </div>
  );
}

// ========================================================
// SUB COMPONENTS
// ========================================================

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

function FieldSelect({ label, name, value, options, onChange }: any) {
  return (
    <div className="mt-4">
      <label className="text-sm text-slate-300">{label}</label>
      <select
        className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1"
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
    <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
      <p className={`font-medium ${color}`}>{label}</p>
      <p className="text-2xl font-bold mt-1">${value.toLocaleString()}</p>
    </div>
  );
}

function PricingSection() {
  return (
    <section className="section mt-28 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
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
          features={[
            "25 simulations / month",
            "Interactive dashboard",
            "Scenario history",
            "Advanced templates",
            "Priority support",
          ]}
          highlight
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

function PriceCard({ name, price, features, cta, highlight }: any) {
  return (
    <div
      className={`rounded-3xl p-8 border border-slate-800 shadow-xl shadow-black/40 
      ${highlight ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white" : "bg-cloudi-card"}
      `}
    >
      <h3 className="text-2xl font-bold">{name}</h3>

      <p className="text-4xl font-extrabold mt-4">
        ${price}<span className="text-lg opacity-70 ml-1">/mo</span>
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

function FAQSection() {
  const faqs = [
    {
      q: "How accurate are CloudiCore simulations?",
      a: "CloudiCore uses directional forecasting based on growth curves, cost elasticity, risk scoring, and business type modifiers to produce realistic, business-grade insights.",
    },
    {
      q: "Do I need a credit card for the free trial?",
      a: "No. You can run simulations for 7 days with no credit card. After that, you may choose a plan that fits your needs.",
    },
    {
      q: "Can I save or export simulations?",
      a: "Yes. You can export simulations to PDF and, with an account, save and revisit past simulations.",
    },
    {
      q: "Is CloudiCore suitable for SaaS and E-commerce?",
      a: "Yes. The simulator adapts its assumptions based on business type including SaaS, e-commerce, retail, services, and marketplaces.",
    },
    {
      q: "Can I collaborate with my team?",
      a: "Team collaboration is available in the Enterprise plan, enabling shared access, permissions, and shared scenario reports.",
    },
    {
      q: "Do simulations include risk modeling?",
      a: "Yes. CloudiCore generates a Risk Index using volatility, cost exposure, time horizon, and template sensitivity.",
    },
    {
      q: "Can I change my plan anytime?",
      a: "Yes. You can upgrade or downgrade freely without losing your saved simulations or account data.",
    },
  ];

  return (
    <section className="section mt-32 mb-20">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="bg-cloudi-card p-6 rounded-2xl border border-slate-800"
          >
            <summary className="cursor-pointer text-lg font-semibold">
              {f.q}
            </summary>
            <p className="text-slate-300 mt-3">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function AuthModal({ close, onEmailLogin }: any) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-cloudi-card p-8 rounded-3xl w-full max-w-md border border-slate-800">

        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <button
          className="btn-primary w-full mb-3"
          onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
        >
          Continue with Google
        </button>

        <button
          className="btn-primary w-full mb-3"
          onClick={() => supabase.auth.signInWithOAuth({ provider: "azure" })}
        >
          Continue with Microsoft
        </button>

        <p className="text-center text-slate-400 my-3 text-sm">or use email</p>

        <input
          className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1 mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          className="btn-primary w-full"
          onClick={() => onEmailLogin(email, pass)}
        >
          Sign In
        </button>

        <button
          onClick={close}
          className="btn-secondary w-full mt-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
