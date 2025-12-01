import { useState } from "react";
import "./cloudicore.css";

type Goal = "growth" | "profit" | "stability";

type Outcome = {
  label: "Optimistic" | "Expected" | "Cautious";
  revenue: number;
  profit: number;
  costImpact: number;
  breakEvenMonths: number;
  mainRisk: string;
};

type ScenarioInputs = {
  template: string;
  description: string;
  monthlyRevenue: number;
  monthlyCostOrBudget: number;
  timeframeMonths: number;
  goal: Goal;
};

const TEMPLATES = [
  "Pricing change",
  "Hiring decision",
  "Expansion / new location",
  "Marketing budget adjustment",
  "Product launch",
  "Operational scaling",
  "Sales strategy",
];

const formatMoney = (n: number) =>
  "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

function simulateScenario(input: ScenarioInputs) {
  const {
    template,
    monthlyRevenue,
    monthlyCostOrBudget,
    timeframeMonths,
    goal,
  } = input;

  const baseRevenue = monthlyRevenue || 0;
  const baseCost = monthlyCostOrBudget || 0;
  const T = timeframeMonths || 3;

  // --- multipliers based on goal ---
  let growthBoost = 0;
  let marginFocus = 0;
  if (goal === "growth") growthBoost = 0.35;
  if (goal === "profit") marginFocus = 0.25;
  if (goal === "stability") {
    growthBoost = 0.1;
    marginFocus = 0.1;
  }

  // --- template impact ---
  let revUpside = 0.2;
  let revMid = 0.1;
  let revDown = -0.05;
  let costDelta = 0.0;
  let baseRisk = 40;

  switch (template) {
    case "Pricing change":
      revUpside = 0.25;
      revMid = 0.12;
      revDown = -0.12;
      baseRisk = 55;
      break;
    case "Hiring decision":
      revUpside = 0.18;
      revMid = 0.09;
      revDown = -0.03;
      costDelta = 0.2;
      baseRisk = 45;
      break;
    case "Expansion / new location":
      revUpside = 0.35;
      revMid = 0.18;
      revDown = -0.15;
      costDelta = 0.3;
      baseRisk = 65;
      break;
    case "Marketing budget adjustment":
      revUpside = 0.28;
      revMid = 0.13;
      revDown = -0.06;
      costDelta = 0.15;
      baseRisk = 50;
      break;
    case "Product launch":
      revUpside = 0.4;
      revMid = 0.2;
      revDown = -0.18;
      costDelta = 0.25;
      baseRisk = 70;
      break;
    case "Operational scaling":
      revUpside = 0.22;
      revMid = 0.11;
      revDown = -0.04;
      costDelta = 0.18;
      baseRisk = 48;
      break;
    case "Sales strategy":
      revUpside = 0.3;
      revMid = 0.15;
      revDown = -0.08;
      costDelta = 0.12;
      baseRisk = 52;
      break;
    default:
      break;
  }

  // Adjust for goal
  revUpside += growthBoost * 0.8;
  revMid += growthBoost * 0.4;
  revDown -= growthBoost * 0.2;
  costDelta -= marginFocus * 0.3;

  // Make sure numbers stay realistic
  revDown = Math.max(revDown, -0.4);

  const optimisticRevenue = baseRevenue * (1 + revUpside);
  const expectedRevenue = baseRevenue * (1 + revMid);
  const cautiousRevenue = baseRevenue * (1 + revDown);

  const optimisticCost = baseCost * (1 + costDelta * 0.7);
  const expectedCost = baseCost * (1 + costDelta * 0.9);
  const cautiousCost = baseCost * (1 + costDelta);

  const optimisticProfit = optimisticRevenue - optimisticCost;
  const expectedProfit = expectedRevenue - expectedCost;
  const cautiousProfit = cautiousRevenue - cautiousCost;

  const avgExtraProfit =
    (optimisticProfit + expectedProfit + cautiousProfit) / 3 -
    (baseRevenue - baseCost);

  const breakEvenMonths =
    avgExtraProfit > 0 ? clamp(baseCost / Math.max(avgExtraProfit, 1), 1, 18) : 18;

  // Risk index
  let riskIndex = baseRisk;
  if (goal === "growth") riskIndex += 8;
  if (goal === "profit") riskIndex -= 6;
  if (goal === "stability") riskIndex -= 3;
  if (T < 3) riskIndex += 5;
  if (T > 6) riskIndex += 3;

  riskIndex = clamp(Math.round(riskIndex), 5, 95);

  const outcomes: Outcome[] = [
    {
      label: "Optimistic",
      revenue: optimisticRevenue * T,
      profit: optimisticProfit * T,
      costImpact: (optimisticCost - baseCost) * T,
      breakEvenMonths,
      mainRisk: "Assumes strong market response and smooth execution.",
    },
    {
      label: "Expected",
      revenue: expectedRevenue * T,
      profit: expectedProfit * T,
      costImpact: (expectedCost - baseCost) * T,
      breakEvenMonths,
      mainRisk: "Normal demand, average execution, small delays possible.",
    },
    {
      label: "Cautious",
      revenue: cautiousRevenue * T,
      profit: cautiousProfit * T,
      costImpact: (cautiousCost - baseCost) * T,
      breakEvenMonths,
      mainRisk: "Slower adoption, cost overruns, or weaker conversion.",
    },
  ];

  let riskReason = "";
  if (riskIndex <= 30)
    riskReason =
      "Low downside. Costs are controlled and the decision is reversible.";
  else if (riskIndex <= 60)
    riskReason =
      "Moderate risk. Results depend on execution quality and market response.";
  else
    riskReason =
      "High risk. Big upfront commitment and outcomes rely on external factors.";

  // Recommendation paths
  const recommendations = {
    conservative: {
      title: "Conservative path",
      action:
        "Start with a small test, cap spend, and track a single KPI weekly.",
      why: "Reduces downside while you learn how customers respond.",
      tradeoff: "Slower growth and delayed impact if the bet works.",
    },
    balanced: {
      title: "Balanced path",
      action:
        "Roll out to 1–2 key segments, pre-define stop rules, and lock budget.",
      why: "Keeps upside meaningful without putting the whole P&L at risk.",
      tradeoff: "Requires discipline and active monitoring.",
    },
    aggressive: {
      title: "Aggressive path",
      action:
        "Go full rollout, over-resource execution, and accept 3–6 months payback.",
      why: "Maximizes growth if your assumptions are right.",
      tradeoff: "Cash burn increases and recovery is harder if it underperforms.",
    },
  };

  return {
    outcomes,
    riskIndex,
    riskReason,
    recommendations,
  };
}

