import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ---------------- REGISTER CHART ----------------
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip
);

// ======================================================
// MAIN PAGE
// ======================================================
export default function CloudiCore() {
  // FORM inputs
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: "",
    cost: "",
    months: "",
  });

  const [template, setTemplate] = useState("custom");
  const [result, setResult] = useState<any>(null);

  const [authOpen, setAuthOpen] = useState(false);
  const [error, setError] = useState("");

  // ================================================
  // TEMPLATE PRESETS
  // ================================================
  function applyTemplate(t: string) {
    setTemplate(t);
    switch (t) {
      case "Pricing Increase":
        setInputs({
          ...inputs,
          scenario: "Increase product pricing by 12%",
          revenue: inputs.revenue || "20000",
        });
        break;
      case "Hiring Engineers":
        setInputs({
          ...inputs,
          scenario: "Hire 3 full-time engineers",
          cost: inputs.cost || "15000",
        });
        break;
      case "Marketing Boost":
        setInputs({
          ...inputs,
          scenario: "Increase marketing budget by 30%",
          cost: inputs.cost || "8000",
        });
        break;
      case "Expansion":
        setInputs({
          ...inputs,
          scenario: "Open a new regional branch",
          revenue: inputs.revenue || "30000",
        });
        break;
      default:
        break;
    }
  }

  // ======================================================
  // SIMULATION ENGINE
  // ======================================================
  function runSimulation() {
    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!inputs.scenario.trim()) return setError("Describe your scenario.");
    if (!rev) return setError("Revenue is required.");
    if (!cst) return setError("Cost is required.");
    if (!t || t <= 0) return setError("Timeframe required.");
    setError("");

    // growth model
    const optimistic = [];
    const expected = [];
    const cautious = [];

    for (let i = 1; i <= t; i++) {
      optimistic.push(rev * 1.22 ** i - cst * 1.1);
      expected.push(rev * 1.1 ** i - cst);
      cautious.push(rev * 0.92 ** i - cst * 1.05);
    }

    const breakEvenIdx = expected.findIndex((v) => v > 0);
    const breakEven = breakEvenIdx >= 0 ? breakEvenIdx + 1 : null;

    setResult({
      optimistic,
      expected,
      cautious,
      months: t,
      breakEven,
      risk: Math.floor(Math.random() * 30) + 40,
    });
  }

  // ======================================================
  // EXPORT PDF
  // ======================================================
  async function exportPDF() {
    const node = document.querySelector("#sim-results");
    if (!node) return;

    const canvas = await html2canvas(node as HTMLElement);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(img, "PNG", 8, 8, 195, 0);
    pdf.save("cloudicore_report.pdf");
  }

  // ======================================================
  // CHART DATA
  // ======================================================
  const chartData =
    result && {
      labels: Array.from({ length: result.months }, (_, i) => i + 1),
      datasets: [
        {
          label: "Optimistic",
          data: result.optimistic,
          borderColor: "#10b981",
          tension: 0.25,
        },
        {
          label: "Expected",
          data: result.expected,
          borderColor: "#eab308",
          tension: 0.25,
        },
        {
          label: "Cautious",
          data: result.cautious,
          borderColor: "#f87171",
          tension: 0.25,
        },
      ],
    };

  // ======================================================
  // PAGE UI
  // ======================================================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* HERO */}
      <section className="section text-center pt-24 pb-10">
        <h1 className="text-5xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-slate-300 text-lg">
          Predict outcomes before you commit budget, time, or headcount.
        </p>
      </section>

      {/* SIMULATOR */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Describe your decision</h2>

          {/* Templates */}
          <div className="flex gap-2 flex-wrap mb-4">
            {[
              "custom",
              "Pricing Increase",
              "Hiring Engineers",
              "Marketing Boost",
              "Expansion",
            ].map((t) => (
              <button
                key={t}
                className={`px-3 py-2 rounded-xl border text-sm ${
                  t === template
                    ? "bg-purple-500/20 border-purple-400"
                    : "border-slate-700"
                }`}
                onClick={() => applyTemplate(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Scenario */}
          <textarea
            rows={3}
            placeholder="Example: Increase price by 10%"
            className="w-full bg-cloudi-card/60 rounded-xl border border-slate-800 p-3"
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <Field label="Current monthly revenue" name="revenue" inputs={inputs} setInputs={setInputs} />
          <Field label="Main monthly cost" name="cost" inputs={inputs} setInputs={setInputs} />
          <Field label="Timeframe (months)" name="months" inputs={inputs} setInputs={setInputs} />

          <AIInput inputs={inputs} setInputs={setInputs} />

          {error && <p className="text-red-400 mt-2">{error}</p>}

          <button className="btn-primary w-full mt-4" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RESULTS */}
        <div className="card min-h-[300px]" id="sim-results">
          {!result ? (
            <p className="text-slate-400">
              Run a simulation to view projections
            </p>
          ) : (
            <>
              <ResultSummary result={result} />
              <Line className="mt-6" data={chartData as any} />
              <Actions exportPDF={exportPDF} openAuth={() => setAuthOpen(true)} />
            </>
          )}
        </div>
      </section>

      <Pricing />
      <FAQ />
      <Footer />

      {authOpen && <AuthModal close={() => setAuthOpen(false)} />}
    </div>
  );
}

// ======================================================
// REUSABLE COMPONENTS
// ======================================================
function Field({ label, name, inputs, setInputs }: any) {
  return (
    <div className="mt-3">
      <label className="text-sm text-slate-300">{label}</label>
      <input
        className="w-full bg-cloudi-card/60 rounded-xl border border-slate-800 p-3 mt-1"
        type="number"
        value={inputs[name]}
        onChange={(e) => setInputs({ ...inputs, [name]: e.target.value })}
      />
    </div>
  );
}

// ======================================================
// AI ASSIST
// ======================================================
function AIInput({ inputs, setInputs }: any) {
  return (
    <div className="mt-4">
      <label className="text-sm text-slate-300">AI Assist (optional)</label>
      <input
        className="w-full bg-cloudi-card/60 rounded-xl border border-slate-800 p-3 mt-1"
        placeholder='e.g. "Recommendation for subscription pricing"'
        onBlur={(e) =>
          setInputs({
            ...inputs,
            scenario: inputs.scenario + " | " + e.target.value,
          })
        }
      />
    </div>
  );
}

// ======================================================
// SIMULATION SUMMARY
// ======================================================
function ResultSummary({ result }: any) {
  return (
    <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
      <p className="text-sm text-slate-300">Break-even</p>
      <h2 className="text-3xl font-bold">
        {result.breakEven ? `${result.breakEven} months` : "No recovery"}
      </h2>
      <p className="mt-2 text-slate-300 text-sm">
        Risk Index: <span className="font-semibold">{result.risk}/100</span>
      </p>
    </div>
  );
}

// ======================================================
// RESULTS ACTIONS
// ======================================================
function Actions({ exportPDF, openAuth }: any) {
  return (
    <>
      <button className="btn-secondary w-full mt-6" onClick={exportPDF}>
        Export Simulation PDF 📦
      </button>
      <button className="btn-primary w-full mt-3" onClick={openAuth}>
        Save & Continue →
      </button>
    </>
  );
}

// ======================================================
// PRICING
// ======================================================
function Pricing() {
  return (
    <section className="section text-center mt-28">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>

      <p className="text-slate-400 mt-2 tracking-wide">
        Start free. Upgrade anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">

        <PriceCard name="Free" price="0" features={[
          "2 simulations / month",
          "Basic reports",
          "Email support",
        ]} cta="Start Free" />

        <PriceCard name="Starter" price="19.99" features={[
          "10 simulations / month",
          "Summary reports",
          "Basic templates",
          "Email support",
        ]} cta="Start Simulating" />

        <PriceCard highlight name="Pro" price="49.99" features={[
          "25 simulations / month",
          "Interactive dashboard",
          "Scenario history",
          "Advanced templates",
          "Priority support",
        ]} cta="Upgrade to Pro" />

        <PriceCard name="Enterprise" price="99.99" features={[
          "Unlimited simulations",
          "Team access",
          "Advanced analytics",
          "Custom templates",
          "API access",
          "Dedicated support",
        ]} cta="Talk to Sales" />
      </div>
    </section>
  );
}

function PriceCard({ name, price, features, cta, highlight }: any) {
  return (
    <div
      className={`p-8 rounded-3xl border shadow-xl ${
        highlight
          ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white"
          : "bg-cloudi-card border-slate-800"
      }`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-4xl font-extrabold mt-3">
        ${price}
        <span className="text-lg opacity-70">/mo</span>
      </p>

      <ul className="mt-6 space-y-2 text-left text-sm">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <span>✔️</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button className="btn-primary w-full mt-6">{cta}</button>
    </div>
  );
}

// ======================================================
// FAQ Section
// ======================================================
function FAQ() {
  const items = [
    {
      q: "How accurate are the simulations?",
      a: "CloudiCore uses adaptive business heuristics and growth curve models. Results are directional, not exact forecasts. Use them to make confident decisions—not predictions."
    },
    {
      q: "Do I need credit card for trial?",
      a: "No. You get full access to the CloudiCore simulator for 7 days with no credit card required."
    },
    {
      q: "Can I export reports?",
      a: "Yes. You can export your full simulation output as PDF, including graphs and scenario notes."
    },
    {
      q: "Is this for startups or enterprises?",
      a: "CloudiCore works for early stage startups, small businesses, and enterprise ops teams. Templates scale with complexity."
    },
    {
      q: "Do you provide team access?",
      a: "Yes. Enterprise plans include multi-user collaboration, account roles, and workspace sharing."
    },
    {
      q: "Does it integrate with CRM or ERP?",
      a: "API access (Enterprise) can connect to HubSpot, Salesforce, Zoho, SAP, or your internal BI systems."
    },
  ];

  return (
    <section className="section mt-28">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-5xl mx-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-cloudi-card/60 rounded-2xl border border-slate-800 p-6"
          >
            <h3 className="text-xl font-semibold">{item.q}</h3>
            <p className="mt-2 text-slate-300 text-sm leading-relaxed">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ======================================================
// Footer (no external import)
// ======================================================
function Footer() {
  return (
    <footer className="section text-center mt-28 pb-16 border-t border-slate-800/50 pt-10">
      <div className="grid md:grid-cols-3 text-left gap-8">

        <div>
          <h3 className="text-lg font-semibold text-purple-300">Cloudisoft</h3>
          <p className="mt-2 text-slate-400 text-sm max-w-xs">
            Intelligent AI automations & predictive decision tools.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-purple-300">Contact</h3>
          <p className="mt-2 text-slate-400 text-sm">
            connect@cloudisoft.com
            <br />
            +1 205-696-8477
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-purple-300">Location</h3>
          <p className="mt-2 text-slate-400 text-sm">
            473 Mundet Place
            <br />
            Hillside, NJ 07205
          </p>
        </div>
      </div>

      <p className="text-slate-500 text-sm mt-8">
        © 2025 Cloudisoft — All Rights Reserved.
      </p>
    </footer>
  );
}

// ======================================================
// Auth Modal (internal — no external file)
// ======================================================
function AuthModal({ close }: { close: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={close}
      />

      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        w-[95%] max-w-[420px] bg-cloudi-card p-8 rounded-3xl border border-slate-700
        shadow-2xl shadow-black/60 z-50"
      >
        <h2 className="text-2xl font-bold text-center">
          {mode === "signup" ? "Create Account" : "Welcome Back"}
        </h2>

        <div className="mt-6 space-y-3">
          <button className="btn-secondary w-full">Continue with Google</button>
          <button className="btn-secondary w-full">Continue with Microsoft</button>
        </div>

        <div className="text-center text-slate-500 text-sm mt-3">or</div>

        <input
          className="w-full bg-cloudi-card/60 rounded-xl border border-slate-700 p-3 mt-4"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-cloudi-card/60 rounded-xl border border-slate-700 p-3 mt-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary w-full mt-5">
          {mode === "signup" ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-center text-slate-400 text-sm mt-4">
          {mode === "signup" ? (
            <>
              Already registered?{" "}
              <span
                className="text-purple-300 cursor-pointer"
                onClick={() => setMode("login")}
              >
                Sign in
              </span>
            </>
          ) : (
            <>
              New here?{" "}
              <span
                className="text-purple-300 cursor-pointer"
                onClick={() => setMode("signup")}
              >
                Create account
              </span>
            </>
          )}
        </p>
      </div>
    </>
  );
}
