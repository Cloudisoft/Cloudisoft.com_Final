import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// ===============================================
// CLOUDICORE PAGE
// ===============================================
export default function CloudiCore() {
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

  // =========================================
  // APPLY BUSINESS TEMPLATES
  // =========================================
  function applyTemplate(t: string) {
    setTemplate(t);
    switch (t) {
      case "Pricing Increase":
        setInputs({
          ...inputs,
          scenario: "Increase pricing by 12%",
          revenue: inputs.revenue || "20000",
        });
        break;
      case "Hiring Engineers":
        setInputs({
          ...inputs,
          scenario: "Hire 3 engineers next quarter",
          cost: inputs.cost || "15000",
        });
        break;
      case "Marketing Boost":
        setInputs({
          ...inputs,
          scenario: "Increase ad spend by 30%",
          cost: inputs.cost || "8000",
        });
        break;
      case "Expansion":
        setInputs({
          ...inputs,
          scenario: "Open a new branch / location",
          revenue: inputs.revenue || "25000",
        });
        break;
      default:
        break;
    }
  }

  // =========================================
  // SIMULATION ENGINE (No Charts)
  // =========================================
  function runSimulation() {
    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!inputs.scenario.trim()) return setError("Describe your decision.");
    if (!rev) return setError("Revenue is required.");
    if (!cst) return setError("Cost is required.");
    if (!t) return setError("Timeframe required.");
    setError("");

    // Simple growth curve
    const optimistic = rev * 1.25 - cst * 1.05;
    const expected = rev * 1.12 - cst;
    const cautious = rev * 0.92 - cst;

    const breakEven = optimistic > 0 ? Math.ceil(Math.abs(cst / rev)) : null;
    const risk = Math.floor(Math.random() * 35) + 40;

    setResult({
      optimistic,
      expected,
      cautious,
      breakEven,
      risk,
    });
  }

  // =========================================
  // EXPORT PDF
  // =========================================
  async function exportPDF() {
    const node = document.querySelector("#sim-results");
    if (!node) return;

    const canvas = await html2canvas(node as HTMLElement);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 8, 8, 195, 0);
    pdf.save("cloudicore_report.pdf");
  }

  // =========================================
  // UI
  // =========================================
  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* HERO */}
      <section className="section text-center pt-24 pb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Business Decision Simulator</span>
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-slate-300 text-lg">
          Predict outcomes before spending money or hiring people.
        </p>
      </section>

      {/* SIMULATOR SECTION */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">1. Describe Your Decision</h2>

          {/* TEMPLATE BUTTONS */}
          <div className="flex gap-2 flex-wrap mb-5">
            {[
              "custom",
              "Pricing Increase",
              "Hiring Engineers",
              "Marketing Boost",
              "Expansion",
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

          {/* SCENARIO INPUT */}
          <textarea
            className="w-full bg-cloudi-card/60 rounded-xl p-4 border border-slate-800"
            rows={4}
            placeholder='Example: "Increase pricing by 10%"'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <Field label="Current monthly revenue" name="revenue" inputs={inputs} setInputs={setInputs} />
          <Field label="Main monthly cost" name="cost" inputs={inputs} setInputs={setInputs} />
          <Field label="Timeframe (months)" name="months" inputs={inputs} setInputs={setInputs} />

          {/* AI ASSIST INPUT */}
          <AIInput inputs={inputs} setInputs={setInputs} />

          {error && <p className="text-red-400 mt-2">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RESULTS PANEL */}
        <div className="card min-h-[260px]" id="sim-results">
          {!result ? (
            <p className="text-slate-400">Run a simulation to see results</p>
          ) : (
            <SimulationResult result={result} />
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

// =====================================================================
// COMPONENTS
// =====================================================================
function Field({ label, name, inputs, setInputs }: any) {
  return (
    <div className="mt-4">
      <label className="text-sm text-slate-300">{label}</label>
      <input
        className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1"
        type="number"
        placeholder="Enter value"
        value={inputs[name]}
        onChange={(e) => setInputs({ ...inputs, [name]: e.target.value })}
      />
    </div>
  );
}

// =========================================
// AI Assist
// =========================================
function AIInput({ inputs, setInputs }: any) {
  return (
    <div className="mt-4">
      <label className="text-sm text-slate-300">AI Assist (optional)</label>
      <input
        className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1"
        placeholder='E.g. "Suggest pricing strategy"'
        onBlur={(e) =>
          setInputs({
            ...inputs,
            scenario:
              inputs.scenario + (inputs.scenario ? " — " : "") + e.target.value,
          })
        }
      />
    </div>
  );
}

// =========================================
// RESULT COMPONENT (NO CHARTS)
// =========================================
function SimulationResult({ result }: any) {
  return (
    <>
      <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
        <p className="text-sm text-slate-300">Break-even</p>
        <h2 className="text-3xl font-bold mt-1">
          {result.breakEven ? `${result.breakEven} months` : "No recovery predicted"}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <Outcome label="Optimistic" value={result.optimistic} color="text-green-400" />
        <Outcome label="Expected" value={result.expected} color="text-yellow-300" />
        <Outcome label="Cautious" value={result.cautious} color="text-red-400" />
      </div>

      <p className="mt-6 text-lg">
        <span className="font-semibold">Risk Index:</span> {result.risk}/100
      </p>

      <button className="btn-secondary w-full mt-6" onClick={() => exportPDF()}>
        Export to PDF 📦
      </button>

      <button className="btn-primary w-full mt-3">
        Save & Continue →
      </button>
    </>
  );
}

function Outcome({ label, value, color }: any) {
  return (
    <div className="bg-cloudi-card/60 rounded-xl p-4 border border-slate-800">
      <p className={`font-medium ${color}`}>{label}</p>
      <p className="text-2xl font-bold mt-1">
        ${value.toLocaleString()}
      </p>
    </div>
  );
}

// =========================================
// Pricing
// =========================================
function Pricing() {
  return (
    <section className="section text-center mt-28">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-400 mt-2">
        Start free. Upgrade anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
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
          highlight
          name="Pro"
          price="49.99"
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
      className={`p-8 rounded-3xl border shadow-lg ${
        highlight
          ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white"
          : "bg-cloudi-card border-slate-800"
      }`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-4xl font-extrabold mt-3">
        ${price}
        <span className="text-lg opacity-70 ml-1">/mo</span>
      </p>

      <ul className="mt-6 space-y-2 text-left text-sm">
        {features.map((f: string, idx: number) => (
          <li key={idx} className="flex gap-2">
            <span>✔️</span>{f}
          </li>
        ))}
      </ul>

      <button className="btn-primary w-full mt-6">
        {cta}
      </button>
    </div>
  );
}

// =========================================
// FAQ
// =========================================
function FAQ() {
  const qa = [
    {
      q: "How accurate are simulations?",
      a: "CloudiCore models realistic growth curves using profit, cost, and sensitivity assumptions. They are directional tools—not guaranteed forecasts."
    },
    {
      q: "Do I need a credit card?",
      a: "No. You can start the simulator free with no card required."
    },
    {
      q: "Can I export simulations?",
      a: "Yes. Export to PDF with full breakdowns and projected outcomes."
    },
    {
      q: "Can teams use CloudiCore?",
      a: "The Enterprise plan includes collaboration, roles, shared workspaces, and reporting."
    },
    {
      q: "Does it support multiple markets?",
      a: "Simulations handle industry pricing, staffing, advertising, SaaS, agencies, and more."
    },
    {
      q: "How does support work?",
      a: "Starter includes email support; Pro offers priority chat; Enterprise includes dedicated success managers."
    },
  ];

  return (
    <section className="section mt-28">
      <h2 className="text-4xl font-bold text-center">
        Frequently Asked Questions
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
        {qa.map((i, k) => (
          <div key={k} className="bg-cloudi-card/60 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-xl font-semibold mb-2">{i.q}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{i.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// =========================================
// Footer
// =========================================
function Footer() {
  return (
    <footer className="section mt-28 pt-10 border-t border-slate-800 text-left">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-purple-300 text-lg font-semibold">Cloudisoft</h3>
          <p className="text-slate-400 text-sm mt-2">
            Intelligent AI automations & predictive decision tools.
          </p>
        </div>

        <div>
          <h3 className="text-purple-300 text-lg font-semibold">Contact</h3>
          <p className="text-slate-400 text-sm mt-2">
            connect@cloudisoft.com
            <br />
            +1 205-696-8477
          </p>
        </div>

        <div>
          <h3 className="text-purple-300 text-lg font-semibold">Location</h3>
          <p className="text-slate-400 text-sm mt-2">
            473 Mundet Place
            <br />
            Hillside, NJ 07205
          </p>
        </div>
      </div>

      <p className="text-center text-slate-500 text-sm mt-8">
        © 2025 Cloudisoft — All Rights Reserved.
      </p>
    </footer>
  );
}

// =========================================
// Auth Modal
// =========================================
function AuthModal({ close }: { close: () => void }) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={close} />

      <div className="fixed z-50 w-[90%] max-w-[420px]
        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        bg-cloudi-card p-8 rounded-3xl border border-slate-700">
        
        <h2 className="text-2xl font-bold text-center">
          {mode === "signup" ? "Create Account" : "Sign In"}
        </h2>

        <input
          className="w-full bg-cloudi-card/60 rounded-xl p-3 mt-4 border border-slate-700"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-cloudi-card/60 rounded-xl p-3 mt-3 border border-slate-700"
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
              Already have an account?{" "}
              <span className="text-purple-300 cursor-pointer" onClick={() => setMode("login")}>
                Sign in
              </span>
            </>
          ) : (
            <>
              New to CloudiCore?{" "}
              <span className="text-purple-300 cursor-pointer" onClick={() => setMode("signup")}>
                Create account
              </span>
            </>
          )}
        </p>
      </div>
    </>
  );
}
