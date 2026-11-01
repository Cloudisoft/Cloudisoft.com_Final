// Single source of truth for links, services, pricing, contact details and FAQs.
// Used by the pages *and* by the structured data, so keep them in sync.

export const SITE_URL = "https://www.cloudisoft.com";
export const COMPANY = "Cloudisoft LLC";

export const LINKS = {
  cloudivoice: "https://cloudivoice.cloudisoft.com/",
  applyflux: "https://applyflux.cloudisoft.com/",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "ApplyFlux", href: LINKS.applyflux },
  { label: "CloudiVoice", href: LINKS.cloudivoice },
];

const WA_NUMBER = "918866819132";
const US_NUMBER = "+14849907692";

export const CONTACT = {
  email: "connect@cloudisoft.com",
  whatsapp: {
    display: "+91 88668 19132",
    href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Cloudisoft, I'd like to talk about a project.")}`,
  },
  phone: {
    display: "+1 (484) 990-7692",
    tel: `tel:${US_NUMBER}`,
    sms: `sms:${US_NUMBER}`,
    raw: US_NUMBER,
  },
  offices: [
    {
      id: "ahmedabad",
      city: "Ahmedabad, India",
      lines: ["C-1229, Siddhivinayak Towers", "Makarba, Ahmedabad, Gujarat 380051, India"],
      query: "Siddhivinayak Towers, Makarba, Ahmedabad, Gujarat 380051",
      street: "C-1229, Siddhivinayak Towers, Makarba",
      locality: "Ahmedabad",
      region: "GJ",
      postalCode: "380051",
      country: "IN",
    },
    {
      id: "hillside",
      city: "Hillside, New Jersey",
      lines: ["473 Mundet Place", "Hillside, NJ 07205, USA"],
      query: "473 Mundet Place, Hillside, NJ 07205",
      street: "473 Mundet Place",
      locality: "Hillside",
      region: "NJ",
      postalCode: "07205",
      country: "US",
    },
  ],
};

export const SOCIAL = [
  { label: "Instagram", handle: "@cloudisoftllc", href: "https://www.instagram.com/cloudisoftllc/" },
  { label: "LinkedIn", handle: "Cloudisoft", href: "https://in.linkedin.com/company/cloudisoft-com" },
  { label: "Email", handle: "connect@cloudisoft.com", href: "mailto:connect@cloudisoft.com" },
];

export type ServiceId = "web" | "automation" | "crm" | "voice" | "cloud";

export const SERVICES: {
  id: ServiceId;
  name: string;
  short: string;
  desc: string;
  deliverables: string[];
  from?: number;
}[] = [
  {
    id: "web",
    name: "Websites",
    short: "Fast, search-ready sites and landing pages.",
    desc: "Marketing sites, landing pages and web apps with a real frontend and backend — designed mobile-first, built for speed and search, and handed over with everything you need to run them.",
    deliverables: ["Design & copy structure", "SEO & analytics setup", "Forms, booking & payments", "Hosting & SSL"],
    from: 200,
  },
  {
    id: "automation",
    name: "Automations",
    short: "Stop re-typing data between tools.",
    desc: "We connect your inbox, forms, spreadsheets, calendars and apps so leads, orders and invoices move on their own — with alerts when something needs a person.",
    deliverables: ["Workflow mapping", "API & webhook integrations", "AI document & email handling", "Monitoring & alerts"],
    from: 750,
  },
  {
    id: "crm",
    name: "CRM setup",
    short: "One clear pipeline for every lead.",
    desc: "Set up or clean up your CRM — pipelines, fields, lead routing, follow-up sequences and dashboards — and wire it to your website, WhatsApp, calls and email.",
    deliverables: ["Pipeline design", "Data import & clean-up", "Lead routing & follow-ups", "Reports & dashboards"],
  },
  {
    id: "voice",
    name: "AI voice agents",
    short: "Answer, qualify and book — around the clock.",
    desc: "Phone agents that pick up every call, qualify leads, book appointments and hand off to your team — in English, Hindi and nine more Indian languages, powered by CloudiVoice.",
    deliverables: ["Inbound & outbound calling", "Calendar & CRM booking", "Human handoff", "Transcripts & call QA"],
    from: 1000,
  },
  {
    id: "cloud",
    name: "Cloud, security & compliance",
    short: "Remote IT infrastructure, hardened and audit-ready.",
    desc: "We design and build your cloud infrastructure, lock it down, and prepare you for SOC 2 and similar audits — access control, logging, backups, policies and evidence collection.",
    deliverables: ["Cloud setup & migration", "Identity, access & backups", "Security hardening & monitoring", "SOC 2 readiness & policies"],
    from: 1500,
  },
];

