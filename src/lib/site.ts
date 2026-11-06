import { ARTICLES } from "../content/articles";
import { LOCATIONS } from "../content/locations";

// Single source of truth for links, services, pricing, contact details and FAQs.
// Used by the pages *and* by the structured data, so keep them in sync.

export const SITE_URL = "https://www.cloudisoft.com";
export const COMPANY = "Cloudisoft LLC";

export const LINKS = {
  cloudivoice: "https://cloudivoice.cloudisoft.com/",
  applyflux: "https://applyflux.cloudisoft.com/",
  vyomira: "https://vyomira.cloudisoft.com/",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "ApplyFlux", href: LINKS.applyflux },
  { label: "CloudiVoice", href: LINKS.cloudivoice },
  { label: "Vyomira", href: LINKS.vyomira },
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

/** Google Business Profile (place ID decoded from the Google QR code). */
export const GOOGLE_PROFILE = {
  placeId: "ChIJ3WoeINT4Va0R8WXT5Dq7kwI",
  mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ3WoeINT4Va0R8WXT5Dq7kwI",
  reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ3WoeINT4Va0R8WXT5Dq7kwI",
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

export type ServiceDetail = {
  slug: string;
  title: string; // <title>
  metaDescription: string;
  headline: string;
  intro: string;
  goodFit: string[];
  outcomes: { k: string; v: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICE_DETAILS: Record<ServiceId, ServiceDetail> = {
  web: {
    slug: "website-development",
    title: "Website Development from $200 — Business Websites | Cloudisoft",
    metaDescription:
      "Fast, mobile-first business websites and landing pages from $200 — design, SEO, booking, payments and hosting. US & India. Get a quote on WhatsApp.",
    headline: "Websites that load fast, rank and bring in enquiries.",
    intro:
      "We design and build business websites, landing pages and web apps that look sharp on every phone, show up on Google and turn visitors into WhatsApp messages, calls and form enquiries.",
    goodFit: [
      "You need a new website or your current one looks dated",
      "You run ads and need a landing page that converts",
      "Customers should be able to book, pay or enquire online",
      "You want to own your site, domain and data",
    ],
    outcomes: [
      { k: "from $200", v: "landing pages and small business sites" },
      { k: "Days", v: "to launch a landing page" },
      { k: "100%", v: "yours — code, domain and content" },
    ],
    faqs: [
      { q: "How much does a website cost?", a: "A landing page or small business website starts from $200. Larger sites, online stores and web apps are quoted on scope — you get a fixed price before we start." },
      { q: "Will my website show up on Google?", a: "Every site we build includes technical SEO: fast loading, proper titles and descriptions, structured data, a sitemap and Google Search Console setup." },
      { q: "Can you redesign my existing website?", a: "Yes. We can redesign on your current platform or rebuild it, keeping your domain and existing search rankings." },
    ],
  },
  automation: {
    slug: "business-automation",
    title: "Business Process Automation from $750 | Cloudisoft",
    metaDescription:
      "Automate data entry, lead handling, invoicing and reporting. We connect Google Workspace, WhatsApp, CRMs, Sheets and APIs with AI. Automations from $750.",
    headline: "Stop copying data between tools. Let it move on its own.",
    intro:
      "We map how work moves through your business, then connect your forms, inboxes, spreadsheets, CRM and accounting tools so leads, orders and invoices flow automatically — with AI handling the reading, sorting and drafting.",
    goodFit: [
      "Your team re-types the same data into several tools",
      "Leads from forms, ads or WhatsApp get missed or answered late",
      "Invoices, reports or follow-ups are done by hand every week",
      "You want alerts when something needs a person",
    ],
    outcomes: [
      { k: "from $750", v: "per automated workflow" },
      { k: "24/7", v: "runs without anyone watching" },
      { k: "Alerts", v: "when a human needs to step in" },
    ],
    faqs: [
      { q: "What can be automated?", a: "Lead capture and routing, follow-up emails and WhatsApp messages, invoice and order processing, data sync between apps, document reading with AI, and scheduled reports." },
      { q: "Which tools do you connect?", a: "Google Workspace, Microsoft 365, WhatsApp Business, HubSpot, Zoho, Salesforce, Shopify, Stripe, Slack and most tools with an API or webhook." },
      { q: "What happens if an automation fails?", a: "We add monitoring and alerts, so failures are flagged to you straight away instead of silently losing data." },
    ],
  },
  crm: {
    slug: "crm-setup",
    title: "CRM Setup & Integration — HubSpot, Zoho, Salesforce | Cloudisoft",
    metaDescription:
      "CRM setup, clean-up and integration: pipelines, lead routing, follow-up sequences and dashboards, connected to your website, WhatsApp, calls and email.",
    headline: "One clear pipeline for every lead and customer.",
    intro:
      "We set up or clean up your CRM so every lead is captured, assigned and followed up — and connect it to your website, WhatsApp, phone calls and email so nothing lives in someone’s inbox.",
    goodFit: [
      "Leads are tracked in spreadsheets or WhatsApp chats",
      "Your CRM is set up but nobody trusts the data",
      "You can’t see where deals get stuck",
      "You want follow-ups to happen automatically",
    ],
    outcomes: [
      { k: "1", v: "source of truth for every lead" },
      { k: "Auto", v: "lead routing and follow-ups" },
      { k: "Live", v: "pipeline dashboards" },
    ],
    faqs: [
      { q: "Which CRM should I use?", a: "It depends on team size, budget and the tools you already use. We commonly work with HubSpot, Zoho CRM and Salesforce, and recommend one after a short discovery call." },
      { q: "Can you move my data from spreadsheets?", a: "Yes. We import, de-duplicate and clean your existing contacts and deals as part of the setup." },
      { q: "How is CRM work priced?", a: "CRM setup is quoted together with automations, which start from $750. You get a fixed price before work begins." },
    ],
  },
  voice: {
    slug: "ai-voice-agents",
    title: "AI Voice Agents from $1,000 — AI Phone Receptionist | Cloudisoft",
    metaDescription:
      "AI voice agents that answer calls 24/7, qualify leads and book appointments in English, Hindi and 9 Indian languages. Hear a sample call. From $1,000.",
    headline: "An AI phone agent that never misses a call.",
    intro:
      "Our AI voice agents, built on CloudiVoice, answer inbound calls, make outbound follow-ups, qualify leads and book appointments into your calendar — in English, Hindi and nine more Indian languages — and transfer to your team when a caller asks for a person.",
    goodFit: [
      "You miss calls after hours or when lines are busy",
      "Your team spends hours on repetitive enquiry calls",
      "You need to follow up hundreds of leads by phone",
      "Callers speak Hindi, Gujarati or other Indian languages",
    ],
    outcomes: [
      { k: "from $1,000", v: "for a production voice agent" },
      { k: "11", v: "languages, incl. Hindi & Gujarati" },
      { k: "24/7", v: "answers every call" },
    ],
    faqs: [
      { q: "Does the AI voice agent sound natural?", a: "Yes. You can play real sample calls on our home page. Agents handle interruptions, confirm details back to the caller and switch between Hindi and English naturally." },
      { q: "Can the agent transfer calls to a human?", a: "Yes. When a caller asks for a person, or the agent can’t help, it transfers the call to your team with the context." },
      { q: "Can it book appointments and update my CRM?", a: "Yes. Agents check availability, book into your calendar and log every call, transcript and outcome in your CRM." },
    ],
  },
  cloud: {
    slug: "cloud-security-compliance",
    title: "Cloud Security & SOC 2 Readiness from $1,500 | Cloudisoft",
    metaDescription:
      "Cloud infrastructure on AWS, Azure or Google Cloud, security hardening and SOC 2 readiness — access control, backups, logging, policies. From $1,500.",
    headline: "Cloud infrastructure that’s secure and audit-ready.",
    intro:
      "We design, build or migrate your cloud infrastructure, lock it down with strong identity, backups and monitoring, and prepare your company for SOC 2 and similar audits with the policies and evidence auditors ask for.",
    goodFit: [
      "You’re moving from local servers or shared hosting to the cloud",
      "A customer has asked for SOC 2 or a security questionnaire",
      "You don’t know who has access to what",
      "You have no tested backup or incident plan",
    ],
    outcomes: [
      { k: "from $1,500", v: "for cloud and security projects" },
      { k: "SOC 2", v: "readiness, policies and evidence" },
      { k: "AWS · Azure · GCP", v: "remote infrastructure" },
    ],
    faqs: [
      { q: "Can you make us SOC 2 compliant?", a: "We prepare you for the audit — controls, policies, access reviews, logging, backups and evidence collection. The SOC 2 report itself is issued by an independent CPA firm, which we can coordinate with." },
      { q: "Which cloud providers do you work with?", a: "AWS, Microsoft Azure and Google Cloud, as well as Microsoft 365 and Google Workspace administration." },
      { q: "Can you manage our IT remotely?", a: "Yes. We can build and run remote IT infrastructure — user accounts, devices, access, backups and monitoring — for teams in the US and India." },
    ],
  },
};

export const serviceUrl = (id: ServiceId) => `/services/${SERVICE_DETAILS[id].slug}`;
export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

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
  {
    id: "vyomira",
    name: "Vyomira",
    kicker: "Vedic astrology",
    summary:
      "Vedic birth charts computed from real astronomy, Vimshottari dasha timelines, and AURA — an AI companion that explains your chart in plain language and shows the placements behind every answer.",
    points: ["Free Kundli", "Real ephemeris", "AURA AI guide"],
    href: LINKS.vyomira,
    cta: "Explore Vyomira",
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
    a: "Cloudisoft builds websites, workflow automations, CRM systems, AI voice agents and secure cloud infrastructure for growing businesses in the US and India. We also run three products: CloudiVoice (AI voice agents), ApplyFlux (assisted job applications) and Vyomira (Vedic astrology with an AI guide).",
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
export const PAGES: Record<string, { title: string; description: string; og?: string }> = {
  "/": {
    title: "Cloudisoft — Websites, Automations, CRM & AI Voice Agents",
    description:
      "Websites from $200, automations and CRM from $750, AI voice agents from $1,000 and secure cloud for businesses in the US and India. Get a quote on WhatsApp.",
  },
  "/about": {
    title: "About Cloudisoft — Software & AI Studio in New Jersey and Ahmedabad",
    description:
      "Cloudisoft is a software and AI studio with teams in Hillside, New Jersey and Ahmedabad, India, building practical websites, automations and AI voice agents.",
  },
  "/services": {
    title: "Services & Pricing: Websites, Automation, CRM, AI Voice | Cloudisoft",
    description:
      "Websites from $200, automations from $750, AI voice agents from $1,000, cloud infrastructure, security and SOC 2 readiness from $1,500. See what's included.",
  },
  "/privacy": {
    title: "Privacy Policy | Cloudisoft",
    description: "How Cloudisoft LLC collects, uses, shares and protects personal information from our website, enquiries and client projects — and your rights.",
  },
  "/terms": {
    title: "Terms & Conditions | Cloudisoft",
    description: "The terms that govern use of the Cloudisoft website and our services — quotes, payment, ownership, confidentiality, liability and governing law.",
  },
};


Object.assign(PAGES, {
  "/pricing": {
    title: "Pricing — Websites from $200, AI Voice Agents from $1,000 | Cloudisoft",
    description:
      "Websites from $200, automations & CRM from $750, AI voice agents from $1,000, cloud security & SOC 2 readiness from $1,500. Fixed written quotes.",
  },
  "/contact": {
    title: "Contact Cloudisoft — WhatsApp, Call, Text or Email",
    description:
      "Contact Cloudisoft: WhatsApp +91 88668 19132, call or text +1 (484) 990-7692, or email connect@cloudisoft.com. Offices in Ahmedabad, India and Hillside, New Jersey.",
  },
  "/insights": {
    title: "Insights: Websites, Automation, AI Voice & Security | Cloudisoft",
    description:
      "Practical guides from Cloudisoft: website costs, AI voice agents, AI vs human receptionists, SOC 2 readiness, what to automate first and choosing a CRM.",
  },
});
for (const a of ARTICLES) PAGES[`/insights/${a.slug}`] = { title: a.metaTitle, description: a.description };
for (const l of LOCATIONS) PAGES[`/locations/${l.slug}`] = { title: l.title, description: l.description };

for (const s of SERVICES) {
  const d = SERVICE_DETAILS[s.id];
  PAGES[`/services/${d.slug}`] = { title: d.title, description: d.metaDescription, og: `/og/${d.slug}.jpg` };
}

export const PRICING_FAQS = [
  { q: "Are these final prices?", a: "No. They are starting prices. Your final price depends on scope, integrations and volume, and we confirm it in a fixed written quote before work begins." },
  { q: "Are prices in US dollars?", a: "Yes, prices are listed in USD. Tell us where your business is based when you ask for a quote." },
  { q: "Are there ongoing costs?", a: "Some services have running costs that we list separately in your quote — for example hosting and domains for websites, call minutes for AI voice agents, and software licences you choose to use." },
  { q: "Do you offer support after launch?", a: "Yes. Every project includes launch support, and ongoing support and improvements can be added." },
];

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
