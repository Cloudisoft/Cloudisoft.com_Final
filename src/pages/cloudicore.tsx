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
    riskReason = "Low downside. Costs are controlled and the decision is reversible.";
  else if (riskIndex <= 60)
    riskReason = "Moderate risk. Depends on execution quality and market response.";
  else
    riskReason = "High risk. Big upfront commitment and outcomes rely on external factors.";

  const recommendations = {
    conservative: {
      title: "Conservative path",
      action: "Start with a small test, cap spend, and track a single KPI weekly.",
      why: "Reduces downside while you learn how customers respond.",
      tradeoff: "Slower growth and delayed impact.",
    },
    balanced: {
      title: "Balanced path",
      action: "Roll out to segments, pre-define stop rules, and lock budget.",
      why: "Keeps upside meaningful without risking full P&L.",
      tradeoff: "Requires discipline.",
    },
    aggressive: {
      title: "Aggressive path",
      action: "Go full rollout, resource heavily, accept 3–6 months payback.",
      why: "Maximizes growth if assumptions are correct.",
      tradeoff: "Higher burn and recovery time if wrong.",
    },
  };

  return {
    outcomes,
    riskIndex,
    riskReason,
    recommendations,
  };
}

const CloudiCore = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plan, setPlan] = useState<"trial" | "starter" | "pro" | "enterprise">("trial");
  const [simulationsUsed, setSimulationsUsed] = useState(0);
  const trialLimit = 3;

  const [inputs, setInputs] = useState<ScenarioInputs>({
    template: "Pricing change",
    description: "",
    monthlyRevenue: 25000,
    monthlyCostOrBudget: 12000,
    timeframeMonths: 3,
    goal: "growth",
  });

  const [result, setResult] = useState<ReturnType<typeof simulateScenario> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trialLocked = plan === "trial" && simulationsUsed >= trialLimit;

  const handleRun = () => {
    setError(null);
    if (!isLoggedIn) return setError("Sign in to run a simulation.");
    if (!inputs.description.trim()) return setError("Add a short scenario description.");
    if (trialLocked) return setError("Trial limit reached. Upgrade to continue.");

    const res = simulateScenario(inputs);
    setResult(res);
    setSimulationsUsed((n) => n + 1);
  };

  return (
    <div className="cc-page">
      <h1 style={{ color: "white", padding: "20px" }}>
        CloudiCore Simulator
      </h1>

      {/* — rest of UI remains as-is */}
      <p style={{ color: "gray", padding: "0 20px" }}>
        UI is rendering — now plug in the styling.
      </p>
    </div>
  );
};

export default CloudiCore;
