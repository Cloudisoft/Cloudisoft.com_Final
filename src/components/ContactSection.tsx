import { FormEvent, useState } from "react";
import { CONTACT } from "../lib/site";
import { ArrowRight } from "./Icons";

const FORM_ENDPOINT = "https://formspree.io/f/meejvlpq";
const TOPICS = ["A custom AI agent", "CloudiVoice", "ApplyFlux", "CloudiCore", "RapidBuild website", "Something else"];

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
          <p className="reveal eyebrow">06 — Contact</p>
          <h2 id="contact-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ ["--d" as any]: "80ms" }}>
            Tell us the job.
            <br />
            <span className="gradient-text">We’ll tell you if an agent can do it.</span>
          </h2>
          <p className="reveal mt-6 max-w-md text-[15.5px] leading-relaxed text-bone/65" style={{ ["--d" as any]: "160ms" }}>
            A short description is enough. We reply within one business day with questions, a rough plan or an honest “not yet”.
          </p>

          <div className="reveal mt-12 grid gap-8 sm:grid-cols-2" style={{ ["--d" as any]: "240ms" }}>
            <div>
              <p className={label}>Email</p>
              <a href={`mailto:${CONTACT.email}`} className="text-bone hover:text-sun">
                {CONTACT.email}
              </a>
              <p className={`${label} mt-6`}>Phone</p>
              <ul className="space-y-1 text-bone/85">
                {CONTACT.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="hover:text-sun">
                      {p.display}
                    </a>{" "}
                    <span className="text-xs text-mute">{p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {CONTACT.offices.map((o) => (
                <address key={o.city} className="mb-6 not-italic">
                  <p className={label}>{o.city}</p>
                  {o.lines.map((l) => (
                    <span key={l} className="block text-bone/85">
                      {l}
                    </span>
                  ))}
                </address>
              ))}
            </div>
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
            <label htmlFor="c-message" className={label}>What should the agent do? *</label>
            <textarea
              id="c-message"
              name="message"
              required
              rows={5}
              minLength={10}
              maxLength={4000}
              placeholder="e.g. Answer clinic calls after 6pm and book appointments into our calendar."
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
    </section>
  );
}
