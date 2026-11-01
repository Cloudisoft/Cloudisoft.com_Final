import type { ServiceId } from "../lib/site";

/**
 * Insights articles. Written to answer real buyer questions directly:
 * each one leads with a short answer (what answer engines quote), then detail.
 * Keep facts verifiable — no invented statistics.
 */

export type Block =
  | { p: string }
  | { list: string[]; ordered?: boolean }
  | { table: { head: string[]; rows: string[][] } }
  | { callout: string };

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  service: ServiceId;
  published: string; // ISO date
  updated: string;
  readMins: number;
  answer: string;
  sections: { h: string; blocks: Block[] }[];
  faqs: { q: string; a: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "how-much-does-a-business-website-cost",
    title: "How much does a business website cost in 2026?",
    metaTitle: "How Much Does a Business Website Cost in 2026? | Cloudisoft",
    description:
      "What a business website really costs in 2026 — what drives the price, the ongoing costs people forget, and how to get an accurate quote. Landing pages from $200.",
    category: "Websites",
    service: "web",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMins: 7,
    answer:
      "A simple landing page or small business website can start from around $200 with Cloudisoft. The price rises with the number of pages, custom design, features such as online booking, payments or an online store, content writing and integrations. Budget separately for the domain, hosting, email and ongoing updates.",
    sections: [
      {
        h: "What you are actually paying for",
        blocks: [
          {
            p: "A website quote is the sum of a few decisions. Two sites that look similar can be priced very differently because one needs a booking system, a payment flow or a connection to your CRM, and the other does not. Knowing the drivers lets you compare quotes fairly and spend where it matters.",
          },
          {
            list: [
              "Number of pages and templates — a one-page landing page is far less work than a 20-page site with several page layouts.",
              "Design — adapting a proven layout costs less than a fully custom design built from scratch.",
              "Features — contact forms are simple; booking, payments, member logins, multi-language content and online stores add real work.",
              "Content — writing copy, sourcing photos and producing graphics is often underestimated.",
              "Integrations — connecting your CRM, WhatsApp, email marketing or accounting tools.",
              "SEO and analytics — page titles, structured data, speed work, Google Search Console and analytics set-up.",
            ],
          },
        ],
      },
      {
        h: "Typical project sizes",
        blocks: [
          {
            table: {
              head: ["Project", "What it usually includes", "Cloudisoft starting price"],
              rows: [
                ["Landing page", "One page built to convert visitors from ads or social media, with a lead form or WhatsApp button", "From $200"],
                ["Small business website", "Home, about, services, contact; mobile-first design; basic SEO and analytics", "Quoted on scope, from $200"],
                ["Website with booking or payments", "Everything above plus appointment booking, payment collection or a client portal", "Fixed quote after a short call"],
                ["Online store or web app", "Product catalogue, checkout, accounts, admin tools, integrations", "Fixed quote after a short call"],
              ],
            },
          },
          {
            p: "Every Cloudisoft quote is fixed before work starts, so the number you approve is the number you pay unless you add scope.",
          },
        ],
      },
      {
        h: "Ongoing costs people forget",
        blocks: [
          {
            list: [
              "Domain name — renewed every year.",
              "Hosting — from free tiers for simple sites to monthly plans for busy or dynamic sites.",
              "Business email — usually billed per mailbox.",
              "Paid plugins, themes or software licences, if your platform uses them.",
              "Updates and support — security patches, content changes and small improvements.",
            ],
          },
          {
            p: "Ask every agency to list these separately. A low build price can hide high monthly fees, and a site you can’t update yourself costs money every time something changes.",
          },
        ],
      },
      {
        h: "How to get an accurate quote",
        blocks: [
          {
            list: [
              "Write down the goal of the site — calls, bookings, sales or credibility.",
              "List the pages you need and any features (booking, payments, logins, languages).",
              "Share two or three websites you like and what you like about them.",
              "Say who will write the content, and whether you have a logo and photos.",
              "Confirm that you will own the domain, code and content at the end.",
            ],
            ordered: true,
          },
          {
            callout:
              "Want a number for your project? Send the list above on WhatsApp to +91 88668 19132 or email connect@cloudisoft.com and we’ll reply with a fixed quote.",
          },
        ],
      },
      {
        h: "Red flags when comparing quotes",
        blocks: [
          {
            list: [
              "No written scope — you can’t tell what is and isn’t included.",
              "The agency registers the domain in its own name.",
              "No mention of mobile design, page speed or basic SEO.",
              "You can’t edit content without paying for every change.",
              "No plan for backups and security updates.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the cheapest way to get a professional business website?",
        a: "Start with a focused landing page or a small site with a few pages, built on a proven layout. Cloudisoft builds these from $200, and you can add pages and features later.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A landing page can be live in days. A small business website usually takes one to three weeks depending on content and feedback. Stores and web apps take longer and are scheduled in the quote.",
      },
      {
        q: "Do I own my website after it is built?",
        a: "You should. With Cloudisoft the domain, code and content are yours once the project is paid.",
      },
    ],
  },
  {
    slug: "what-is-an-ai-voice-agent",
    title: "What is an AI voice agent and how does it work?",
    metaTitle: "What Is an AI Voice Agent? How It Works & Business Uses | Cloudisoft",
    description:
      "An AI voice agent answers and makes phone calls in natural speech, books appointments and updates your CRM. Here's how it works, what it can do and its limits.",
    category: "AI voice",
    service: "voice",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMins: 8,
    answer:
      "An AI voice agent is software that holds real phone conversations. It listens to the caller, understands the request using a language model trained on your business information, takes actions such as booking an appointment or updating your CRM, and replies in a natural voice. It hands the call to a person when it can’t help.",
    sections: [
      {
        h: "How an AI voice agent works",
        blocks: [
          {
            p: "Behind each call there are a few components working together in real time:",
          },
          {
            list: [
              "Telephony — connects the agent to a phone number so it can answer inbound calls or place outbound ones.",
              "Speech recognition — turns what the caller says into text, as they speak.",
              "A language model with your instructions — decides what to say next, using your scripts, policies, prices and FAQs.",
              "Tools — let the agent act: check calendar availability, book or reschedule, look up an order, create a lead in the CRM, send a WhatsApp or SMS confirmation.",
              "Text-to-speech — speaks the reply in a natural voice and the caller’s language.",
              "Handoff — transfers the call to a person with the context when the caller asks for a human or the request is outside what the agent should handle.",
            ],
            ordered: true,
          },
          {
            p: "Every call can be recorded and transcribed, so you can review what was said, see the outcome and improve the instructions over time.",
          },
        ],
      },
      {
        h: "What businesses use voice agents for",
        blocks: [
          {
            list: [
              "Front desk and receptionist calls — answering questions, booking and rescheduling appointments.",
              "Lead qualification — asking your questions in your order and passing hot leads to sales.",
              "Outbound follow-up — calling new enquiries quickly, confirming appointments, renewal reminders.",
              "Customer support — order status, policies and common issues, answered from your own documents.",
              "Recruitment screening — checking experience, notice period and availability, then scheduling interviews.",
              "After-hours cover — so calls at night, on weekends or during busy periods are never missed.",
            ],
          },
          {
            p: "You can hear real sample calls — a clinic receptionist, a property sales call and a recruitment screen — on the Cloudisoft home page.",
          },
        ],
      },
      {
        h: "Languages",
        blocks: [
          {
            p: "Cloudisoft voice agents, built on our CloudiVoice platform, speak English, Hindi, Gujarati, Marathi, Punjabi, Bengali, Tamil, Telugu, Kannada, Malayalam and Odia — including the natural mix of Hindi and English many callers use in India.",
          },
        ],
      },
      {
        h: "What AI voice agents are not good at (yet)",
        blocks: [
          {
            list: [
              "Situations that need judgement, negotiation or empathy beyond a script — these should go to a person.",
              "Very noisy lines or callers who don’t want to speak to an automated agent.",
              "Anything you haven’t given it information or permission for — it should say so and hand off rather than guess.",
            ],
          },
          {
            p: "Good set-ups make the handoff easy and fast. The goal is to take the repetitive calls off your team, not to stop customers reaching a person.",
          },
        ],
      },
      {
        h: "Rules to follow",
        blocks: [
          {
            p: "Phone calls are regulated. Before outbound calling, check the rules that apply to you — for example consent and do-not-call rules under the TCPA in the United States, and TRAI’s commercial communication rules in India. Tell callers when calls are recorded where the law requires it, and keep recordings only as long as you need them.",
          },
        ],
      },
      {
        h: "What you need to get started",
        blocks: [
          {
            list: [
              "The calls you want to automate and what a good outcome looks like.",
              "Your FAQs, prices, policies and booking rules.",
              "Access to the calendar or CRM the agent should use.",
              "A phone number (new or existing) and calling hours.",
              "Who the agent should transfer to, and when.",
            ],
            ordered: true,
          },
          {
            callout: "Cloudisoft AI voice agents start from $1,000. We build a pilot on your real information and test it with your team before it speaks to a customer.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Do AI voice agents sound robotic?",
        a: "Modern voice agents sound natural, handle interruptions and confirm details back to the caller. Listen to the sample calls on the Cloudisoft home page to judge for yourself.",
      },
      {
        q: "Can an AI voice agent use my existing phone number?",
        a: "Usually yes — calls can be forwarded to the agent, for example after hours or when lines are busy. A new number can also be set up for campaigns.",
      },
      {
        q: "How much does an AI voice agent cost?",
        a: "Cloudisoft voice agents start from $1,000 for a production agent, plus usage that depends on call minutes. You get a fixed quote for the set-up before work starts.",
      },
    ],
  },
  {
    slug: "ai-receptionist-vs-human-receptionist",
    title: "AI receptionist vs human receptionist: which is right for your business?",
    metaTitle: "AI Receptionist vs Human Receptionist: Cost & Comparison | Cloudisoft",
    description:
      "A practical comparison of AI and human receptionists — availability, cost model, languages, quality and when to combine both. Includes a decision checklist.",
    category: "AI voice",
    service: "voice",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMins: 6,
    answer:
      "Most businesses get the best result from both: an AI receptionist answers every call instantly, around the clock, and handles routine requests like bookings and FAQs, while people handle complex, sensitive or high-value conversations. Choose AI-first if you miss calls or repeat the same answers all day; keep people at the centre if most calls need judgement.",
    sections: [
      {
        h: "Side-by-side comparison",
        blocks: [
          {
            table: {
              head: ["", "AI receptionist", "Human receptionist"],
              rows: [
                ["Availability", "24/7, including holidays", "Working hours and shifts"],
                ["Simultaneous calls", "Many at once", "One at a time"],
                ["Cost model", "Set-up plus usage per minute", "Salary, benefits, training, cover"],
                ["Languages", "Several, switching mid-call", "Depends on the person"],
                ["Consistency", "Same answer every time, from your information", "Varies with experience and workload"],
                ["Judgement and empathy", "Limited — should hand off", "Strong"],
                ["Record keeping", "Every call transcribed and logged automatically", "Manual notes"],
              ],
            },
          },
        ],
      },
      {
        h: "When an AI receptionist makes sense",
        blocks: [
          {
            list: [
              "You miss calls during busy hours, after hours or on weekends.",
              "A large share of calls are the same few requests — timings, prices, bookings, directions.",
              "Callers speak several languages.",
              "You want every call logged in your CRM without anyone typing it up.",
            ],
          },
        ],
      },
      {
        h: "When you need people",
        blocks: [
          {
            list: [
              "Calls often involve complaints, negotiation or sensitive personal situations.",
              "Each call is high value and benefits from relationship-building.",
              "Requests vary so much that clear rules are hard to write down.",
            ],
          },
        ],
      },
      {
        h: "The hybrid set-up most businesses choose",
        blocks: [
          {
            p: "The AI agent answers first, resolves routine requests and books appointments directly into your calendar. When a caller asks for a person — or the request is outside the agent’s rules — it transfers the call with a summary, so your team doesn’t start from zero. Your receptionist spends their day on the conversations that need them.",
          },
          {
            callout: "Hear an AI receptionist handle a real-sounding booking call on the Cloudisoft home page. Set-ups start from $1,000.",
          },
        ],
      },
      {
        h: "Decision checklist",
        blocks: [
          {
            list: [
              "How many calls do you miss each week?",
              "What share of calls are routine?",
              "Which languages do your callers use?",
              "Which calendar or CRM should bookings go into?",
              "Who should take transferred calls, and during which hours?",
            ],
            ordered: true,
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Will customers be annoyed by an AI receptionist?",
        a: "Callers mostly care about getting a quick, correct answer. A natural-sounding agent that resolves the request — and transfers quickly when asked — is usually better than waiting on hold or reaching voicemail.",
      },
      {
        q: "Can an AI receptionist replace my front desk completely?",
        a: "For simple, high-volume call types it can handle most calls. For most businesses we recommend a hybrid, with people handling complex and sensitive calls.",
      },
    ],
  },
  {
    slug: "soc-2-readiness-checklist",
    title: "SOC 2 readiness checklist for startups and small businesses",
    metaTitle: "SOC 2 Readiness Checklist for Startups & SMBs (2026) | Cloudisoft",
    description:
      "A practical SOC 2 readiness checklist: Type I vs Type II, the Trust Services Criteria, the controls auditors look for, and the evidence to collect before your audit.",
    category: "Security",
    service: "cloud",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMins: 9,
    answer:
      "To get ready for SOC 2, define the scope, choose your Trust Services Criteria (Security is always required), put core controls in place — access control with MFA, onboarding and offboarding, logging and monitoring, change management, backups, incident response, vendor management and security training — write the matching policies, and collect evidence that the controls operate. An independent CPA firm then performs the audit.",
    sections: [
      {
        h: "SOC 2 in one paragraph",
        blocks: [
          {
            p: "SOC 2 is an attestation report, defined by the AICPA, that shows customers how a service organisation protects their data. It is not a certificate you buy: an independent CPA firm tests your controls against the Trust Services Criteria and issues a report. Larger customers often ask for it before they sign.",
          },
        ],
      },
      {
        h: "Type I vs Type II",
        blocks: [
          {
            table: {
              head: ["", "Type I", "Type II"],
              rows: [
                ["What it tests", "Whether controls are designed properly at a point in time", "Whether controls operated effectively over a period"],
                ["Observation period", "None — a single date", "Typically several months to a year"],
                ["Typical use", "A first report to unblock deals quickly", "The report most enterprise customers ask for"],
              ],
            },
          },
        ],
      },
      {
        h: "Choose your Trust Services Criteria",
        blocks: [
          {
            list: [
              "Security (common criteria) — required in every SOC 2.",
              "Availability — if customers rely on your uptime.",
              "Confidentiality — if you handle confidential business data.",
              "Processing integrity — if accuracy of processing is part of your promise.",
              "Privacy — if you handle personal information as a core part of the service.",
            ],
          },
          { p: "Most first audits cover Security only, or Security plus Availability and Confidentiality." },
        ],
      },
      {
        h: "The readiness checklist",
        blocks: [
          {
            list: [
              "Scope — the systems, data, people and vendors in the audit.",
              "Risk assessment — documented risks and how each is handled.",
              "Policies — information security, access control, change management, incident response, vendor management, data retention, acceptable use.",
              "Identity and access — single sign-on where possible, MFA everywhere, least privilege, quarterly access reviews.",
              "Onboarding and offboarding — background checks where appropriate, policy acknowledgement, same-day access removal.",
              "Asset inventory — laptops, cloud accounts and SaaS tools, with disk encryption and endpoint protection.",
              "Change management — code review, approvals and separation between development and production.",
              "Logging and monitoring — centralised logs, alerts on suspicious activity, log retention.",
              "Backups and recovery — automated, encrypted backups and a tested restore.",
              "Incident response — a written plan, roles, and at least one tabletop exercise.",
              "Vendor management — a list of critical vendors and their security reports.",
              "Security awareness training — for everyone, at hiring and yearly.",
              "Encryption — data encrypted in transit and at rest.",
            ],
            ordered: true,
          },
        ],
      },
      {
        h: "Evidence auditors will ask for",
        blocks: [
          {
            list: [
              "Screenshots or exports showing MFA enforcement and access reviews.",
              "Tickets showing onboarding, offboarding and approved changes.",
              "Backup logs and a record of a successful restore test.",
              "Signed policy acknowledgements and training completion records.",
              "Incident and alert records, and how they were resolved.",
            ],
          },
          {
            callout:
              "Cloudisoft prepares companies for SOC 2: we build the cloud controls, write the policies and set up evidence collection, then coordinate with your chosen audit firm. Cloud, security and compliance projects start from $1,500.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How long does SOC 2 readiness take?",
        a: "It depends on how mature your controls already are. Many small companies need a few weeks to a few months of preparation before a Type I audit, and then an observation period before a Type II report.",
      },
      {
        q: "Can a consultant issue a SOC 2 report?",
        a: "No. Only an independent CPA firm can perform the audit and issue the report. Consultants like Cloudisoft help you get ready and support you during the audit.",
      },
      {
        q: "Do I need SOC 2 or ISO 27001?",
        a: "US customers usually ask for SOC 2; ISO 27001 is more common internationally. Many controls overlap, so preparing for one helps with the other.",
      },
    ],
  },
  {
    slug: "business-processes-to-automate-first",
    title: "10 business processes to automate first (and how to choose)",
    metaTitle: "10 Business Processes to Automate First — Practical Guide | Cloudisoft",
    description:
      "The workflows small businesses should automate first — lead routing, follow-ups, invoices, document data entry and more — and how to prioritise them.",
    category: "Automation",
    service: "automation",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMins: 7,
    answer:
      "Automate the processes that happen often, follow clear rules and cost you when they go wrong. For most businesses that means lead capture and routing, instant follow-ups, appointment reminders, invoice and payment reminders, data entry from documents, customer onboarding, support triage, order and inventory sync, reporting, and employee onboarding.",
    sections: [
      {
        h: "How to choose what to automate",
        blocks: [
          {
            p: "Score each candidate process on three things: how often it happens, how long it takes each time, and what a mistake costs. Start with the highest score that also has clear rules. One reliable automation that saves an hour a day beats five half-finished ones.",
          },
        ],
      },
      {
        h: "The 10 processes",
        blocks: [
          {
            list: [
              "Lead capture and routing — every form, ad lead and WhatsApp enquiry lands in your CRM and is assigned automatically.",
              "Instant follow-up — new leads get a reply within minutes by WhatsApp, SMS or email, even at night.",
              "Appointment reminders — confirmations and reminders cut no-shows; rescheduling links reduce calls.",
              "Invoices and payment reminders — invoices generated from orders, polite reminders sent on schedule.",
              "Data entry from documents — AI reads invoices, purchase orders, forms and resumes and fills your systems.",
              "Customer onboarding — welcome messages, document collection and account set-up triggered by a signed deal.",
              "Support triage — incoming emails and messages tagged, prioritised and routed, with suggested replies.",
              "Order and inventory sync — stock and orders kept consistent across your store, marketplace and accounting.",
              "Reporting — the weekly numbers you check by hand, compiled and sent automatically.",
              "Employee onboarding and offboarding — accounts created and removed on time, which also matters for security.",
            ],
            ordered: true,
          },
        ],
      },
      {
        h: "What a good automation looks like",
        blocks: [
          {
            list: [
              "It has an owner and a clear definition of done.",
              "It alerts a person when something fails, instead of silently dropping data.",
              "It logs what it did, so you can audit it.",
              "It hands edge cases to a human.",
            ],
          },
          {
            callout: "Cloudisoft builds automations across Google Workspace, Microsoft 365, WhatsApp Business, HubSpot, Zoho, Salesforce, Shopify, Stripe and Slack. Automations start from $750.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to change my software to automate?",
        a: "Usually not. Most tools you already use can be connected through their APIs or webhooks.",
      },
      {
        q: "What does AI add to automation?",
        a: "AI handles the unstructured parts: reading documents and emails, classifying requests and drafting replies, so more of a process can run without a person typing.",
      },
    ],
  },
  {
    slug: "hubspot-vs-zoho-vs-salesforce",
    title: "HubSpot vs Zoho CRM vs Salesforce: which CRM fits a small business?",
    metaTitle: "HubSpot vs Zoho vs Salesforce for Small Business (2026) | Cloudisoft",
    description:
      "An honest comparison of HubSpot, Zoho CRM and Salesforce for small and growing businesses — ease of use, cost approach, customisation and who each one suits.",
    category: "CRM",
    service: "crm",
    published: "2026-11-01",
    updated: "2026-11-01",
    readMins: 7,
    answer:
      "HubSpot suits teams that want the easiest set-up and strong marketing tools; Zoho CRM suits cost-conscious businesses that want a broad suite of apps; Salesforce suits companies that need deep customisation and expect to scale to complex sales processes. The right choice depends on team size, budget, the tools you already use and who will maintain the system.",
    sections: [
      {
        h: "Quick comparison",
        blocks: [
          {
            table: {
              head: ["", "HubSpot", "Zoho CRM", "Salesforce"],
              rows: [
                ["Best for", "Ease of use, inbound marketing", "Value, breadth of apps", "Customisation and scale"],
                ["Learning curve", "Gentle", "Moderate", "Steeper — often needs an admin"],
                ["Entry point", "Free CRM tier available", "Free edition for very small teams", "Paid plans"],
                ["Ecosystem", "Marketing, sales, service hubs", "Large suite (Books, Desk, Campaigns…)", "Very large app marketplace"],
                ["Watch out for", "Costs rise with seats and hubs", "Many settings to configure well", "Implementation effort"],
              ],
            },
          },
          { p: "Pricing changes often; always check each vendor’s current plans before deciding." },
        ],
      },
      {
        h: "Choose HubSpot if…",
        blocks: [
          {
            list: [
              "You want your team using the CRM within days, not weeks.",
              "Marketing — forms, email, landing pages — is central to how you win customers.",
              "You don’t have a dedicated CRM administrator.",
            ],
          },
        ],
      },
      {
        h: "Choose Zoho CRM if…",
        blocks: [
          {
            list: [
              "Budget matters and you want a lot of functionality per seat.",
              "You already use, or want, other Zoho apps such as Books or Desk.",
              "You are comfortable spending time on configuration up front.",
            ],
          },
        ],
      },
      {
        h: "Choose Salesforce if…",
        blocks: [
          {
            list: [
              "Your sales process is complex — multiple products, territories, approvals.",
              "You expect to grow into a large sales team.",
              "You have, or will hire, someone to administer it.",
            ],
          },
        ],
      },
      {
        h: "Whichever you choose",
        blocks: [
          {
            list: [
              "Design the pipeline stages before importing data.",
              "Clean and de-duplicate contacts during import.",
              "Connect lead sources — website forms, WhatsApp, calls — so nothing is typed by hand.",
              "Automate follow-ups and assignment rules from day one.",
              "Build one dashboard the team actually checks every week.",
            ],
            ordered: true,
          },
          {
            callout: "Cloudisoft sets up, cleans up and integrates HubSpot, Zoho CRM and Salesforce. CRM work is quoted together with automations, which start from $750.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is a spreadsheet enough instead of a CRM?",
        a: "For a handful of leads, yes. Once several people follow up with leads, or leads come from several channels, a CRM prevents missed follow-ups and duplicate work.",
      },
      {
        q: "Can you move us from one CRM to another?",
        a: "Yes. We map the fields, migrate and clean the data, rebuild automations and train the team.",
      },
    ],
  },
];

export const articleUrl = (slug: string) => `/insights/${slug}`;
export const articlesFor = (service: ServiceId) => ARTICLES.filter((a) => a.service === service);
