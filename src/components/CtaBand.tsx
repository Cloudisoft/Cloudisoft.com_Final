import { CONTACT } from "../lib/site";
import { PhoneIcon, WhatsApp } from "./Icons";

export default function CtaBand() {
  return (
    <section aria-label="Get in touch" className="section py-10">
      <div className="reveal reveal-scale sheen relative overflow-hidden rounded-[28px] px-7 py-14 text-ink sm:px-14 sm:py-16" style={{ background: "var(--brand-grad)" }}>
        <svg aria-hidden="true" className="float-y absolute -right-10 -top-10 h-64 w-64 opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#0b031c" strokeWidth=".6" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="#0b031c" strokeWidth=".6" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#0b031c" strokeWidth=".6" />
        </svg>
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-[2.6rem]">Have a project in mind?</h2>
            <p className="mt-3 text-[16px] text-ink/75">Send us a message on WhatsApp or give us a call — you’ll talk to the people who build it.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn bg-ink text-bone hover:bg-ink-700">
              <WhatsApp /> WhatsApp us
            </a>
            <a href={CONTACT.phone.tel} className="btn border border-ink/30 text-ink hover:bg-ink/10">
              <PhoneIcon /> {CONTACT.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
