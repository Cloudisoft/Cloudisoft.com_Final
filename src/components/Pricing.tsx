import { Link } from "react-router-dom";
export default function PricingSection() {
  return (
    <section id="pricing" className="section text-center space-y-8">
      <span className="inline-flex items-center rounded-full border border-purple-500/60 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-purple-200">
        CloudiCore Free Trial
      </span>

      <div className="space-y-4">
        <h2 className="text-4xl font-bold md:text-5xl">
          Start Your <span className="gradient-text">Free Trial</span>
        </h2>
        <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-400">
          Try the CloudiCore decision simulator free for 7 days. Run realistic
          what-if scenarios, compare optimistic vs expected vs cautious paths,
          and see risk and profit impact before you commit budget or headcount.
          No credit card required during the trial.
        </p>
      </div>
     <div className="mt-4 flex flex-col items-center justify-center gap-3 md:flex-row">
        {/* <a
          className="btn-primary inline-flex items-center gap-2"
          target="_blank"
          rel="noreferrer"
        > */}
      <Link className="btn-primary inline-flex items-center gap-2 mt-4 flex flex-col items-center justify-center gap-3 md:flex-row" to="/cloudicore">
          Start Your Free Trial
          <span>▶</span>
        </Link>
        {/* </a> */}

        <p className="text-xs text-slate-500">
          7 days full access · Unlimited simulations · Cancel anytime during trial
        </p>
      </div>
    </section>
  );
}
