// =====================================================
// CloudiCore.tsx (COMPLETE WITH GOOGLE AUTH)
// =====================================================
import { useState, useEffect } from "react";
import "../index.css";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ==========================
// GOOGLE AUTH CONFIG
// ==========================
const CLIENT_ID =
  "757924400568-0at91ohkm7hau66gm2od6lta14kc27tu.apps.googleusercontent.com";

const redirectURI = "https://cloudisoft.com/auth/callback";

// Google Login Function
function loginWithGoogle() {
  const authURL =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" +
    CLIENT_ID +
    "&redirect_uri=" +
    redirectURI +
    "&response_type=code" +
    "&scope=openid%20email%20profile";

  window.location.href = authURL;
}

// ==========================
// MAIN PAGE
// ==========================
export default function CloudiCore() {
  const [user, setUser] = useState<any>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [shouldRunAfterAuth, setShouldRunAfterAuth] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("cloudicore_user");
    if (storedUser) setUser(JSON.parse(storedUser));
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
  // AI ASSIST (OFFLINE)
  // ==========================
  function runAIAssist() {
    setAiLoading(true);
    setTimeout(() => {
      const { businessType, revenue, cost, goal } = inputs;

      const templates: any = {
        SaaS: [
          "Increase subscription prices while bundling premium features.",
          "Launch annual plan to improve cash flow.",
          "Introduce AI-powered add-ons."
        ],
        "E-commerce": [
          "Increase ad spend on high-converting products.",
          "Offer free shipping above ₹5000.",
          "Bundle products to increase cart value."
        ],
        Agency: [
          "Increase retainers by 10–15%.",
          "Offer premium strategic tier services.",
          "Remove low-margin service lines."
        ],
        Startup: [
          "Launch early adopter offer.",
          "Cut unnecessary SaaS spend.",
          "Focus on rapid customer interviews."
        ]
      };

      const goals: any = {
        growth: [
          "Improve acquisition efficiency.",
          "Accelerate growth through targeted campaigns.",
          "Deploy scalable demand generation."
        ],
        profit: [
          "Improve operational efficiency.",
          "Reduce unnecessary monthly expenses.",
          "Increase product margins."
        ],
        stability: [
          "Focus on recurring predictable revenue.",
          "Minimize risk exposure.",
          "Smooth out volatility in revenue."
        ]
      };

      const tBusiness = templates[businessType] || [];
      const tGoal = goals[goal] || [];

      const generated = `
${tBusiness[Math.floor(Math.random() * tBusiness.length)]}

Goal: ${tGoal[Math.floor(Math.random() * tGoal.length)]}

Context:
• Revenue: ₹${revenue || "—"}
• Costs: ₹${cost || "—"}
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
    if (!user) {
      setAuthOpen(true);
      setShouldRunAfterAuth(true);
      return;
    }

    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

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
        <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
          Simulate financial outcomes before spending money, hiring, or making strategic decisions.
        </p>
        {user && <p className="mt-3 text-slate-400 text-sm">Logged in with Google</p>}
      </section>

      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Describe Your Decision</h2>

          <label className="text-sm text-slate-300">Business Type</label>
          <select className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mb-3"
            value={inputs.businessType}
            onChange={(e) => setInputs({ ...inputs, businessType: e.target.value })}>
            <option value="">Select type</option>
            <option value="SaaS">SaaS</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Agency">Agency</option>
            <option value="Startup">Startup</option>
          </select>

          <button className="btn-primary w-full mb-4" onClick={runAIAssist} disabled={aiLoading}>
            {aiLoading ? "Generating..." : "💡 AI Assist — Auto Generate"}
          </button>

          <textarea rows={4} placeholder="Describe your decision..."
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800 mb-3"
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

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
                <p className="text-2xl font-bold text-green-400">{result.optimistic}</p>
              </div>
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800 mb-3">
                <p className="text-sm text-slate-400">Expected</p>
                <p className="text-2xl font-bold text-yellow-300">{result.expected}</p>
              </div>
              <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800 mb-3">
                <p className="text-sm text-slate-400">Cautious</p>
                <p className="text-2xl font-bold text-red-400">{result.cautious}</p>
              </div>
              <p className="mt-4"><b>Break-even:</b> {result.breakEven ? `${result.breakEven} months` : "No recovery"}</p>
              <p><b>Risk Index:</b> {result.risk}/100</p>

              <button className="btn-secondary w-full mt-4" onClick={exportPDF}>
                Export to PDF
              </button>
            </>
          )}
        </div>
      </section>

      <PricingSection />
      <FAQSection />
      <Footer />

      {authOpen && <AuthModal close={() => setAuthOpen(false)} />}
    </div>
  );
}
// SAVE TO DATABASE
const { error } = await supabase
  .from("simulations")
  .insert({
    user_id: user.id,
    scenario: inputs.scenario,
    revenue: rev,
    cost: cst,
    months: t,
    results: {
      optimistic,
      expected,
      cautious,
      breakEven,
      risk
    }
  });

if (error) console.log("SAVE ERROR:", error);


// ==========================
// AUTH MODAL (FINAL VERSION)
// ==========================
function AuthModal({ close }: any) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------
  // LOGIN USING EMAIL
  // -----------------------
  async function loginEmail() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    setLoading(false);
    if (error) setError(error.message);
    else window.location.href = "/dashboard";
  }

  // -----------------------
  // SIGNUP NEW USER
  // -----------------------
  async function signupEmail() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        emailRedirectTo: "https://cloudisoft.com/verified",
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setError("Signup successful! Check email to verify.");
  }

  // -----------------------
  // GOOGLE LOGIN
  // -----------------------
  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cloudisoft.com/auth/callback",
      },
    });
  }

  // -----------------------
  // MICROSOFT LOGIN
  // -----------------------
  async function loginMicrosoft() {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: "https://cloudisoft.com/auth/callback",
      },
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div className="bg-cloudi-card p-8 rounded-3xl border border-slate-800 w-full max-w-md relative">
        
        {/* CLOSE MODAL BUTTON */}
        <button className="absolute right-4 top-4 text-slate-400" onClick={close}>✕</button>

        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* GOOGLE LOGIN */}
        <button
          className="btn-secondary w-full flex items-center justify-center gap-3 mb-3"
          onClick={loginGoogle}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="" />
          Continue with Google
        </button>

        {/* MICROSOFT LOGIN */}
        <button
          className="btn-secondary w-full flex items-center justify-center gap-3 mb-6"
          onClick={loginMicrosoft}
        >
          <img src="https://www.svgrepo.com/show/475665/microsoft.svg" className="w-5 h-5" alt="" />
          Continue with Microsoft
        </button>

        <div className="text-center text-slate-400 text-sm mb-4">or login with Email</div>

        {/* EMAIL INPUT */}
        <input
          className="w-full p-3 rounded-xl bg-cloudi-card/60 border border-slate-800 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD INPUT */}
        <input
          className="w-full p-3 rounded-xl bg-cloudi-card/60 border border-slate-800 mb-3"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {/* ERROR HANDLING */}
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        {/* LOGIN BUTTON */}
        <button
          className="btn-primary w-full mb-3"
          onClick={loginEmail}
          disabled={loading}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        {/* SIGNUP BUTTON */}
        <button
          className="btn-secondary w-full"
          onClick={signupEmail}
          disabled={loading}
        >
          {loading ? "Processing..." : "Create Account"}
        </button>

        <p className="text-slate-400 text-sm mt-6 text-center">
          Secure login provided by Supabase
        </p>
      </div>
    </div>
  );
}

// ==========================
// PRICING SECTION (FULL)
// ==========================
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
            features: [
              "2 simulations/month",
              "Basic reports",
              "Email support",
            ],
            cta: "Start Free",
          },
          {
            name: "Starter",
            price: "19.99",
            features: [
              "10 simulations/month",
              "Summary reports",
              "Basic templates",
              "Email support",
            ],
            cta: "Start Starter",
          },
          {
            name: "Pro",
            price: "49.99",
            features: [
              "25 simulations/month",
              "Dashboard",
              "History",
              "Advanced templates",
              "Priority support",
            ],
            highlight: true,
            cta: "Upgrade to Pro",
          },
          {
            name: "Enterprise",
            price: "99.99",
            features: [
              "Unlimited simulations",
              "Team access",
              "Advanced analytics",
              "API access",
            ],
            cta: "Talk to Sales",
          },
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

// ==========================
// FAQ SECTION (FULL)
// ==========================
function FAQSection() {
  const faqs = [
    {
      q: "How accurate are the simulations?",
      a: "CloudiCore estimates financial outcomes directionally. It's not precise forecasting but gives reliable strategic insights.",
    },
    {
      q: "Do simulations work for all business types?",
      a: "Yes — SaaS, e-commerce, agencies, startups and more.",
    },
    {
      q: "Can I export the results?",
      a: "Yes — you can export as PDF for sharing with teammates or investors.",
    },
    {
      q: "Do I need a credit card for the trial?",
      a: "No — you can start for free and upgrade anytime.",
    },
    {
      q: "Is my data private?",
      a: "Yes — your data is stored securely and not shared.",
    },
    {
      q: "Can I upgrade later?",
      a: "Yes — upgrade at any time.",
    },
    {
      q: "Do you offer team access?",
      a: "Yes — Enterprise includes multi-user access.",
    },
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


