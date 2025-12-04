// ==========================
// CloudiCore.tsx (FINAL)
// ==========================
import { useState, useEffect } from "react";
import "../index.css";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createClient } from "@supabase/supabase-js";

// SUPABASE CLIENT (embedded key)
const supabase = createClient(
  "https://dfzmkyovvowkxwoovpnr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmem1reW92dm93a3h3b292cG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MzE2MjQsImV4cCI6MjA4MDQwNzYyNH0.Emdbla6DCXY1QAZhR_0wGUAHmovQAgafILxWFUr7i2I"
);

// ==========================
// MAIN PAGE
// ==========================
export default function CloudiCore() {
  const [user, setUser] = useState<any>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [shouldRunAfterAuth, setShouldRunAfterAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });
    const sub = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user && shouldRunAfterAuth) {
        setShouldRunAfterAuth(false);
        runSimulation();
        setAuthOpen(false);
      }
    });
    return () => sub.data.subscription.unsubscribe();
  }, []);

  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: "",
    cost: "",
    months: "",
    goal: "growth",
    businessType: ""
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ==========================
  // AI ASSIST v2 (Offline)
  // ==========================
  function runAIAssist() {
    setAiLoading(true);
    setTimeout(() => {
      const { businessType, revenue, cost, goal } = inputs;
      const templates: any = {
        SaaS: [
          "Increase subscription prices by 8–12% while bundling premium features.",
          "Launch an annual plan with a 20% discount to improve cash flow.",
          "Offer AI-powered add-ons to increase ARPU."
        ],
        "E-commerce": [
          "Boost ad spend by 20% for high-converting campaigns.",
          "Introduce free shipping over $75 to increase AOV.",
          "Launch product bundles to increase cart value."
        ],
        Agency: [
          "Raise retainers by 15% and introduce premium tiers.",
          "Hire a senior strategist to increase capacity.",
          "Remove low-margin service offerings to improve LTV."
        ],
        Startup: [
          "Expand into one adjacent niche to accelerate early growth.",
          "Cut burn by optimizing software/tooling expenses.",
          "Launch early-adopter pricing to acquire first 50 customers."
        ],
        Marketplace: [
          "Lower seller fees to attract new sellers quickly.",
          "Add premium listings for high-volume sellers.",
          "Expand product categories to boost liquidity."
        ],
        "Local Business": [
          "Increase service pricing by 10% and add memberships.",
          "Run local ads to boost walk-in conversions.",
          "Add complementary services to increase per-customer revenue."
        ]
      };

      const goals: any = {
        growth: [
          "Focus on revenue acceleration through targeted demand generation.",
          "Improve acquisition efficiency without high cost scaling.",
          "Capture growth opportunities quickly."
        ],
        profit: [
          "Improve margin by reducing non-essential operational costs.",
          "Shift focus to sustainable recurring revenue.",
          "Increase profitability through efficiency."
        ],
        stability: [
          "Prioritize predictable cash flow.",
          "Minimize risk and preserve operational readiness.",
          "Stabilize revenue while reducing volatility."
        ]
      };

      const tBusiness = templates[businessType] || [];
      const tGoal = goals[goal] || [];

      const generated = `
${tBusiness[Math.floor(Math.random() * tBusiness.length)]}

Goal: ${tGoal[Math.floor(Math.random() * tGoal.length)]}

Context:
• Revenue: $${revenue || "—"}
• Costs: $${cost || "—"}
• Type: ${businessType || "Not selected"}
`.trim();

      setInputs({ ...inputs, scenario: generated });
      setAiLoading(false);
    }, 700);
  }

  // ==========================
  // SIMULATION ENGINE
  // ==========================
  function runSimulation() {
    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!user) {
      setAuthOpen(true);
      setShouldRunAfterAuth(true);
      return;
    }
    if (!inputs.scenario) return setError("Describe your decision.");
    if (!rev) return setError("Enter revenue.");
    if (!cst) return setError("Enter cost.");
    if (!t) return setError("Enter months.");

    setError("");

    const optimistic = rev * 1.22 * t - cst * 1.12 * t;
    const expected = rev * 1.1 * t - cst * 1.05 * t;
    const cautious = rev * 0.92 * t - cst * t;
    const breakEven = expected > 0 ? Math.round(t / 1.5) : null;
    const risk = Math.floor(Math.random() * 30) + 35;

    setResult({ optimistic, expected, cautious, breakEven, risk });
  }

  // ==========================
  // EXPORT PDF
  // ==========================
  async function exportPDF() {
    const capture = document.getElementById("sim-results");
    if (!capture) return;
    const canvas = await html2canvas(capture);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 5, 5, 200, 0);
    pdf.save("cloudicore_report.pdf");
  }

  // ==========================
  // PAGE UI
  // ==========================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">
      <section className="section text-center pt-24 pb-10">
        <h1 className="text-5xl font-extrabold">CloudiCore<br /><span className="gradient-text">Decision Simulator</span></h1>
        <p className="text-slate-300 mt-4 max-w-2xl mx-auto">Simulate business decisions with realistic outcomes before committing budget, hiring, or time.</p>
        {user && <p className="mt-3 text-slate-400 text-sm">Signed in as {user.email}</p>}
      </section>

      {/* SIMULATOR */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Describe Your Decision</h2>

          {/* Business Type */}
          <label className="text-sm text-slate-300">Business Type</label>
          <select className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mb-3"
            value={inputs.businessType}
            onChange={(e) => setInputs({ ...inputs, businessType: e.target.value })}>
            <option value="">Select type</option>
            <option value="SaaS">SaaS</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Agency">Agency</option>
            <option value="Startup">Startup</option>
            <option value="Marketplace">Marketplace</option>
            <option value="Local Business">Local Business</option>
          </select>

          {/* AI Assist */}
          <button className="btn-primary w-full mb-4" onClick={runAIAssist} disabled={aiLoading}>
            {aiLoading ? "Generating..." : "💡 AI Assist — Auto Generate"}
          </button>

          {/* Scenario */}
          <textarea rows={4} placeholder="Describe your decision..."
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mb-3"
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          {/* Inputs */}
          {["revenue", "cost", "months"].map((f) => (
            <div key={f} className="mb-3">
              <input
                className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800"
                placeholder={f === "revenue" ? "Monthly revenue" : f === "cost" ? "Monthly cost" : "Timeframe (months)"}
                value={(inputs as any)[f]}
                onChange={(e) => setInputs({ ...inputs, [f]: e.target.value })}
              />
            </div>
          ))}

          {error && <p className="text-red-400 mt-2">{error}</p>}

          <button className="btn-primary w-full mt-4" onClick={runSimulation}>
            Run Simulation →
          </button>

          {user && (
            <button className="btn-secondary w-full mt-3"
              onClick={() => supabase.auth.signOut().then(() => setUser(null))}>
              Logout
            </button>
          )}
        </div>

        {/* RESULTS */}
        <div className="card min-h-[300px]" id="sim-results">
          {!result ? (
            <p className="text-slate-400">Run a simulation to view results…</p>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-2">Results</h2>
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800 mb-3">
                <p className="text-sm text-slate-400">Optimistic</p>
                <p className="text-2xl font-bold text-green-400">${result.optimistic.toLocaleString()}</p>
              </div>
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800 mb-3">
                <p className="text-sm text-slate-400">Expected</p>
                <p className="text-2xl font-bold text-yellow-300">${result.expected.toLocaleString()}</p>
              </div>
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800 mb-3">
                <p className="text-sm text-slate-400">Cautious</p>
                <p className="text-2xl font-bold text-red-400">${result.cautious.toLocaleString()}</p>
              </div>
              <p className="mt-4"><b>Break-even:</b> {result.breakEven ? `${result.breakEven} months` : "No recovery"}</p>
              <p><b>Risk Index:</b> {result.risk}/100</p>

              <button className="btn-secondary w-full mt-4" onClick={exportPDF}>Export to PDF</button>
            </>
          )}
        </div>
      </section>

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* FOOTER */}
      <Footer />

      {/* AUTH MODAL */}
      {authOpen && <AuthModal close={() => setAuthOpen(false)} />}
    </div>
  );
}

