import { useState } from "react";
import "../styles/cloudicore.css";

type Template = {
  id: string;
  label: string;
  baseGrowth: number;
  baseRisk: number;
};

const templates: Template[] = [
  { id: "pricing_change", label: "Pricing Change", baseGrowth: 0.06, baseRisk: 0.62 },
  { id: "hiring_decision", label: "Hiring Decision", baseGrowth: 0.07, baseRisk: 0.55 },
  { id: "product_launch", label: "Product Launch", baseGrowth: 0.10, baseRisk: 0.72 },
];

export default function CloudiCore() {
  const [template, setTemplate] = useState(templates[0].id);
  const [description, setDescription] = useState("");
  const [revenue, setRevenue] = useState<number | null>(null);
  const [costs, setCosts] = useState<number | null>(null);
  const [months, setMonths] = useState<number>(6);
  const [goal, setGoal] = useState("growth");

  const [results, setResults] = useState<any>(null);

  // SIMULATOR ENGINE
  const runSimulation = () => {
    if (!revenue || !costs) return alert("Please enter revenue & costs");

    const t = templates.find((x) => x.id === template)!;

    const profit = revenue - costs;
    const risk = Math.round((t.baseRisk + (profit < 0 ? 0.2 : 0)) * 100);

    setResults({
      summary: `Your ${t.label} decision simulates over ${months} months.`,
      metrics: {
        revenue,
        costs,
        profit,
      },
      risk,
    });
  };

  return (
    <div className="cc-container">
      {/* LEFT */}
      <div className="cc-left">
        <h1 className="cc-title">CloudiCore — Business Decision Simulator</h1>
        <p className="cc-subtext">
          Test strategies before spending money or hiring people.
        </p>

        {/* Template select */}
        <label>Decision Template</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          {templates.map((x) => (
            <option key={x.id} value={x.id}>
              {x.label}
            </option>
          ))}
        </select>

        {/* Describe */}
        <label>Describe your move</label>
        <textarea
          placeholder="Example: Increase SaaS pricing by 15%..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Revenue + Cost */}
        <div className="cc-row">
          <div>
            <label>Current Monthly Revenue</label>
            <input
              type="number"
              placeholder="50000"
              value={revenue ?? ""}
              onChange={(e) => setRevenue(Number(e.target.value))}
            />
          </div>

          <div>
            <label>Current Monthly Costs</label>
            <input
              type="number"
              placeholder="35000"
              value={costs ?? ""}
              onChange={(e) => setCosts(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Goal */}
        <label>Goal</label>
        <div className="cc-chip-group">
          {["growth", "profit", "stability"].map((g) => (
            <button
              key={g}
              className={`cc-chip ${goal === g ? "active" : ""}`}
              onClick={() => setGoal(g)}
            >
              {g.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Duration */}
        <label>Timeframe (months)</label>
        <input
          type="number"
          min={3}
          max={12}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
        />

        <button className="cc-btn" onClick={runSimulation}>
          Run Simulation
        </button>
      </div>

      {/* RIGHT results */}
      <div className="cc-right">
        {!results && (
          <div className="cc-placeholder">
            Enter values and click <strong>Run Simulation</strong>
          </div>
        )}

        {results && (
          <div className="cc-card">
            <h2>Simulation Result</h2>
            <p>{results.summary}</p>

            <div className="cc-stats">
              <p>Revenue: {results.metrics.revenue}</p>
              <p>Costs: {results.metrics.costs}</p>
              <p>Profit: {results.metrics.profit}</p>
            </div>

            <div className="cc-risk-box">
              <strong>Risk Index:</strong> <span>{results.risk}/100</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
