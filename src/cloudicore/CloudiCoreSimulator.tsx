import { useEffect, useRef } from "react";
import "./cloudicore.css";

// 1) HTML markup for the simulator (body content only)
const CLOUDICORE_HTML = `
<div id="cloudicore-root">
  <div class="cc-shell" id="simulator">
    <!-- LEFT: INPUTS -->
    <div>
      <div class="cc-header">
        <div class="cc-title-block">
          <div class="cc-title-row">
            <div class="cc-logo-dot"></div>
            <div class="cc-title">CloudiCore</div>
          </div>
          <div class="cc-subtitle">
            Simulate your next move before you commit budget or headcount.
          </div>
        </div>
        <div class="cc-tagline">
          <span class="cc-tagline-dot"></span>
          <span>Decision Simulator</span>
        </div>
      </div>

      <div class="cc-panel">
        <div class="cc-panel-title-row">
          <div class="cc-panel-title">Scenario</div>
          <div class="cc-pill">1 focus · ~3–6 months</div>
        </div>

        <div class="cc-form-grid">
          <div>
            <div class="cc-field-label">
              <span>Template</span>
              <small id="cc-template-hint">Pick a decision type</small>
            </div>
            <div class="cc-select-wrapper">
              <select id="cc-template" class="cc-select"></select>
            </div>
            <div class="cc-chip-row" id="cc-template-chips"></div>
          </div>

          <div>
            <div class="cc-field-label">
              <span>Describe your decision</span>
              <small>Short, natural language</small>
            </div>
            <textarea id="cc-description" class="cc-textarea"
                      placeholder="Example: Increase prices by 15% on our SaaS plans from next quarter to improve margins without losing key customers."></textarea>
          </div>

          <div class="cc-split-2">
            <div>
              <div class="cc-field-label">
                <span>Current monthly revenue</span>
                <small>Approximate, in your currency</small>
              </div>
              <input id="cc-revenue" class="cc-input" type="number" min="0" step="100"
                     placeholder="e.g. 50000" />
              <div class="cc-error-text" id="cc-revenue-error" style="display:none;">
                Enter a rough monthly revenue to simulate impact.
              </div>
            </div>
            <div>
              <div class="cc-field-label">
                <span>Major monthly costs / budget</span>
                <small>Ops + salaries + spend</small>
              </div>
              <input id="cc-costs" class="cc-input" type="number" min="0" step="100"
                     placeholder="e.g. 35000" />
              <div class="cc-error-text" id="cc-costs-error" style="display:none;">
                Estimate your core monthly cost or budget.
              </div>
            </div>
          </div>

          <div class="cc-split-2">
            <div>
              <div class="cc-field-label">
                <span>Primary goal</span>
                <small>Pick one</small>
              </div>
              <div class="cc-chip-row" id="cc-goal-chips">
                <button class="cc-chip goal active" data-goal="growth">Growth</button>
                <button class="cc-chip goal" data-goal="profit">Profit</button>
                <button class="cc-chip goal" data-goal="stability">Stability</button>
              </div>
            </div>
            <div>
              <div class="cc-field-label">
                <span>Timeframe</span>
                <small>Months</small>
              </div>
              <input id="cc-timeframe" class="cc-input" type="number" min="1" max="12"
                     placeholder="e.g. 6" />
              <div class="cc-error-text" id="cc-timeframe-error" style="display:none;">
                Use 3–6 months for most decisions.
              </div>
            </div>
          </div>
        </div>

        <div class="cc-foot-row">
          <div class="cc-muted">
            CloudiCore uses real-world assumptions and shows three paths.
          </div>
          <button id="cc-run" class="cc-btn-primary">
            <span>Run simulation</span>
            <span>▶</span>
          </button>
        </div>
      </div>

      <div class="cc-foot-row" style="margin-top:8px;">
        <div class="cc-muted">
          Trial idea (optional UI copy): <span class="cc-linkish">3 simulations free · upgrade for history & team use</span>
        </div>
      </div>
    </div>

    <!-- RIGHT: DASHBOARD -->
    <div class="cc-dashboard">
      <div class="cc-summary" id="cc-summary">
        <div>
          <div class="cc-summary-title">Decision summary</div>
          <div class="cc-summary-main" id="cc-summary-main">
            No simulation yet. Describe a decision on the left and hit <strong>Run simulation</strong>.
          </div>
          <div class="cc-summary-meta" id="cc-summary-meta">
            <span class="cc-summary-pill">Baseline impact: –</span>
            <span class="cc-summary-pill">Goal: –</span>
            <span class="cc-summary-pill">Timeframe: –</span>
          </div>
        </div>
        <div class="cc-risk-box">
          <div class="cc-risk-header">
            <div class="cc-risk-title">Risk Index</div>
            <div class="cc-risk-score" id="cc-risk-score">–<span>/100</span></div>
          </div>
          <div class="cc-risk-bar">
            <div class="cc-risk-thumb" id="cc-risk-thumb" style="left:0%;"></div>
          </div>
          <div class="cc-risk-note" id="cc-risk-note">
            CloudiCore will estimate risk based on churn pressure, fixed cost load, and execution complexity.
          </div>
        </div>
      </div>

      <div>
        <div class="cc-panel-title-row">
          <div class="cc-panel-title">Outcome paths</div>
          <div class="cc-badge">Optimistic · Expected · Cautious</div>
        </div>
        <div id="cc-outcomes" class="cc-outcomes-row">
          <div class="cc-empty-state">
            You’ll see three realistic paths here: revenue, profit, cost, break-even, and the main risk driver.
          </div>
        </div>
      </div>

      <div>
        <div class="cc-panel-title-row">
          <div class="cc-panel-title">Recommendations</div>
          <div class="cc-badge">Conservative · Balanced · Aggressive</div>
        </div>
        <div id="cc-recos" class="cc-reco-row">
          <div class="cc-empty-state">
            CloudiCore will suggest what to actually do, why it works, and the tradeoff for each approach.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Pricing moved from main site -->
<section id="pricing" class="cc-pricing-section">
  <div class="cc-pricing-header">
    <div class="cc-pricing-kicker">CloudiCore Plans</div>
    <div class="cc-pricing-title">Choose Your Plan</div>
    <p class="cc-pricing-subtitle">
      Start with a free 7-day trial. Upgrade when you’re ready to unlock team access,
      scenario history, and advanced analytics.
    </p>
  </div>

  <div class="cc-pricing-grid">
    <!-- Starter -->
    <div class="cc-pricing-card">
      <div>
        <div class="cc-pricing-plan">Starter</div>
        <div class="cc-pricing-price">
          $19.99 <span>/month</span>
        </div>
        <ul class="cc-pricing-feature-list">
          <li><span class="cc-pricing-check"></span>5 simulations / month</li>
          <li><span class="cc-pricing-check"></span>Summary reports</li>
          <li><span class="cc-pricing-check"></span>Basic templates</li>
          <li><span class="cc-pricing-check"></span>Email support</li>
        </ul>
      </div>
      <a href="#simulator" class="cc-pricing-button secondary">
        Start Simulating
      </a>
    </div>

    <!-- Pro -->
    <div class="cc-pricing-card highlight">
      <div>
        <div class="cc-pricing-pill">Recommended</div>
        <div class="cc-pricing-plan">Pro</div>
        <div class="cc-pricing-price">
          $49.99 <span>/month</span>
        </div>
        <ul class="cc-pricing-feature-list">
          <li><span class="cc-pricing-check"></span>25 simulations / month</li>
          <li><span class="cc-pricing-check"></span>Dashboard</li>
          <li><span class="cc-pricing-check"></span>Scenario history</li>
          <li><span class="cc-pricing-check"></span>Advanced templates</li>
          <li><span class="cc-pricing-check"></span>Priority support</li>
        </ul>
      </div>
      <a href="#simulator" class="cc-pricing-button">
        Start Simulating
      </a>
    </div>

    <!-- Enterprise -->
    <div class="cc-pricing-card">
      <div>
        <div class="cc-pricing-plan">Enterprise</div>
        <div class="cc-pricing-price">
          $99.99 <span>/month</span>
        </div>
        <ul class="cc-pricing-feature-list">
          <li><span class="cc-pricing-check"></span>Unlimited simulations</li>
          <li><span class="cc-pricing-check"></span>Team collaboration</li>
          <li><span class="cc-pricing-check"></span>Advanced analytics</li>
          <li><span class="cc-pricing-check"></span>Custom templates</li>
          <li><span class="cc-pricing-check"></span>API access</li>
        </ul>
      </div>
      <a href="#simulator" class="cc-pricing-button secondary">
        Talk to us
      </a>
    </div>
  </div>
`;

