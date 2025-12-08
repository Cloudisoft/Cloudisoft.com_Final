// =====================================================
// CloudiCore.tsx — COMPLETE FINAL VERSION
// =====================================================

import { useState, useEffect } from "react";
import "../index.css";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "../supabaseClient";

// ==========================
// MAIN PAGE
// ==========================
export default function CloudiCore() {

  const [user, setUser] = useState<any>(null);

  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: "",
    cost: "",
    months: "",
    businessType: ""
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ==========================
  // AI ASSIST
  // ==========================
  function runAIAssist() {
    setAiLoading(true);
    setTimeout(() => {
      const templates: any = {
        SaaS: [
          "Increase subscription revenue by bundling premium features.",
          "Launch annual plan for higher cashflow.",
          "Offer AI add-ons to boost ARPU."
        ],
        "E-commerce": [
          "Increase conversions with discounted shipping.",
          "Upsell bundled product packs.",
          "Introduce loyalty points rewards."
        ],
        Agency: [
          "Raise retainers by 15%.",
          "Package premium consulting tiers.",
          "Productize recurring services."
        ]
      };

      const t = templates[inputs.businessType] || [];
      const v = t[Math.floor(Math.random() * t.length)] || "";

      setInputs({ ...inputs, scenario: v });
      setAiLoading(false);
    }, 700);
  }

  // ==========================
  // SIMULATION
  // ==========================
  function runSimulation() {

    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!user) return setAuthOpen(true);
    if (!inputs.scenario) return setError("Describe your decision.");
    if (!rev) return setError("Enter revenue.");
    if (!cst) return setError("Enter cost.");
    if (!t) return setError("Enter months.");

    setError("");

    const optimistic = rev * 1.22 * t - cst * 1.12 * t;
    const expected   = rev * 1.10 * t - cst * 1.05 * t;
    const cautious   = rev * 0.92  * t - cst * t;
    const breakEven  = expected > 0 ? Math.round(t / 1.5) : null;
    const risk       = Math.floor(Math.random() * 30) + 35;

    setResult({ optimistic, expected, cautious, breakEven, risk });

    // SAVE TO SUPABASE
    supabase
      .from("simulations")
      .insert({
        user_id: user.id,
        scenario: inputs.scenario,
        revenue: rev,
        cost: cst,
        months: t,
        results: { optimistic, expected, cautious, breakEven, risk }
      })
      .then(({ error }) => {
        if (error) console.log("SAVE ERROR:", error);
      });
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
  // UI
  // ==========================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* HEADER */}
      <section className="section text-center pt-24 pb-10">
        <h1 className="text-5xl font-extrabold">
          CloudiCore<br/>
          <span className="gradient-text">Decision Simulator</span>
        </h1>

        {user && (
          <p className="text-slate-400 mt-2 text-sm">Logged in: {user.email}</p>
        )}
      </section>


      {/* SIMULATOR */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Describe Your Decision</h2>

          <label className="text-sm text-slate-300">Business Type</label>
          <select
            className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mb-3"
            value={inputs.businessType}
            onChange={(e) => setInputs({ ...inputs, businessType: e.target.value })}
          >
            <option value="">Select type</option>
            <option value="SaaS">SaaS</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Agency">Agency</option>
          </select>

          <button className="btn-primary w-full mb-4" onClick={runAIAssist}>
            {aiLoading ? "Generating..." : "💡 AI Assist"}
          </button>

          <textarea
            rows={4}
            placeholder="Describe your decision..."
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mb-3"
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          {["revenue", "cost", "months"].map((f) => (
            <input
              key={f}
              className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mb-3"
              placeholder={f === "revenue"
                ? "Monthly revenue"
                : f === "cost"
                ? "Monthly cost"
                : "Timeframe (months)"}
              value={(inputs as any)[f]}
              onChange={(e) => setInputs({ ...inputs, [f]: e.target.value })}
            />
          ))}

          {error && <p className="text-red-400">{error}</p>}

          <button className="btn-primary w-full mt-2" onClick={runSimulation}>
            Run Simulation →
          </button>
        </div>


        {/* RESULTS */}
        <div className="card min-h-[300px]" id="sim-results">
          {!result ? (
            <p className="text-slate-400">Run a simulation...</p>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-2">Results</h2>
              <div className="text-xl">Optimistic: ₹{result.optimistic}</div>
              <div className="text-xl">Expected: ₹{result.expected}</div>
              <div className="text-xl">Cautious: ₹{result.cautious}</div>
              <div className="mt-2 text-lg">
                Break-even: {result.breakEven ? `${result.breakEven} months` : "No recovery"}
              </div>
              <div className="text-lg">Risk Index: {result.risk}/100</div>

              <button className="btn-secondary w-full mt-4" onClick={exportPDF}>
                Export PDF
              </button>
            </>
          )}
        </div>

      </section>


      {/* FULL PRICING SECTION */}
      <PricingSection />

      {/* FULL FAQ SECTION */}
      <FAQSection />

      {/* FOOTER */}
      <Footer />

      {authOpen && <AuthModal close={() => setAuthOpen(false)} />}
    </div>
  );
}