export default function CloudiCorePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plan, setPlan] = useState<"trial" | "starter" | "pro" | "enterprise">(
    "trial"
  );
  const [simulationsUsed, setSimulationsUsed] = useState(0);
  const [inputs, setInputs] = useState<ScenarioInputs>({
    template: "Pricing change",
    description: "",
    monthlyRevenue: 25000,
    monthlyCostOrBudget: 12000,
    timeframeMonths: 3,
    goal: "growth",
  });

  const [result, setResult] = useState<ReturnType<typeof simulateScenario> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const trialLimit = 3;

  const trialLocked = plan === "trial" && simulationsUsed >= trialLimit;

  const handleRun = () => {
    setError(null);
    if (!isLoggedIn) {
      setError("Sign in to run a simulation.");
      return;
    }
    if (!inputs.description.trim()) {
      setError("Add a short description so CloudiCore understands the decision.");
      return;
    }
    if (trialLocked) {
      setError(
        "Your 5-day trial includes 3 simulations. Upgrade to keep running scenarios."
      );
      return;
    }

    const res = simulateScenario(inputs);
    setResult(res);
    setSimulationsUsed((n) => n + 1);
  };

  const handleUpgrade = (to: "pro" | "enterprise" | "starter") => {
    setPlan(to);
    setError(null);
  };

  return (
    <div className="cc-page">
      {/* HERO / HEADER */}
      <section className="cc-hero">
        <div className="cc-hero-inner">
          <div>
            <h1 className="cc-hero-title">
              CloudiCore Decision Simulator
            </h1>
            <p className="cc-hero-subtitle">
              Test a decision before you commit budget, headcount, or time.
              Get realistic revenue, profit, and risk projections in one view.
            </p>
            <div className="cc-hero-badges">
              <span className="cc-badge">5-day free trial · No card required</span>
              <span className="cc-badge">Fast, single-screen workflow</span>
            </div>
          </div>
        </div>
      </section>

      {/* AUTH + SIMULATOR SHELL */}
      <main className="cc-main">
        <div className="cc-shell">
          {/* LEFT: LOGIN / INPUTS */}
          <div className="cc-left">
            {!isLoggedIn && (
              <div className="cc-card cc-login-card">
                <h2 className="cc-card-title">Sign in to start</h2>
                <p className="cc-card-body">
                  Use Google, Microsoft, or email to secure your trial.
                </p>
                <div className="cc-login-buttons">
                  <button
                    className="cc-btn-outline"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Continue with Google
                  </button>
                  <button
                    className="cc-btn-outline"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Continue with Microsoft
                  </button>
                </div>
                <div className="cc-login-divider">
                  <span>or</span>
                </div>
                <div className="cc-login-form">
                  <input
                    type="email"
                    placeholder="Work email"
                    className="cc-input"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="cc-input"
                  />
                  <button
                    className="cc-btn-primary"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Sign in with email
                  </button>
                </div>
                <p className="cc-login-footnote">
                  Demo mode only – hook these buttons to your auth provider when
                  ready.
                </p>
              </div>
            )}

            <div className="cc-card">
              <div className="cc-card-header">
                <h2 className="cc-card-title">1. Describe your decision</h2>
                <span className="cc-tag">
                  {plan === "trial"
                    ? `Trial · ${trialLimit - simulationsUsed} simulations left`
                    : plan === "starter"
                    ? "Starter · 5 sims / month"
                    : plan === "pro"
                    ? "Pro · 25 sims / month"
                    : "Enterprise · Unlimited sims"}
                </span>
              </div>

              <div className="cc-field">
                <label className="cc-label">Template (optional)</label>
                <div className="cc-template-row">
                  <select
                    value={inputs.template}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        template: e.target.value,
                      }))
                    }
                    className="cc-select"
                  >
                    {TEMPLATES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="cc-field">
                <label className="cc-label">
                  Scenario
                  <span className="cc-label-hint">
                    e.g. &ldquo;Increase prices by 10% next quarter&rdquo;
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="cc-textarea"
                  placeholder="Write the decision in plain language..."
                />
              </div>

              <div className="cc-grid-2">
                <div className="cc-field">
                  <label className="cc-label">
                    Current monthly revenue
                    <span className="cc-label-hint">(approx.)</span>
                  </label>
                  <input
                    type="number"
                    className="cc-input"
                    value={inputs.monthlyRevenue}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        monthlyRevenue: Number(e.target.value || 0),
                      }))
                    }
                  />
                </div>
                <div className="cc-field">
                  <label className="cc-label">
                    Main monthly cost / budget
                  </label>
                  <input
                    type="number"
                    className="cc-input"
                    value={inputs.monthlyCostOrBudget}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        monthlyCostOrBudget: Number(e.target.value || 0),
                      }))
                    }
                  />
                </div>
              </div>

              <div className="cc-grid-2">
                <div className="cc-field">
                  <label className="cc-label">Primary goal</label>
                  <select
                    className="cc-select"
                    value={inputs.goal}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        goal: e.target.value as Goal,
                      }))
                    }
                  >
                    <option value="growth">Growth</option>
                    <option value="profit">Profit</option>
                    <option value="stability">Stability</option>
                  </select>
                </div>
                <div className="cc-field">
                  <label className="cc-label">
                    Timeframe (months)
                    <span className="cc-label-hint">usually 3–6</span>
                  </label>
                  <input
                    type="number"
                    className="cc-input"
                    min={1}
                    max={12}
                    value={inputs.timeframeMonths}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        timeframeMonths: Number(e.target.value || 0),
                      }))
                    }
                  />
                </div>
              </div>

              {error && <div className="cc-error">{error}</div>}

              <div className="cc-actions-row">
                <button
                  className="cc-btn-primary"
                  onClick={handleRun}
                  disabled={trialLocked}
                >
                  Run simulation
                </button>
                {trialLocked && (
                  <span className="cc-trial-warning">
                    Trial limit reached. Upgrade below to continue.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: RESULTS */}
          <div className="cc-right">
            <div className="cc-card cc-results-card">
              <h2 className="cc-card-title">2. Simulated outcomes</h2>
              {!result && (
                <p className="cc-placeholder">
                  Run your first simulation to see optimistic, expected, and
                  cautious paths here.
                </p>
              )}

              {result && (
                <>
                  <div className="cc-summary">
                    <h3>Decision summary</h3>
                    <p className="cc-summary-text">
                      Over {inputs.timeframeMonths} months, this decision
                      adjusts revenue and cost based on your template, goal, and
                      budget. Numbers are directional, not exact forecasts.
                    </p>
                  </div>

                  <div className="cc-outcomes">
                    {result.outcomes.map((o) => (
                      <div key={o.label} className="cc-outcome-card">
                        <div className="cc-outcome-header">
                          <span className="cc-outcome-label">{o.label}</span>
                        </div>
                        <div className="cc-outcome-row">
                          <span>Total revenue</span>
                          <strong>{formatMoney(o.revenue)}</strong>
                        </div>
                        <div className="cc-outcome-row">
                          <span>Total profit / loss</span>
                          <strong>{formatMoney(o.profit)}</strong>
                        </div>
                        <div className="cc-outcome-row">
                          <span>Cost impact</span>
                          <strong>{formatMoney(o.costImpact)}</strong>
                        </div>
                        <div className="cc-outcome-row">
                          <span>Break-even</span>
                          <strong>{o.breakEvenMonths.toFixed(1)} months</strong>
                        </div>
                        <p className="cc-outcome-risk">{o.mainRisk}</p>
                      </div>
                    ))}
                  </div>

                  <div className="cc-risk">
                    <div className="cc-risk-header">
                      <h3>Risk index</h3>
                      <span className="cc-risk-score">
                        {result.riskIndex}/100
                      </span>
                    </div>
                    <div className="cc-risk-bar">
                      <div
                        className="cc-risk-bar-fill"
                        style={{ width: `${result.riskIndex}%` }}
                      />
                    </div>
                    <p className="cc-risk-text">{result.riskReason}</p>
                  </div>

                  <div className="cc-rec-grid">
                    <div className="cc-rec-card">
                      <h4>{result.recommendations.conservative.title}</h4>
                      <p>{result.recommendations.conservative.action}</p>
                      <p className="cc-rec-meta">
                        Why: {result.recommendations.conservative.why}
                      </p>
                      <p className="cc-rec-meta">
                        Trade-off: {result.recommendations.conservative.tradeoff}
                      </p>
                    </div>
                    <div className="cc-rec-card">
                      <h4>{result.recommendations.balanced.title}</h4>
                      <p>{result.recommendations.balanced.action}</p>
                      <p className="cc-rec-meta">
                        Why: {result.recommendations.balanced.why}
                      </p>
                      <p className="cc-rec-meta">
                        Trade-off: {result.recommendations.balanced.tradeoff}
                      </p>
                    </div>
                    <div className="cc-rec-card">
                      <h4>{result.recommendations.aggressive.title}</h4>
                      <p>{result.recommendations.aggressive.action}</p>
                      <p className="cc-rec-meta">
                        Why: {result.recommendations.aggressive.why}
                      </p>
                      <p className="cc-rec-meta">
                        Trade-off: {result.recommendations.aggressive.tradeoff}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* PRICING SECTION – BELOW SIMULATOR */}
      <section id="cloudicore-pricing" className="cc-pricing">
        <div className="cc-pricing-inner">
          <h2 className="cc-pricing-title">Pricing after your 5-day trial</h2>
          <p className="cc-pricing-sub">
            Trial: 3 simulations, basic templates, no dashboard, email support.
            Upgrade anytime below.
          </p>

          <div className="cc-pricing-grid">
            <div
              className={`cc-price-card ${
                plan === "starter" ? "cc-price-card-active" : ""
              }`}
            >
              <h3>Starter</h3>
              <p className="cc-price">$19.99/mo</p>
              <ul>
                <li>5 simulations / month</li>
                <li>Summary reports</li>
                <li>Basic templates</li>
                <li>Email support</li>
              </ul>
              <button
                className="cc-btn-outline full"
                onClick={() => handleUpgrade("starter")}
              >
                Choose Starter
              </button>
            </div>

            <div
              className={`cc-price-card cc-price-card-featured ${
                plan === "pro" ? "cc-price-card-active" : ""
              }`}
            >
              <div className="cc-chip">Recommended</div>
              <h3>Pro</h3>
              <p className="cc-price">$49.99/mo</p>
              <ul>
                <li>25 simulations / month</li>
                <li>Full dashboard & history</li>
                <li>Advanced templates</li>
                <li>Priority support</li>
              </ul>
              <button
                className="cc-btn-primary full"
                onClick={() => handleUpgrade("pro")}
              >
                Upgrade to Pro
              </button>
            </div>

            <div
              className={`cc-price-card ${
                plan === "enterprise" ? "cc-price-card-active" : ""
              }`}
            >
              <h3>Enterprise</h3>
              <p className="cc-price">$99.99/mo</p>
              <ul>
                <li>Unlimited simulations</li>
                <li>Team collaboration</li>
                <li>Advanced analytics & custom templates</li>
                <li>API access</li>
              </ul>
              <button
                className="cc-btn-outline full"
                onClick={() => handleUpgrade("enterprise")}
              >
                Talk to sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