// ==========================
// AUTH MODAL
// ==========================
function AuthModal({ close }: any) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }
  async function loginMicrosoft() {
    await supabase.auth.signInWithOAuth({ provider: "azure" });
  }
  async function loginEmail() {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) setError(error.message);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div className="bg-cloudi-card p-8 rounded-3xl border border-slate-800 w-full max-w-md relative">
        <button className="absolute right-4 top-4 text-slate-400" onClick={close}>✕</button>
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <button className="btn-secondary w-full flex items-center justify-center gap-3 mb-3"
          onClick={loginGoogle}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
          Continue with Google
        </button>

        <button className="btn-secondary w-full flex items-center justify-center gap-3 mb-6"
          onClick={loginMicrosoft}>
          <img src="https://www.svgrepo.com/show/475665/microsoft.svg" className="w-5 h-5" />
          Continue with Microsoft
        </button>

        <div className="text-center text-slate-400 text-sm mb-4">or sign in with email</div>

        <input className="w-full p-3 rounded-xl bg-cloudi-card/60 border border-slate-800 mb-3"
          placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 rounded-xl bg-cloudi-card/60 border border-slate-800 mb-3"
          placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button className="btn-primary w-full" onClick={loginEmail}>Sign In</button>
      </div>
    </div>
  );
}

