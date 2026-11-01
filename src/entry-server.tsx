import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";
import { CONTACT, FAQS, LINKS, PRODUCTS, SITE_URL } from "./lib/site";

export function render(url = "/") {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}

/** Structured data for search engines and answer engines. */
export function structuredData() {
  const org = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "Cloudisoft",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    image: `${SITE_URL}/og-image.jpg`,
    slogan: "Automate Intelligence. Amplify Growth.",
    description:
      "Cloudisoft builds custom AI agents, AI voice agents, workflow automation and business decision tools for growing businesses in the US and India.",
    email: CONTACT.email,
    contactPoint: CONTACT.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      contactType: "sales",
      areaServed: p.label === "India" ? "IN" : "US",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    })),
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "473 Mundet Place",
        addressLocality: "Hillside",
        addressRegion: "NJ",
        postalCode: "07205",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "C-1219, Siddhivinayak Towers, Makarba",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380051",
        addressCountry: "IN",
      },
    ],
    makesOffer: PRODUCTS.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "SoftwareApplication", name: p.name, url: p.href, applicationCategory: "BusinessApplication", description: p.summary },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      org,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Cloudisoft",
        publisher: { "@id": `${SITE_URL}/#org` },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "Cloudisoft — Custom AI Agents, Voice AI & Business Automation",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#org` },
        primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
