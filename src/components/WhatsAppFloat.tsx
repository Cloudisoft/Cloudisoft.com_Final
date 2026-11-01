import { CONTACT } from "../lib/site";
import { WhatsApp } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={CONTACT.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Cloudisoft on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-[#0b1f12] shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.8s]" />
      <WhatsApp className="relative h-6 w-6" />
      <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:max-w-[8rem] group-hover:pr-1 sm:inline">
        Chat with us
      </span>
    </a>
  );
}
