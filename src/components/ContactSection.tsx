export default function ContactSection() {
  return (
    <section id="contact" className="section space-y-8">
      <h2 className="text-4xl font-bold text-center">
        Let&apos;s Build the <span className="gradient-text">Future Together</span>
      </h2>

      <form className="card grid gap-6 md:grid-cols-2">
        <input placeholder="Name *" required className="bg-black/30 border border-slate-700 p-3 rounded" />
        <input placeholder="Business Name" className="bg-black/30 border border-slate-700 p-3 rounded" />
        <input placeholder="Email *" required className="bg-black/30 border border-slate-700 p-3 rounded" />
        <input placeholder="Phone" className="bg-black/30 border border-slate-700 p-3 rounded" />

        <textarea
          placeholder="Message / Requirements *"
          required
          rows={4}
          className="md:col-span-2 bg-black/30 border border-slate-700 p-3 rounded"
        />

        <button type="submit" className="md:col-span-2 btn-primary w-full">
          Submit Inquiry ✈️
        </button>
      </form>
    </section>
  );
}