// =====================================================
// AUTH MODAL
// =====================================================
function AuthModal({ close }: any) {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass
    });
    setLoading(false);
    if (error) setError(error.message);
    else window.location.href = "/dashboard";
  }

  async function signupEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        emailRedirectTo: "https://cloudisoft.com/verified"
      }
    });
    setLoading(false);
    if (error) setError(error.message);
    else setError("Verification link sent!");
  }

  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "https://cloudisoft.com/auth/callback" }
    });
  }

  async function loginMicrosoft() {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: { redirectTo: "https://cloudisoft.com/auth/callback" }
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4">
      <div className="bg-cloudi-card p-8 rounded-3xl w-full max-w-md border border-slate-800 relative">

        <button className="absolute top-3 right-3" onClick={close}>✕</button>

        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <button className="btn-secondary w-full mb-3" onClick={loginGoogle}>
          Continue with Google
        </button>

        <button className="btn-secondary w-full mb-6" onClick={loginMicrosoft}>
          Continue with Microsoft
        </button>

        <input
          className="w-full p-3 bg-cloudi-card/60 rounded-xl border border-slate-800 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 bg-cloudi-card/60 rounded-xl border border-slate-800 mb-3"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button className="btn-primary w-full mb-3" onClick={loginEmail}>
          {loading ? "Processing..." : "Login"}
        </button>

        <button className="btn-secondary w-full" onClick={signupEmail}>
          {loading ? "Processing..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}



// =====================================================
// FULL PRICING SECTION
// =====================================================
function PricingSection() {
  return (
    <section className="section mt-24 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-3">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">

        {[
          {
            name: "Free",
            price: "0",
            features: ["2 simulations/month", "Basic reports", "Email support"],
            cta: "Start Free"
          },
          {
            name: "Starter",
            price: "19.99",
            features: [
              "10 simulations/month",
              "Summary reports",
              "Basic templates",
              "Email support"
            ],
            cta: "Start Starter"
          },
          {
            name: "Pro",
            price: "49.99",
            highlight: true,
            features: [
              "25 simulations/month",
              "Dashboard",
              "History",
              "Advanced templates",
              "Priority support"
            ],
            cta: "Upgrade to Pro"
          },
          {
            name: "Enterprise",
            price: "99.99",
            features: [
              "Unlimited simulations",
              "Team access",
              "Advanced analytics",
              "API access"
            ],
            cta: "Contact Sales"
          }
        ].map((p, i) => (
          <div
            key={i}
            className={`rounded-3xl p-8 border shadow-xl ${
              p.highlight
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                : "bg-cloudi-card border-slate-800"
            }`}
          >
            <h3 className="text-2xl font-bold">{p.name}</h3>
            <p className="text-4xl font-extrabold mt-3">
              ${p.price}
              <span className="text-lg opacity-70">/mo</span>
            </p>
            <ul className="mt-4 space-y-2 text-left text-sm">
              {p.features.map((f, idx) => (
                <li key={idx} className="flex gap-2">
                  <span>✔️</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full mt-6">{p.cta}</button>
          </div>
        ))}

      </div>
    </section>
  );
}



// =====================================================
// FULL FAQ SECTION
// =====================================================
function FAQSection() {
  const faqs = [
    {
      q: "How accurate are the simulations?",
      a: "It gives directional forecasts, helping you understand financial impact and risks."
    },
    {
      q: "Can I export results?",
      a: "Yes — simulations can be exported as PDF to share with your team."
    },
    {
      q: "Do you store my data?",
      a: "Yes — securely stored and tied to your authenticated Supabase account."
    },
    {
      q: "Can I upgrade later?",
      a: "You can upgrade to Pro or Enterprise anytime."
    }
  ];

  return (
    <section className="section mt-24">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800"
          >
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="text-slate-300 mt-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

