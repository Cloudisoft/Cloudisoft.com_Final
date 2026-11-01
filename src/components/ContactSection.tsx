import { FormEvent, useState } from "react";
import { ArrowRight } from "./Icons";
import ContactOptions from "./ContactOptions";
import OfficeMap from "./OfficeMap";
import Social from "./Social";
import GoogleProfile from "./GoogleProfile";

const FORM_ENDPOINT = "https://formspree.io/f/meejvlpq";
const TOPICS = ["Website", "Automations", "CRM setup", "AI voice agent", "Cloud, security & compliance", "ApplyFlux / CloudiVoice", "Something else"];

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never see or fill this field.
    if (String(data.get("_gotcha") || "").trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        credentials: "omit",
        referrerPolicy: "strict-origin-when-cross-origin",
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg("That didn’t go through. Please try again, or email us directly.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again, or email us directly.");
    }
  };

  const label = "mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-mute";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t hairline py-28 lg:py-36">
      <div aria-hidden="true" className="glow bottom-[-200px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 bg-ember/15" />
      <div className="section relative grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <p className="reveal eyebrow">Contact</p>
          <h2 id="contact-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ ["--d" as any]: "80ms" }}>
            Tell us what you need.
            <br />
            <span className="gradient-text">We’ll take it from there.</span>
          </h2>
          <p className="reveal mt-6 max-w-md text-[15.5px] leading-relaxed text-bone/65" style={{ ["--d" as any]: "160ms" }}>
            WhatsApp, call, text or use the form — a short description is enough. We reply with questions, a plan and a quote.
          </p>

          <div className="reveal mt-10" style={{ ["--d" as any]: "240ms" }}>
            <ContactOptions />
          </div>
          <div className="reveal mt-8 flex items-center gap-4" style={{ ["--d" as any]: "300ms" }}>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Follow us</span>
            <Social />
          </div>
          <div className="reveal mt-6" style={{ ["--d" as any]: "340ms" }}>
            <GoogleProfile />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="reveal card grid gap-5 !p-7 sm:grid-cols-2 sm:!p-9" style={{ ["--d" as any]: "200ms" }} noValidate={false}>
          <input type="hidden" name="_subject" value="New inquiry from cloudisoft.com" />
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label>
              Leave this empty
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div>
            <label htmlFor="c-name" className={label}>Name *</label>
            <input id="c-name" name="name" required maxLength={100} autoComplete="name" className="field" />
          </div>
          <div>
            <label htmlFor="c-business" className={label}>Business</label>
            <input id="c-business" name="business" maxLength={120} autoComplete="organization" className="field" />
          </div>
          <div>
            <label htmlFor="c-email" className={label}>Email *</label>
            <input id="c-email" name="email" type="email" required maxLength={160} autoComplete="email" className="field" />
          </div>
          <div>
            <label htmlFor="c-phone" className={label}>Phone</label>
            <input id="c-phone" name="phone" type="tel" maxLength={32} autoComplete="tel" pattern="[0-9+()\-\s.]{6,32}" className="field" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="c-topic" className={label}>Interested in</label>
            <select id="c-topic" name="interest" className="field appearance-none bg-ink-800" defaultValue={TOPICS[0]}>
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="c-message" className={label}>How can we help? *</label>
            <textarea
              id="c-message"
              name="message"
              required
              rows={5}
              minLength={10}
              maxLength={4000}
              placeholder="e.g. A 5-page website with online booking, or an AI agent to answer calls after hours."
              className="field resize-y"
            />
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-mute">We only use your details to reply to this enquiry.</p>
            <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
              {status === "loading" ? "Sending…" : "Send enquiry"} <ArrowRight />
            </button>
          </div>

          <div aria-live="polite" className="sm:col-span-2">
            {status === "success" && <p className="text-sm text-sun">Thanks — your message is in. We’ll be in touch shortly.</p>}
            {status === "error" && <p className="text-sm text-ember">{errorMsg}</p>}
          </div>
        </form>
      </div>

      <div className="section relative mt-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h3 className="reveal text-2xl font-semibold sm:text-3xl">Visit us</h3>
          <p className="reveal text-[13.5px] text-mute">Offices in Ahmedabad, India and Hillside, New Jersey.</p>
        </div>
        <div className="reveal reveal-scale">
          <OfficeMap />
        </div>
      </div>
    </section>
  );
}
