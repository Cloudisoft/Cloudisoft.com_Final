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
  // Instead of document.getElementById, we use root.querySelector
  // Example of how to adapt your script:

  // const templateSelect = document.getElementById("cc-template");
  const templateSelect = root.querySelector("#cc-template") as HTMLSelectElement | null;
  const templateChipsContainer = root.querySelector("#cc-template-chips") as HTMLElement | null;
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

  // 👉 Now paste ALL your JS from <script> ... </script> BELOW,
  // but:
  // - remove the outer IIFE (the "(function initCloudiCore() { ... })();" wrapper)
  // - wherever the script used document.getElementById / querySelector,
  //   change it to use the variables above (templateSelect, revenueEl, etc.)
  //
  // Everything else (ccTemplates, ccSimulateDecision, ccRenderResult, etc.)
  // can stay exactly the same.
}

export default function CloudiCoreSimulator() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Insert the HTML into the React page
    containerRef.current.innerHTML = CLOUDICORE_HTML;

    // Initialize simulator logic on that HTML
    initCloudiCore(containerRef.current.querySelector("#cloudicore-root") as HTMLElement);
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

