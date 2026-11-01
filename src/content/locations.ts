export type Location = {
  slug: string;
  officeId: "ahmedabad" | "hillside";
  city: string;
  region: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  points: string[];
  faqs: { q: string; a: string }[];
};

export const LOCATIONS: Location[] = [
  {
    slug: "ahmedabad",
    officeId: "ahmedabad",
    city: "Ahmedabad",
    region: "Gujarat, India",
    title: "Website Development & AI Voice Agents in Ahmedabad | Cloudisoft",
    description:
      "Cloudisoft in Makarba, Ahmedabad builds websites, business automations, CRMs and AI voice agents that speak Gujarati, Hindi and English. Talk to us on WhatsApp.",
    headline: "Websites, automation and AI voice agents — built in Ahmedabad.",
    intro:
      "Our Ahmedabad team works from Siddhivinayak Towers in Makarba, building websites, workflow automations, CRM systems, AI voice agents and secure cloud infrastructure for businesses across Gujarat and India.",
    points: [
      "Meet us in person at Siddhivinayak Towers, Makarba",
      "Voice agents that speak Gujarati, Hindi and English — and switch naturally between them",
      "WhatsApp-first: enquiries, quotes and updates on WhatsApp",
      "Integrations with tools Indian businesses use, including WhatsApp Business and Zoho",
    ],
    faqs: [
      {
        q: "Do you work with businesses outside Ahmedabad?",
        a: "Yes. We work with businesses across Gujarat and India, mostly over WhatsApp and video calls, and you are welcome to visit our Makarba office.",
      },
      {
        q: "Can your AI voice agents speak Gujarati?",
        a: "Yes. Our voice agents speak Gujarati, Hindi, Indian English and eight more Indian languages, including the natural mix of Hindi and English many callers use.",
      },
      {
        q: "How do I get a quote in Ahmedabad?",
        a: "Message us on WhatsApp at +91 88668 19132 with what you need. We reply with questions and a fixed quote.",
      },
    ],
  },
  {
    slug: "new-jersey",
    officeId: "hillside",
    city: "New Jersey",
    region: "Hillside, NJ, USA",
    title: "Websites, AI Voice Agents & SOC 2 in New Jersey | Cloudisoft",
    description:
      "Cloudisoft in Hillside, NJ builds websites, AI phone agents, automations and CRMs, and prepares companies for SOC 2. Call or text +1 (484) 990-7692.",
    headline: "Websites, AI phone agents and compliance — from New Jersey.",
    intro:
      "Our US office at 473 Mundet Place in Hillside, New Jersey serves businesses across the United States — building websites, AI voice agents, automations and CRMs, and preparing teams for SOC 2 audits.",
    points: [
      "US team in Hillside, NJ — call or text +1 (484) 990-7692",
      "AI receptionists that answer every call, book appointments and transfer to your team",
      "Cloud infrastructure, security hardening and SOC 2 readiness",
      "One team across US and India time zones, so work keeps moving",
    ],
    faqs: [
      {
        q: "Do you only work with New Jersey businesses?",
        a: "No. Our Hillside office serves clients across the United States, working remotely and on video calls.",
      },
      {
        q: "Can you help us prepare for a SOC 2 audit?",
        a: "Yes. We put the controls in place, write the policies and set up evidence collection, then coordinate with your independent CPA audit firm.",
      },
      {
        q: "How do I reach the US team?",
        a: "Call or text +1 (484) 990-7692, or email connect@cloudisoft.com.",
      },
    ],
  },
];