// 2) All the simulator JS logic goes here
function initCloudiCore(root: HTMLElement) {
  // Scoped DOM queries
  const templateSelect = root.querySelector("#cc-template") as HTMLSelectElement | null;
  const templateChipsContainer = root.querySelector("#cc-template-chips") as HTMLElement | null;
  const templateHint = root.querySelector("#cc-template-hint") as HTMLElement | null;
  const descriptionEl = root.querySelector("#cc-description") as HTMLTextAreaElement | null;
  const revenueEl = root.querySelector("#cc-revenue") as HTMLInputElement | null;
  const costsEl = root.querySelector("#cc-costs") as HTMLInputElement | null;
  const timeframeEl = root.querySelector("#cc-timeframe") as HTMLInputElement | null;
  const goalChipsContainer = root.querySelector("#cc-goal-chips") as HTMLElement | null;
  const runBtn = root.querySelector("#cc-run") as HTMLButtonElement | null;

  const revenueError = root.querySelector("#cc-revenue-error") as HTMLElement | null;
  const costsError = root.querySelector("#cc-costs-error") as HTMLElement | null;
  const timeframeError = root.querySelector("#cc-timeframe-error") as HTMLElement | null;

  const summaryMain = root.querySelector("#cc-summary-main") as HTMLElement | null;
  const summaryMeta = root.querySelector("#cc-summary-meta") as HTMLElement | null;
  const riskScoreEl = root.querySelector("#cc-risk-score") as HTMLElement | null;
  const riskThumb = root.querySelector("#cc-risk-thumb") as HTMLElement | null;
  const riskNote = root.querySelector("#cc-risk-note") as HTMLElement | null;
  const outcomesContainer = root.querySelector("#cc-outcomes") as HTMLElement | null;
  const recosContainer = root.querySelector("#cc-recos") as HTMLElement | null;

  // Guard against missing DOM (in case markup changes)
  if (
    !templateSelect ||
    !templateChipsContainer ||
    !templateHint ||
    !descriptionEl ||
    !revenueEl ||
    !costsEl ||
    !timeframeEl ||
    !goalChipsContainer ||
    !runBtn ||
    !revenueError ||
    !costsError ||
    !timeframeError ||
    !summaryMain ||
    !summaryMeta ||
    !riskScoreEl ||
    !riskThumb ||
    !riskNote ||
    !outcomesContainer ||
    !recosContainer
  ) {
    console.error("CloudiCore: missing required DOM elements");
    return;
  }

  // ------------------------------
  // CloudiCore configuration
  // ------------------------------
  const ccTemplates = [
    {
      id: "pricing_change",
      label: "Pricing change",
      short: "Adjust plan pricing or discounting",
      baseGrowth: 0.06,
      baseRisk: 0.62,
      sensitivity: {
        revenueUpside: 0.18,
        churnRisk: 0.22,
      },
    },
    {
      id: "hiring_decision",
      label: "Hiring decision",
      short: "Add or delay key hires",
      baseGrowth: 0.07,
      baseRisk: 0.55,
      sensitivity: {
        revenueUpside: 0.14,
        churnRisk: 0.08,
      },
    },
    {
      id: "expansion_location",
      label: "Expansion / new location",
      short: "Open a new market or region",
      baseGrowth: 0.1,
      baseRisk: 0.74,
      sensitivity: {
        revenueUpside: 0.32,
        churnRisk: 0.12,
      },
    },
    {
      id: "marketing_budget",
      label: "Marketing budget adjustment",
      short: "Increase or cut marketing spend",
      baseGrowth: 0.09,
      baseRisk: 0.61,
      sensitivity: {
        revenueUpside: 0.26,
        churnRisk: 0.09,
      },
    },
    {
      id: "product_launch",
      label: "New product / feature launch",
      short: "Launch a new SKU or major feature",
      baseGrowth: 0.11,
      baseRisk: 0.7,
      sensitivity: {
        revenueUpside: 0.3,
        churnRisk: 0.14,
      },
    },
    {
      id: "operational_scaling",
      label: "Operational scaling",
      short: "Scale infra, support, delivery capacity",
      baseGrowth: 0.05,
      baseRisk: 0.52,
      sensitivity: {
        revenueUpside: 0.16,
        churnRisk: 0.07,
      },
    },
    {
      id: "sales_strategy",
      label: "Sales strategy change",
      short: "Change segments, territories, or motion",
      baseGrowth: 0.08,
      baseRisk: 0.66,
      sensitivity: {
        revenueUpside: 0.24,
        churnRisk: 0.18,
      },
    },
  ];

  const ccGoals: Record<
    string,
    { label: string; weight: { revenue: number; profit: number } }
  > = {
    growth: { label: "Growth", weight: { revenue: 0.7, profit: 0.3 } },
    profit: { label: "Profit", weight: { revenue: 0.4, profit: 0.6 } },
    stability: { label: "Stability", weight: { revenue: 0.45, profit: 0.55 } },
  };

  // ------------------------------
  // Utility helpers
  // ------------------------------
  function ccCurrencyFormat(value: number) {
    if (isNaN(value)) return "–";
    if (Math.abs(value) < 1000) return value.toFixed(0);
    const abs = Math.abs(value);
    if (abs < 1_000_000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  }

  function ccPercentFormat(value: number) {
    if (isNaN(value)) return "–";
    return (value * 100).toFixed(1).replace(/\.0$/, "") + "%";
  }

  function ccClamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }

  function ccPickTemplate(id: string) {
    return ccTemplates.find((t) => t.id === id) || ccTemplates[0];
  }

  // ------------------------------
  // Core simulation logic
  // ------------------------------
  function ccSimulateDecision(input: {
    templateId: string;
    description: string;
    revenue: number;
    costs: number;
    goalKey: string;
    months: number;
  }) {
    const { templateId, description, revenue, costs, goalKey, months } = input;

    const tmpl = ccPickTemplate(templateId);
    const goal = ccGoals[goalKey] || ccGoals.growth;
    const timeframe = months || 6;
    const baseMonthlyProfit = revenue - costs;
    const baseMargin = revenue > 0 ? baseMonthlyProfit / revenue : 0;

    // Baseline small drift to account for organic change
    const organicFactor = 1 + (0.01 * timeframe) / 3;

    // Scenario-specific multipliers
    const intensity = Math.min(1.5, timeframe / 6); // more months → stronger effect
    const upsideBase = tmpl.baseGrowth * intensity;
    const riskBase = tmpl.baseRisk;

    // Goal reweights aggressiveness
    const goalAggFactor =
      goalKey === "growth" ? 1.1 : goalKey === "profit" ? 0.9 : 0.95;

    const optimisticRevenueLift = upsideBase * 1.4 * goalAggFactor;
    const expectedRevenueLift = upsideBase * 0.9 * goalAggFactor;
    const cautiousRevenueLift = upsideBase * 0.35 * goalAggFactor;

    // Cost behaviour: decisions can increase fixed / variable cost
    const costIntensityMap: Record<string, number> = {
      pricing_change: 0.2,
      hiring_decision: 0.6,
      expansion_location: 0.8,
      marketing_budget: 0.5,
      product_launch: 0.5,
      operational_scaling: 0.7,
      sales_strategy: 0.35,
    };
    const costIntensity = (costIntensityMap[tmpl.id] ?? 0.4) * intensity;

    const optimisticCostLift = costIntensity * 0.7;
    const expectedCostLift = costIntensity * 0.85;
    const cautiousCostLift = costIntensity * 0.5;

    function estimateOutcome(
      revLift: number,
      costLift: number,
      label: "optimistic" | "expected" | "cautious"
    ) {
      const newRevenue = revenue * (organicFactor + revLift);
      const addedCost = costs * costLift;
      const newCosts = costs + addedCost;
      const newProfit = newRevenue - newCosts;
      const incrementalProfit = newProfit - baseMonthlyProfit;

      let breakevenMonths: number | null;
      if (incrementalProfit <= 0 && addedCost > 0) {
        breakevenMonths = null;
      } else if (addedCost <= 0 || incrementalProfit <= 0) {
        breakevenMonths = 0;
      } else {
        const upfront = addedCost * 1.5;
        breakevenMonths = upfront / incrementalProfit;
      }

      const churnPressure = tmpl.sensitivity.churnRisk * revLift * 1.2;
      const execPressure = costLift * 0.4;
      const marginPressure = baseMargin < 0.15 ? 0.15 : 0;
      const outcomeRisk =
        riskBase +
        churnPressure +
        execPressure +
        marginPressure -
        (label === "optimistic" ? 0.06 : label === "cautious" ? -0.02 : 0);

      return {
        label,
        revenue: newRevenue,
        costs: newCosts,
        profit: newProfit,
        incrementalProfit,
        revenueDeltaRate: newRevenue / revenue - 1,
        profitDeltaRate:
          baseMonthlyProfit !== 0 ? newProfit / baseMonthlyProfit - 1 : 0,
        costDeltaRate: newCosts / costs - 1,
        breakevenMonths,
        riskScore: ccClamp(outcomeRisk * 100, 0, 100),
      };
    }

    const optimistic = estimateOutcome(
      optimisticRevenueLift,
      optimisticCostLift,
      "optimistic"
    );
    const expected = estimateOutcome(
      expectedRevenueLift,
      expectedCostLift,
      "expected"
    );
    const cautious = estimateOutcome(
      cautiousRevenueLift,
      cautiousCostLift,
      "cautious"
    );

    const riskIndex =
      (optimistic.riskScore * 0.2 +
        expected.riskScore * 0.5 +
        cautious.riskScore * 0.3) /
      1;

    const recos = ccBuildRecommendations({
      tmpl,
      goal,
      timeframe,
      baseMonthlyProfit,
      baseMargin,
      optimistic,
      expected,
      cautious,
      description,
    });

    return {
      template: tmpl,
      goal,
      summary: ccBuildSummaryText({
        tmpl,
        goal,
        timeframe,
        description,
        baseMonthlyProfit,
        baseMargin,
        expected,
      }),
      riskIndex,
      outcomes: { optimistic, expected, cautious },
      recos,
    };
  }

  function ccBuildSummaryText(ctx: {
    tmpl: any;
    goal: { label: string };
    timeframe: number;
    description: string;
    baseMonthlyProfit: number;
    baseMargin: number;
    expected: any;
  }) {
    const { tmpl, goal, timeframe, baseMargin, expected } = ctx;

    const label = tmpl.label.toLowerCase();
    const marginText =
      baseMargin > 0.28
        ? "healthy"
        : baseMargin > 0.15
        ? "tight"
        : baseMargin > 0
        ? "very tight"
        : "negative";

    const expDelta =
      expected.incrementalProfit >= 0
        ? "higher monthly profit"
        : "a profit drag unless you adjust costs";

    const goalFocus = goal.label.toLowerCase();

    return `You’re planning a ${label} with a ${timeframe}-month window and a ${goalFocus} focus. Current margin is ${marginText}, and the expected path shows ${expDelta}.`;
  }

  function ccBuildRecommendations(ctx: {
    tmpl: any;
    goal: { label: string };
    timeframe: number;
    baseMonthlyProfit: number;
    baseMargin: number;
    optimistic: any;
    expected: any;
    cautious: any;
    description: string;
  }) {
    const {
      tmpl,
      goal,
      timeframe,
      baseMonthlyProfit,
      baseMargin,
      optimistic,
      expected,
      cautious,
    } = ctx;

    const isCashTight = baseMonthlyProfit < 0 || baseMargin < 0.1;
    const isHighRisk = expected.riskScore > 70 || cautious.riskScore > 75;

    const textLabel = tmpl.label.toLowerCase();

    const recos: {
      id: string;
      label: string;
      mode: string;
      body: string;
      tradeoff: string;
    }[] = [];

    // Conservative
    recos.push({
      id: "conservative",
      label: "Conservative",
      mode: "smaller bet, protect runway",
      body: `Run a limited ${textLabel} pilot first (1–2 segments or a small budget slice). Lock monthly downside so any loss stays below ${ccCurrencyFormat(
        Math.abs(baseMonthlyProfit) ||
          (expected.incrementalProfit * -1 || 2000)
      )}. Track churn, payback, and lead quality weekly.`,
      tradeoff:
        "Upside will be slower. If results are strong, you’ll need a second change cycle to fully ramp.",
    });

    // Balanced
    recos.push({
      id: "balanced",
      label: "Balanced",
      mode: "controlled rollout",
      body: `Roll out the ${textLabel} in phased waves over ${Math.min(
        timeframe,
        6
      )} months. Tie spend or headcount unlocks to hard triggers: CAC, payback under ${Math.max(
        6,
        Math.round(timeframe * 1.2)
      )} months, and no more than 2–3 pts drop in margin.`,
      tradeoff:
        "You avoid extreme outcomes, but if a competitor moves faster you may miss some upside in the optimistic path.",
    });

    // Aggressive
    recos.push({
      id: "aggressive",
      label: "Aggressive",
      mode: "front-load upside, accept volatility",
      body: `Move ahead with the full ${textLabel} plan quickly if you can tolerate a temporary margin hit. Use the expected path as the minimum acceptable result and cut back fast if you see churn, CAC, or sales cycle time trending toward the cautious case.`,
      tradeoff:
        "Runway and team capacity will be under pressure. Requires tight weekly dashboards and willingness to reverse if signals go bad.",
    });

    if (isCashTight || isHighRisk) {
      recos[2].body = `Only choose the aggressive path if you have buffer for several months of lower profit. With current margins, protect payroll and core operations first, then scale the ${textLabel} as you see repeatable success.`;
      recos[2].tradeoff =
        "You may have to say no to attractive opportunities until cash improves, but you avoid a forced reset later.";
    }

    if (goal.label === "Profit") {
      recos[1].body = `Phase the ${textLabel} with strict payback rules. Any extra spend or hiring must pay back in under ${Math.max(
        6,
        Math.round(timeframe)
      )} months. Use the cautious path as a guardrail and pause rollout if profit drops below today’s level.`;
    }

    return recos;
  }

  // ------------------------------
  // Rendering
  // ------------------------------
  function ccRenderResult(ctx: {
    result: any;
    input: {
      templateId: string;
      description: string;
      revenue: number;
      costs: number;
      goalKey: string;
      months: number;
    };
    summaryMain: HTMLElement;
    summaryMeta: HTMLElement;
    riskScoreEl: HTMLElement;
    riskThumb: HTMLElement;
    riskNote: HTMLElement;
    outcomesContainer: HTMLElement;
    recosContainer: HTMLElement;
  }) {
    const {
      result,
      input,
      summaryMain,
      summaryMeta,
      riskScoreEl,
      riskThumb,
      riskNote,
      outcomesContainer,
      recosContainer,
    } = ctx;

    const { template, goal, summary, riskIndex, outcomes, recos } = result;
    const { revenue, costs, months } = input;

    const baseProfit = revenue - costs;
    const baseMargin = revenue > 0 ? baseProfit / revenue : 0;

    // Summary
    const decisionText =
      input.description ||
      `A ${template.label.toLowerCase()} focused on ${goal.label.toLowerCase()}.`;
    summaryMain.innerHTML = `${summary}<br/><br/><strong>Decision:</strong> ${decisionText}`;

    summaryMeta.innerHTML = "";
    const metaItems = [
      `Baseline revenue: ${ccCurrencyFormat(revenue)}/month`,
      `Baseline profit: ${ccCurrencyFormat(baseProfit)}/month`,
      `Margin: ${ccPercentFormat(baseMargin)}`,
      `Goal: ${goal.label}`,
      `Timeframe: ${months} month${months === 1 ? "" : "s"}`,
    ];
    metaItems.forEach((text) => {
      const pill = document.createElement("span");
      pill.className = "cc-summary-pill";
      pill.textContent = text;
      summaryMeta.appendChild(pill);
    });

    // Risk
    const riskClean = Math.round(ccClamp(riskIndex, 0, 100));
    riskScoreEl.innerHTML = `${riskClean}<span>/100</span>`;
    riskThumb.style.left = ccClamp(riskClean, 4, 96) + "%";

    let riskLabel: string;
    if (riskClean < 35) {
      riskLabel = "Low structural risk. The main exposure is execution quality and focus.";
    } else if (riskClean < 65) {
      riskLabel =
        "Moderate risk. Watch churn, CAC, and delivery load closely as you roll out.";
    } else {
      riskLabel =
        "High risk. A misstep here can hit runway, team capacity, or customer trust.";
    }
    riskNote.textContent = riskLabel;

    // Outcomes
    outcomesContainer.innerHTML = "";
    (["optimistic", "expected", "cautious"] as const).forEach((key) => {
      const o = outcomes[key];
      const card = document.createElement("div");
      card.className = "cc-outcome-card";

      const header = document.createElement("div");
      header.className = "cc-outcome-header";

      const title = document.createElement("div");
      title.className = "cc-outcome-title";
      title.textContent =
        key === "optimistic"
          ? "Optimistic"
          : key === "expected"
          ? "Expected"
          : "Cautious";

      const tag = document.createElement("div");
      tag.className = "cc-outcome-tag";
      tag.textContent =
        key === "optimistic"
          ? "Strong signal · Fast payback"
          : key === "expected"
          ? "Most likely path"
          : "Downside guardrail";

      header.appendChild(title);
      header.appendChild(tag);
      card.appendChild(header);

      const main = document.createElement("div");
      const monthlyRevDelta = o.revenue - revenue;
      const sign = monthlyRevDelta >= 0 ? "+" : "–";
      const absDelta = Math.abs(monthlyRevDelta);
      main.className = "cc-outcome-main";
      main.innerHTML = `${ccCurrencyFormat(
        o.profit
      )}/month profit&nbsp;<span>(${sign}${ccCurrencyFormat(
        absDelta
      )} vs now)</span>`;
      card.appendChild(main);

      const grid = document.createElement("div");
      grid.className = "cc-outcome-grid";

      const m1 = document.createElement("div");
      m1.className = "cc-outcome-metric";
      m1.innerHTML = `<strong>${ccCurrencyFormat(
        o.revenue
      )}/mo</strong> revenue (${ccPercentFormat(o.revenueDeltaRate)})`;

      const m2 = document.createElement("div");
      m2.className = "cc-outcome-metric";
      m2.innerHTML = `<strong>${ccCurrencyFormat(
        o.costs
      )}/mo</strong> costs (${ccPercentFormat(o.costDeltaRate)})`;

      const m3 = document.createElement("div");
      m3.className = "cc-outcome-metric";
      m3.innerHTML = `<strong>${ccPercentFormat(
        o.profitDeltaRate
      )}</strong> profit change`;

      const m4 = document.createElement("div");
      m4.className = "cc-outcome-metric";
      m4.innerHTML =
        o.breakevenMonths == null
          ? "<strong>No clear break-even</strong> in this window"
          : `<strong>${
              o.breakevenMonths <= 0
                ? "Immediate"
                : o.breakevenMonths.toFixed(1).replace(/\.0$/, "") + " mo"
            }</strong> to break-even`;

      [m1, m2, m3, m4].forEach((x) => grid.appendChild(x));
      card.appendChild(grid);

      const riskLine = document.createElement("div");
      riskLine.className = "cc-outcome-risk";
      riskLine.textContent = `Risk driver: ${
        key === "optimistic"
          ? "you must execute fast without overloading the team."
          : key === "expected"
          ? "you need disciplined tracking of churn, CAC, and cycle times."
          : "you risk higher churn, lower win rates, or a heavier fixed-cost base."
      }`;
      card.appendChild(riskLine);

      outcomesContainer.appendChild(card);
    });

    // Recommendations
    recosContainer.innerHTML = "";
    recos.forEach((r: any) => {
      const card = document.createElement("div");
      card.className = "cc-reco-card";

      const header = document.createElement("div");
      header.className = "cc-reco-title-row";

      const title = document.createElement("div");
      title.className = "cc-reco-title";
      title.textContent = r.label;

      const chip = document.createElement("div");
      chip.className = "cc-reco-chip";
      chip.textContent = r.mode;

      header.appendChild(title);
      header.appendChild(chip);

      const body = document.createElement("div");
      body.className = "cc-reco-body";
      body.innerHTML = r.body;

      const tradeoff = document.createElement("div");
      tradeoff.className = "cc-reco-tradeoff";
      tradeoff.textContent = "Tradeoff: " + r.tradeoff;

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(tradeoff);
      recosContainer.appendChild(card);
    });
  }

  // ------------------------------
  // DOM wiring and interactions
  // ------------------------------

  // Populate template select and chips
  ccTemplates.forEach((tmpl, idx) => {
    const opt = document.createElement("option");
    opt.value = tmpl.id;
    opt.textContent = tmpl.label;
    templateSelect.appendChild(opt);

    const chip = document.createElement("button");
    chip.className = "cc-chip" + (idx === 0 ? " active" : "");
    chip.textContent = tmpl.label;
    (chip as any).dataset.templateId = tmpl.id;
    chip.title = tmpl.short;
    templateChipsContainer.appendChild(chip);

    chip.addEventListener("click", () => {
      templateSelect.value = tmpl.id;
      Array.from(templateChipsContainer.children).forEach((c) =>
        c.classList.remove("active")
      );
      chip.classList.add("active");
      ccHintForTemplate(tmpl);
    });

    if (idx === 0) {
      templateSelect.value = tmpl.id;
    }
  });

  templateSelect.addEventListener("change", () => {
    const tmpl = ccPickTemplate(templateSelect.value);
    Array.from(templateChipsContainer.children).forEach((chip) => {
      const el = chip as HTMLButtonElement;
      chip.classList.toggle(
        "active",
        (el.dataset.templateId || "") === tmpl.id
      );
    });
    ccHintForTemplate(tmpl);
  });

  function ccHintForTemplate(tmpl: any) {
    const map: Record<string, string> = {
      pricing_change: "Think % change, which plans, and when.",
      hiring_decision: "Think role, seniority, start date, and salary band.",
      expansion_location: "Think new market size, ramp time, and setup spend.",
      marketing_budget: "Think channels, extra spend, and CAC expectations.",
      product_launch: "Think launch scope, build cost, and target segment.",
      operational_scaling: "Think infra, tools, and support capacity.",
      sales_strategy: "Think ICP, territory, and deal cycle length.",
    };
    templateHint.textContent =
      map[tmpl.id] || "Pick a decision type that matches your move.";
  }

  // Goal chips
  let currentGoal = "growth";
  Array.from(goalChipsContainer.children).forEach((chip) => {
    const btn = chip as HTMLButtonElement;
    btn.addEventListener("click", () => {
      currentGoal = btn.dataset.goal || "growth";
      Array.from(goalChipsContainer.children).forEach((c) =>
        c.classList.remove("active")
      );
      btn.classList.add("active");
    });
  });

  // Core run handler
  runBtn.addEventListener("click", () => {
    const revenue = parseFloat(revenueEl.value);
    const costs = parseFloat(costsEl.value);
    let months = parseInt(timeframeEl.value, 10);

    let hasError = false;
    [revenueEl, costsEl, timeframeEl].forEach((el) =>
      el.classList.remove("cc-error")
    );
    [revenueError, costsError, timeframeError].forEach(
      (n) => (n.style.display = "none")
    );

    if (isNaN(revenue) || revenue <= 0) {
      hasError = true;
      revenueEl.classList.add("cc-error");
      revenueError.style.display = "block";
    }
    if (isNaN(costs) || costs <= 0) {
      hasError = true;
      costsEl.classList.add("cc-error");
      costsError.style.display = "block";
    }

    if (isNaN(months) || months <= 0) {
      months = 6;
      timeframeError.style.display = "block";
      timeframeEl.classList.add("cc-error");
    } else if (months < 3 || months > 12) {
      timeframeError.style.display = "block";
      timeframeEl.classList.add("cc-error");
    }

    if (hasError) return;

    const input = {
      templateId: templateSelect.value,
      description: descriptionEl.value.trim(),
      revenue,
      costs,
      goalKey: currentGoal,
      months,
    };

    const result = ccSimulateDecision(input);
    ccRenderResult({
      result,
      input,
      summaryMain,
      summaryMeta,
      riskScoreEl,
      riskThumb,
      riskNote,
      outcomesContainer,
      recosContainer,
    });
  });

  // Initial hint
  ccHintForTemplate(ccPickTemplate(templateSelect.value));
}

export default function CloudiCoreSimulator() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Insert the HTML into the React page
    containerRef.current.innerHTML = CLOUDICORE_HTML;

    // Initialize simulator logic on that HTML
    const root = containerRef.current.querySelector(
      "#cloudicore-root"
    ) as HTMLElement | null;
    if (root) {
      initCloudiCore(root);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* This is where the simulator gets mounted */}
        <div ref={containerRef} />
      </div>
    </div>
  );
}
