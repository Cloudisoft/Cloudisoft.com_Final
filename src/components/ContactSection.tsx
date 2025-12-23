import { FormEvent, useState } from "react";

export default function ContactSection() {
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/meejvlpq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg("Failed to send. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="section space-y-8">
      <h2 className="text-4xl font-bold text-center">
        Let&apos;s Build the{" "}
        <span className="gradient-text">Future Together</span>
      </h2>

      <form onSubmit={handleSubmit} className="card grid gap-6 md:grid-cols-2">
        <div>
          <input name="name" placeholder="Name *" required className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm" />
        </div>

        <div>
          <input name="business" placeholder="Business Name" className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm" />
        </div>

        <div>
          <input name="email" type="email" placeholder="Email *" required className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm" />
        </div>

        <div>
          <input name="phone" placeholder="Phone" className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm" />
        </div>

        <div className="md:col-span-2">
          <textarea name="message" placeholder="Message / Requirements *" required rows={5} className="w-full bg-black/30 border border-slate-700 p-3 rounded text-sm" />
        </div>

        <div className="md:col-span-2">
          <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
            {status === "loading" ? "Sending..." : "Submit Inquiry ✈️"}
          </button>
        </div>

        {status === "success" && (
          <p className="md:col-span-2 text-green-400 text-sm">
            ✅ Thank you! Your message has been sent.
          </p>
        )}

        {status === "error" && (
          <p className="md:col-span-2 text-red-400 text-sm">
            ⚠ {errorMsg}
          </p>
        )}
      </form>
    </section>
  );
}
