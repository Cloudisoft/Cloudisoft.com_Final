// Single source of truth for links, products, contact details and FAQs.
// Used by the page *and* by the structured data in index.html, so keep them in sync.

export const SITE_URL = "https://www.cloudisoft.com";

export const LINKS = {
  cloudivoice: "https://cloudivoice.cloudisoft.com/",
  applyflux: "https://applyflux.cloudisoft.com/",
  cloudicore: "https://cloudicore.cloudisoft.com/",
  cloudicoreTrial: "https://cloudicore.cloudisoft.com/?source=cloudisoft&trial=true",
  rapidbuild: "https://rapidbuild.cloudisoft.com/",
};

export const NAV = [
  { label: "What we build", href: "#build" },
  { label: "CloudiVoice", href: LINKS.cloudivoice, external: true },
  { label: "ApplyFlux", href: LINKS.applyflux, external: true },
  { label: "CloudiCore", href: LINKS.cloudicore, external: true },
  { label: "RapidBuild", href: LINKS.rapidbuild, external: true },
  { label: "FAQ", href: "#faq" },
];

export const CONTACT = {
  email: "connect@cloudisoft.com",
  phones: [
    { label: "US", display: "+1 (973) 841-4949", tel: "+19738414949" },
    { label: "US", display: "+1 (484) 990-7692", tel: "+14849907692" },
    { label: "India", display: "+91 88668 19132", tel: "+918866819132" },
  ],
  offices: [
    { city: "Hillside, New Jersey", lines: ["473 Mundet Place", "Hillside, NJ 07205, USA"] },
    {
      city: "Ahmedabad, Gujarat",
      lines: ["C-1219, Siddhivinayak Towers", "Makarba, Ahmedabad 380051, India"],
    },
  ],
};

export type Product = {
  id: string;
  name: string;
  kicker: string;
  summary: string;
  points: string[];
  href: string;
  cta: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "cloudivoice",
    name: "CloudiVoice",
    kicker: "Voice agents",
    summary:
      "Phone agents that answer every call, qualify leads, book appointments and follow up — in Hindi, English and nine more Indian languages.",
    points: ["Inbound & outbound", "Human handoff", "Transcripts & QA"],
    href: LINKS.cloudivoice,
    cta: "Hear CloudiVoice",
  },
  {
    id: "applyflux",
    name: "ApplyFlux",
    kicker: "Job applications",
    summary:
      "Upload a resume once. ApplyFlux finds matching roles, fills applications carefully, tracks each one — and pauses whenever a person should decide.",
    points: ["One profile", "Matched roles", "Human-in-the-loop"],
    href: LINKS.applyflux,
    cta: "Open ApplyFlux",
  },
  {
    id: "cloudicore",
    name: "CloudiCore",
    kicker: "Decision simulator",
    summary:
      "Model a price change, a hire or an expansion and compare optimistic, expected and cautious outcomes before you commit budget.",
    points: ["What-if scenarios", "Risk index", "7-day free trial"],
    href: LINKS.cloudicore,
    cta: "Try CloudiCore",
  },
  {
    id: "rapidbuild",
    name: "RapidBuild",
    kicker: "Websites",
    summary:
      "Websites and landing pages with a real frontend and backend, plugged into what you already run — delivered fast, without agency overhead.",
    points: ["Mobile-first", "Plug & play", "Fair pricing"],
    href: LINKS.rapidbuild,
    cta: "Start a build",
  },
];

export const FAQS = [
  {
    q: "What does Cloudisoft do?",
    a: "Cloudisoft builds AI software that takes on repetitive business work. We make custom AI agents for calls, chat, email and back-office tasks, and we run four products: CloudiVoice (AI voice agents), ApplyFlux (assisted job applications), CloudiCore (a business decision simulator) and RapidBuild (fast website builds).",
  },
  {
    q: "What is a custom AI agent?",
    a: "It is software trained on your business — your offers, policies, FAQs and data — that handles a defined job end to end: answering calls, qualifying leads, booking appointments, updating your CRM or Google Sheets, or following up. It works around the clock and hands the conversation to a person when it should.",
  },
  {
    q: "Can your voice agents speak Hindi and other Indian languages?",
    a: "Yes. CloudiVoice agents speak Hindi, Indian English, Gujarati, Marathi, Punjabi, Bengali, Tamil, Telugu, Kannada, Malayalam and Odia, including the natural mix of Hindi and English most callers use. You can play an English sample call at the top of this page.",
  },
  {
    q: "Which tools can an agent connect to?",
    a: "Agents connect to CRMs, calendars, Google Sheets, help desks and most systems that offer an API or webhook. If a tool has no API, we look at email or file-based handoffs before suggesting anything custom.",
  },
  {
    q: "How long does it take to go live?",
    a: "A focused pilot — one agent doing one job on your real data — usually takes days to a couple of weeks, depending on integrations. We test it with your team before it talks to a single customer.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing is custom and based on call or task volume and how much integration work is involved. CloudiCore has a 7-day free trial with no credit card required. Send us your use case and we will reply with a scoped quote.",
  },
  {
    q: "Where is Cloudisoft based?",
    a: "We have offices in Hillside, New Jersey (USA) and Ahmedabad, Gujarat (India), and work with businesses in both countries.",
  },
];
