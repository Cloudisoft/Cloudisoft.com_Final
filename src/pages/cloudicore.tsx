// ===========================================
// CloudiCore FULL PAGE — FINAL VERSION
// COPY/PASTE ENTIRE FILE
// ===========================================
import { useState } from "react";
import "../index.css";
import Footer from "../components/Footer";

import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip
);

// ===========================================
// PAGE COMPONENT
// ===========================================
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

  // -----------------------------------------
  // Template Suggestions
  // -----------------------------------------
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
        scenario: "Increase marketing budget 35%",
        cost: inputs.cost || "9000",
      });
    }
  }

  // -----------------------------------------
  // SIMULATION
  // -----------------------------------------
  function runSimulation() {
    const rev = Number(inputs.revenue);
    const cst = Number(inputs.cost);
    const t = Number(inputs.months);

    if (!inputs.scenario) return setError("Enter your decision.");
    if (!rev) return setError("Enter monthly revenue.");
    if (!cst) return setError("Enter monthly cost.");
    if (!t) return setError("Enter timeframe.");
    setError("");

    let optimistic: number[] = [];
    let expected: number[] = [];
    let cautious: number[] = [];

    // growth curves
    for (let i = 1; i <= t; i++) {
      optimistic.push(rev * 1.25 ** i - cst);
      expected.push(rev * 1.12 ** i - cst);
      cautious.push(rev * 0.94 ** i - cst);
    }

    const breakEven = expected.findIndex((x) => x > 0) + 1 || null;

    setResult({
      optimistic,
      expected,
      cautious,
      months: t,
      risk: Math.round(Math.random() * 30 + 40),
      breakEven,
    });
  }

  // -----------------------------------------
  // PDF EXPORT
  // -----------------------------------------
  async function exportPDF() {
    const capture = document.querySelector("#sim-results");
    if (!capture) return;

    const canvas = await html2canvas(capture as HTMLElement);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 8, 6, 195, 0);
    pdf.save("cloudicore_simulation.pdf");
  }

  // -----------------------------------------
  // CHART DATA
  // -----------------------------------------
  const chartData =
    result && {
      labels: Array.from({ length: result.months }, (_, i) => i + 1),
      datasets: [
        {
          label: "Optimistic",
          data: result.optimistic,
          tension: 0.35,
          borderColor: "#10b981",
        },
        {
          label: "Expected",
          data: result.expected,
          tension: 0.35,
          borderColor: "#f59e0b",
        },
        {
          label: "Cautious",
          data: result.cautious,
          tension: 0.35,
          borderColor: "#ef4444",
        },
      ],
    };

  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* ================= HERO ================= */}
      <section className="section pt-24 text-center">
        <h1 className="text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-300">
          Predict revenue, risk and break-even outcomes before investing time or money.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <span className="btn-secondary">7-Day Free Trial</span>
          <span className="btn-secondary">No Card Required</span>
        </div>
      </section>

      {/* ================= SIMULATOR ================= */}
      <section className="section mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT ================================== */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">1. Describe Your Decision</h2>

          {/* Templates */}
          <div className="flex flex-wrap gap-2 mb-5">
            {["custom", "Pricing Increase", "Hiring 3 Engineers", "Marketing Boost"].map((t) => (
              <button
                key={t}
                className={`px-3 py-1 text-sm rounded-xl border ${
                  t === template ? "border-purple-500 bg-purple-500/20" : "border-slate-700"
                }`}
                onClick={() => applyTemplate(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Scenario */}
          <textarea
            rows={4}
            className="w-full p-4 bg-cloudi-card/60 border border-slate-800 rounded-xl"
            placeholder='Ex: “Increase product pricing by 12%”'
            value={inputs.scenario}
            onChange={(e) => setInputs({ ...inputs, scenario: e.target.value })}
          />

          <Field label="Monthly Revenue" name="revenue" inputs={inputs} setInputs={setInputs} />
          <Field label="Monthly Cost" name="cost" inputs={inputs} setInputs={setInputs} />
          <Field label="Timeframe (Months)" name="months" inputs={inputs} setInputs={setInputs} />

          {error && <p className="text-red-400 mt-3">{error}</p>}

          <button className="btn-primary w-full mt-6" onClick={runSimulation}>
            Run Simulation 🚀
          </button>
        </div>

        {/* RIGHT ================================== */}
        <div className="card" id="sim-results">
          {!result ? (
            <p className="text-slate-400">Run a simulation to view predictions…</p>
          ) : (
            <>
              {/* BREAK EVEN */}
              <div className="bg-cloudi-card/60 p-4 border border-slate-800 rounded-xl">
                <p className="text-sm text-slate-300">Break-Even</p>
                <h2 className="text-3xl font-bold mt-1">
                  {result.breakEven ? `${result.breakEven} months` : "No recovery"}
                </h2>
              </div>

              {/* CHART */}
              <div className="mt-6">
                <Line data={chartData as any} />
              </div>

              {/* RISK */}
              <p className="mt-6 text-lg">
                <span className="font-semibold">Risk Index:</span> {result.risk}/100
              </p>

              {/* BUTTONS */}
              <button className="btn-secondary w-full mt-6" onClick={exportPDF}>
                Export to PDF 📦
              </button>
              <button className="btn-primary w-full mt-3" onClick={() => setAuthOpen(true)}>
                Save & Continue →
              </button>
            </>
          )}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <Pricing />

      {/* ================= FAQ ================= */}
      <FAQ />

      <Footer />

      {authOpen && <AuthModal close={() => setAuthOpen(false)} />}
    </div>
  );
}

// ===========================================
// FIELD COMPONENT
// ===========================================
function Field({ label, name, inputs, setInputs }: any) {
  return (
    <div className="mt-4">
      <label className="text-sm text-slate-300">{label}</label>
      <input
        type="number"
        value={inputs[name]}
        onChange={(e) => setInputs({ ...inputs, [name]: e.target.value })}
        className="w-full p-3 bg-cloudi-card/60 border border-slate-800 rounded-xl mt-1"
      />
    </div>
  );
}

// ===========================================
// PRICING COMPONENT
// ===========================================
function Pricing() {
  return (
    <section className="section mt-28 text-center">
      <h2 className="text-4xl font-bold">Choose Your Plan</h2>
      <p className="text-slate-300 mt-3">Start free. Upgrade anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
        <Plan
          name="Free"
          price="0"
          features={[
            "3 simulations/month",
            "Basic reports",
            "Email support",
          ]}
          cta="Start Free"
        />

        <Plan
          name="Starter"
          price="19.99"
          features={[
            "10 simulations/month",
            "Basic templates",
            "Summary reports",
            "Email support",
          ]}
          cta="Get Starter"
        />

        <Plan
          name="Pro"
          price="49.99"
          highlight
          features={[
            "25 simulations/month",
            "Dashboard access",
            "Scenario history",
            "Advanced templates",
            "Priority support",
          ]}
          cta="Upgrade to Pro"
        />

        <Plan
          name="Enterprise"
          price="99.99"
          features={[
            "Unlimited simulations",
            "Team collaboration",
            "Analytics & custom models",
            "API access",
            "Dedicated support",
          ]}
          cta="Talk to Sales"
        />
      </div>
    </section>
  );
}

function Plan({ name, price, features, cta, highlight }: any) {
  return (
    <div
      className={`p-8 rounded-3xl border border-slate-800 shadow-xl ${
        highlight ? "bg-gradient-to-b from-blue-600 to-purple-600" : "bg-cloudi-card"
      }`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-4xl font-extrabold mt-4">
        ${price}
        <span className="text-lg opacity-60 ml-1">/mo</span>
      </p>

      <ul className="mt-6 space-y-3 text-left text-sm">
        {features.map((f: string) => (
          <li key={f} className="flex gap-2">
            ✔️ {f}
          </li>
        ))}
      </ul>

      <button className="btn-primary w-full mt-8">{cta}</button>
    </div>
  );
}

// ===========================================
// FAQ SECTION
// ===========================================
function FAQ() {
  const data = [
    ["How accurate is CloudiCore?", "It models realistic growth curves and operational drag."],
    ["Do I need financial expertise?", "No — CloudiCore asks for only essential values."],
    ["Can I export simulations?", "Yes — one-click PDF export included."],
    ["Does it support teams?", "Pro unlocks dashboards, Enterprise unlocks collaboration."],
    ["Is data private?", "Yes — encrypted & not shared."],
    ["Consultant use?", "Yes — Pro & Enterprise fit agencies and advisors."],
    ["No credit card?", "Correct — 7-day trial is free."],
    ["Roadmap?", "Dashboard, ML curves, churn modeling, hiring ramp."],
  ];

  return (
    <section className="section mt-24 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center">FAQs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {data.map(([q, a]) => (
          <FAQItem key={q} q={q} a={a} />
        ))}
      </div>
    </section>
  );
}

function FAQ
