const plans = [
  {
    name: "Starter",
    price: "$19.99",
    features: ["5 simulations / month", "Summary reports", "Basic templates", "Email support"]
  },
  {
    name: "Pro",
    price: "$49.99",
    tag: "Recommended",
    highlight: true,
    features: ["25 simulations / month", "Dashboard", "Scenario history", "Advanced templates", "Priority support"]
  },
  {
    name: "Enterprise",
    price: "$99.99",
    features: ["Unlimited simulations", "Team collaboration", "Advanced analytics", "Custom templates", "API access"]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="section space-y-8">
      <h2 className="text-4xl font-bold text-center">Choose Your Plan</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(p => (
          <div key={p.name} className={`card flex flex-col justify-between ${p.highlight ? "border-purple-500/70" : ""}`}>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                {p.tag && <span className="text-xs px-2 py-1 rounded bg-purple-600">{p.tag}</span>}
              </div>

              <p className="text-3xl font-bold">{p.price}</p>

              <ul className="mt-3 text-sm text-slate-300 space-y-2">
                {p.features.map(f => (
                  <li key={f}>✔ {f}</li>
                ))}
              </ul>
            </div>

            <a href="#contact" className="block text-center mt-6 py-2 rounded-xl bg-cloudi-card hover:bg-slate-900">
              Start Simulating
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
