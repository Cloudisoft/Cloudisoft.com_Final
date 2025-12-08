// ==========================
// CloudiCore.tsx (FINAL WITH GOOGLE AUTH)
// ==========================
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
    // user is stored after callback in localStorage
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
          "Launch annual plan to increase cash flow.",
          "Add AI-powered add-ons to increase ARPU."
        ],
        "E-commerce": [
          "Boost ad budget on high ROI platforms.",
          "Introduce free shipping above ₹5000.",
          "Bundle products to increase AOV."
        ],
        Agency: [
          "Raise retainers by 15%.",
          "Introduce premium tier services.",
          "Remove low margin offerings."
        ],
        Startup: [
          "Add one adjacent product for early growth.",
          "Cut unnecessary softwares to reduce burn.",
          "Introduce early adoption pricing."
        ]
      };

      const goals: any = {
        growth: [
          "Focus on fast revenue scaling.",
          "Increase conversions with better acquisition.",
          "Move fast on expansion areas."
        ],
        profit: [
          "Increase contribution margins.",
          "Focus on sustainable recurring revenue.",
          "Optimize operating efficiency."
        ],
        stability: [
          "Prioritize steady recurring revenue.",
          "Reduce risk exposure.",
          "Maintain predictable outcomes."
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
  // UI
  // ==========================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">
      <section className="section text-center pt-24 pb-10">
        <h1 className="text-5xl font-extrabold">CloudiCore<br /><span className="gradient-text">Decision Simulator</span></h1>
        <p className="text-slate-300 mt-4 max-w-2xl mx-auto">Simulate business decisions before spending money, hiring, or changing strategy.</p>
        {user && <p className="mt-3 text-slate-400 text-sm">Logged in with Google</p>}
      </section>

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

              <button className="btn-secondary w-full mt-4" onClick={exportPDF}>Export to PDF</button>
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

// ==========================
// AUTH MODAL (REPLACED WITH GOOGLE)
// ==========================
function AuthModal({ close }: any) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div className="bg-cloudi-card p-8 rounded-3xl border border-slate-800 w-full max-w-md relative">
        <button className="absolute right-4 top-4 text-slate-400" onClick={close}>✕</button>
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <button className="btn-secondary w-full flex items-center justify-center gap-3 mb-3"
          onClick={loginWithGoogle}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-slate-400 text-sm mt-6 text-center">
          Secure login using Google OAuth
        </p>
      </div>
    </div>
  );
}

// ==========================
// PRICING SECTION / FAQ (UNCHANGED)
// ==========================
function PricingSection() { /* your function stays same */ }
function FAQSection() { /* your function stays same */ }