export const PRICING = [
  {
    id: "web",
    name: "Websites",
    from: 200,
    blurb: "Landing pages and business websites.",
    features: ["Mobile-first design", "Basic SEO & analytics", "Contact & lead forms", "Launch support"],
  },
  {
    id: "automation",
    name: "Automations & CRM",
    from: 750,
    blurb: "Workflows that move data for you.",
    features: ["Process mapping", "Tool & API integrations", "CRM pipelines & follow-ups", "Monitoring & alerts"],
  },
  {
    id: "voice",
    name: "AI voice agents",
    from: 1000,
    blurb: "A phone agent trained on your business.",
    features: ["Inbound or outbound agent", "English, Hindi + 9 languages", "Booking & CRM updates", "Transcripts & handoff"],
    featured: true,
  },
  {
    id: "cloud",
    name: "Cloud, security & SOC",
    from: 1500,
    blurb: "Remote IT infrastructure, secured.",
    features: ["Cloud build or migration", "Security hardening", "SOC 2 readiness", "Policies & evidence"],
  },
];

export const PRODUCTS = [
  {
    id: "cloudivoice",
    name: "CloudiVoice",
    kicker: "AI voice agents",
    summary:
      "Phone agents that answer every call, qualify leads, book appointments and follow up — in Hindi, English and nine more Indian languages.",
    points: ["Inbound & outbound", "Human handoff", "Transcripts & QA"],
    href: LINKS.cloudivoice,
    cta: "Explore CloudiVoice",
  },
  {
    id: "applyflux",
    name: "ApplyFlux",
    kicker: "Job applications",
    summary:
      "Upload a resume once. ApplyFlux finds matching roles, fills applications carefully, tracks each one — and pauses whenever a person should decide.",
    points: ["One profile", "Matched roles", "Human-in-the-loop"],
    href: LINKS.applyflux,
    cta: "Explore ApplyFlux",
  },
];

export const TOOLS = [
  "Google Workspace",
  "Microsoft 365",
  "WhatsApp Business",
  "HubSpot",
  "Zoho CRM",
  "Salesforce",
  "Shopify",
  "Stripe",
  "Slack",
  "AWS",
  "Azure",
  "Google Cloud",
];

export const FAQS = [
  {
    q: "What does Cloudisoft do?",
    a: "Cloudisoft builds websites, workflow automations, CRM systems, AI voice agents and secure cloud infrastructure for growing businesses in the US and India. We also run two products: CloudiVoice (AI voice agents) and ApplyFlux (assisted job applications).",
  },
  {
    q: "How much does a project cost?",
    a: "Websites start from $200, automations from $750, AI voice agents from $1,000, and cloud infrastructure, security or SOC compliance work from $1,500. These are starting prices — we send a fixed quote once we understand the scope.",
  },
  {
    q: "Can your voice agents speak Hindi and other Indian languages?",
    a: "Yes. Our voice agents speak Hindi, Indian English, Gujarati, Marathi, Punjabi, Bengali, Tamil, Telugu, Kannada, Malayalam and Odia, including the natural mix of Hindi and English most callers use. You can play an English sample call on our home page.",
  },
  {
    q: "Which tools can you connect?",
    a: "Most tools with an API or webhook — Google Workspace, Microsoft 365, WhatsApp Business, HubSpot, Zoho, Salesforce, Shopify, Stripe, Slack and cloud platforms such as AWS, Azure and Google Cloud.",
  },
  {
    q: "Do you help with SOC 2 compliance?",
    a: "Yes. We prepare your systems and team for SOC 2 and similar audits: access control, logging, backups, security policies and evidence collection. The audit itself is performed by an independent CPA firm, which we can coordinate with.",
  },
  {
    q: "How long does a project take?",
    a: "A landing page can be live within days. Automations and voice agents usually take one to three weeks, depending on integrations. Cloud and compliance work is scoped case by case.",
  },
  {
    q: "How do I contact Cloudisoft?",
    a: "Message us on WhatsApp at +91 88668 19132, call or text +1 (484) 990-7692, or email connect@cloudisoft.com. Our offices are in Ahmedabad, India and Hillside, New Jersey.",
  },
];

/** Per-route metadata, used for prerendering and client-side title updates. */
export const PAGES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Cloudisoft — Websites, Automations, CRM & AI Voice Agents",
    description:
      "Cloudisoft builds websites (from $200), workflow automations and CRMs (from $750), AI voice agents (from $1,000) and secure cloud infrastructure for businesses in the US and India.",
  },
  "/about": {
    title: "About Cloudisoft — Software & AI Studio in New Jersey and Ahmedabad",
    description:
      "Cloudisoft is a software and AI studio with teams in Hillside, New Jersey and Ahmedabad, India, building practical websites, automations and AI voice agents.",
  },
  "/services": {
    title: "Services & Pricing — Websites, Automations, CRM, AI Voice, Cloud | Cloudisoft",
    description:
      "Websites from $200, automations from $750, AI voice agents from $1,000, cloud infrastructure, security and SOC 2 readiness from $1,500. See what's included.",
  },
  "/privacy": {
    title: "Privacy Policy | Cloudisoft",
    description: "How Cloudisoft collects, uses and protects personal information.",
  },
  "/terms": {
    title: "Terms & Conditions | Cloudisoft",
    description: "The terms that govern use of the Cloudisoft website and services.",
  },
};

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
