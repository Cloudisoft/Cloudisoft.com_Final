// src/pages/CloudiCore.tsx
import { useEffect } from "react";
import "./cloudicore.css";

// Put all your simulator HTML here as a single string
const CLOUDICORE_HTML = `
<div id="cloudicore-root">
  <div class="cc-shell">
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
            <textarea
              id="cc-description"
              class="cc-textarea"
              placeholder="Example: Increase prices by 15% on our SaaS plans from next quarter to improve margins without losing key customers."
            ></textarea>
          </div>

          <div class="cc-split-2">
            <div>
              <div class="cc-field-label">
                <span>Current monthly revenue</span>
                <small>Approximate, in your currency</small>
              </div>
              <input
                id="cc-revenue"
                class="cc-input"
                type="number"
                min="0"
                step="100"
                placeholder="e.g. 50000"
              />
              <div class="cc-error-text" id="cc-revenue-error" style="display:none;">
                Enter a rough monthly revenue to simulate impact.
              </div>
            </div>
            <div>
              <div class="cc-field-label">
                <span>Major monthly costs / budget</span>
                <small>Ops + salaries + spend</small>
              </div>
              <input
                id="cc-costs"
                class="cc-input"
                type="number"
                min="0"
                step="100"
                placeholder="e.g. 35000"
              />
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
              <input
                id="cc-timeframe"
                class="cc-input"
                type="number"
                min="1"
                max="12"
                placeholder="e.g. 6"
              />
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
`;

export default function CloudiCore() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/cloudicore.js"; // cloudicore.js MUST be in /public
    script.defer = true;
    document.body.appendChild(script);

    // clean up if user navigates away
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: CLOUDICORE_HTML }} />;
}
