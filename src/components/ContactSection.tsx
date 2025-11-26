import { FormEvent, useState } from "react";

// This will be set in Render as VITE_API_URL
//const API_URL = import.meta.env.VITE_API_URL || "";

const API_URL = "https://cloudisoft-contact-api.onrender.com";

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

    // Convert FormData → plain object → JSON
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(
          data.message || "Something went wrong. Please try again in a moment."
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="section space-y-8">
      <h2 className="text-4xl font-bold text-center">
        Let&apos;s Build the <span className="gradient-text">Future Together</span>
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
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn-primary w-full disabled:opacity-70"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Submit Inquiry ✈️"}
          </button>
        </div>

        {status === "success" && (
          <p className="md:col-span-2 text-sm text-green-400">
            ✅ Thank you! Your message has been sent.
          </p>
        )}

        {status === "error" && (
          <p className="md:col-span-2 text-sm text-red-400">
            ⚠ {errorMsg}
          </p>
        )}
      </form>
    </section>
  );
}

