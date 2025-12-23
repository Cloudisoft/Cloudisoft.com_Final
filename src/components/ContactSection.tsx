import { useForm, ValidationError } from "@formspree/react";

export default function ContactSection() {
  // 🔴 Replace with your real Formspree Form ID
  const [state, handleSubmit] = useForm("meejvlpq");

  return (
    <section id="contact" className="section space-y-8">
      <h2 className="text-4xl font-bold text-center">
        Let&apos;s Build the{" "}
        <span className="gradient-text">Future Together</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="card grid gap-6 md:grid-cols-2"
      >
        <div>
          <input
            name="name"
            placeholder="Name *"
            required
            className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <input
            name="business"
            placeholder="Business Name"
            className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email *"
            required
            className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-xs text-red-400 mt-1"
          />
        </div>

        <div>
          <input
            name="phone"
            placeholder="Phone"
            className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="md:col-span-2">
          <textarea
            name="message"
            placeholder="Message / Requirements *"
            required
            rows={5}
            className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-xs text-red-400 mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={state.submitting}
            className="btn-primary w-full disabled:opacity-70"
          >
            {state.submitting ? "Sending..." : "Submit Inquiry ✈️"}
          </button>
        </div>

        {state.succeeded && (
          <p className="md:col-span-2 text-sm text-green-400">
            ✅ Thank you! Your message has been sent.
          </p>
        )}
      </form>
    </section>
  );
}
