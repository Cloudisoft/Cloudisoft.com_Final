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
          <Field label="Main monthly cost" name="cost" inputs