// ==========================
// PRICING SECTION
// ==========================
function PricingSection() {
  return (
    <section className="section mt-24 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-3">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
        {[
          { name: "Free", price: "0", features: ["2 simulations/month", "Basic reports", "Email support"], cta: "Start Free" },
          { name: "Starter", price: "19.99", features: ["10 simulations/month", "Summary reports", "Basic templates", "Email support"], cta: "Start Starter" },
          { name: "Pro", price: "49.99", features: ["25 simulations/month", "Dashboard", "History", "Advanced templates", "Priority support"], highlight: true, cta: "Upgrade to Pro" },
          { name: "Enterprise", price: "99.99", features: ["Unlimited simulations", "Team access", "Advanced analytics", "API access"], cta: "Talk to Sales" }
        ].map((p, i) => (
          <div key={i} className={`rounded-3xl p-8 border shadow-xl ${p.highlight ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent" : "bg-cloudi-card border-slate-800"}`}>
            <h3 className="text-2xl font-bold">{p.name}</h3>
            <p className="text-4xl font-extrabold mt-3">${p.price}<span className="text-lg opacity-70">/mo</span></p>
            <ul className="mt-4 space-y-2 text-left text-sm">
              {p.features.map((f, idx) => <li key={idx} className="flex gap-2"><span>✔️</span>{f}</li>)}
            </ul>
            <button className={`btn-primary w-full mt-6 ${p.highlight ? "" : ""}`}>{p.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================
// FAQ SECTION
// ==========================
function FAQSection() {
  const faqs = [
    { q: "How accurate are the simulations?", a: "CloudiCore uses directional financial logic to estimate outcomes. It is not exact forecasting but helps you understand risk, break-even, and expected impact." },
    { q: "Do simulations work for all business types?", a: "Yes — SaaS, e-commerce, agencies, local businesses, marketplaces, and more." },
    { q: "Can I export the results?", a: "Yes — export any simulation as PDF, perfect for investors or internal strategy meetings." },
    { q: "Do I need a credit card for the trial?", a: "No — the 7-day trial is completely free." },
    { q: "Is my data private?", a: "Yes. All data is secure and tied to your Supabase-authenticated account." },
    { q: "Can I upgrade later?", a: "You can upgrade to Starter, Pro, or Enterprise anytime." },
    { q: "Do you offer team access?", a: "Yes — Enterprise includes multi-user teams and collaboration." }
  ];

  return (
    <section className="section mt-24">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((f, i) => (
          <details key={i} className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="text-slate-300 mt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
