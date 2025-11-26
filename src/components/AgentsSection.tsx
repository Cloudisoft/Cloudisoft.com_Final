const features = [
  { icon: "💬", title: "Custom-Trained Intelligence", desc: "Agents tailored to your business workflows." },
  { icon: "🔗", title: "Seamless Integrations", desc: "Connect CRMs, APIs, Google Sheets and more." },
  { icon: "📞", title: "Multi-Channel Communication", desc: "Voice, email, SMS, natural conversations." },
  { icon: "📈", title: "Continuous Learning", desc: "Agents learn from every interaction." },
  { icon: "🤖", title: "Virtual Team Members", desc: "Operate like 24/7 smart employees." },
  { icon: "✉️", title: "Lead Generation & Support", desc: "Automated nurturing & customer handling." }
];

export default function AgentsSection() {
  return (
    <section id="agents" className="section space-y-8">
      <h2 className="text-center text-4xl font-bold">
        Automate Intelligence. <span className="gradient-text">Amplify Growth.</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map(f => (
          <div key={f.title} className="card">
            <div className="text-3xl">{f.icon}</div>
            <h3 className="font-semibold mt-2">{f.title}</h3>
            <p className="text-slate-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
