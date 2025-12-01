import { useEffect, useRef } from "react";
import "./cloudicore.css";

// 1) HTML markup for the simulator (body content only)
const CLOUDICORE_HTML = `
<div id="cloudicore-root">
  <div class="cc-shell" id="simulator">
    <!-- PASTE your existing CloudiCore HTML here,
         starting from  <div class="cc-shell"...> down to the last </div>
         BEFORE the old <script> tag -->
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
