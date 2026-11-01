import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";
import { CONTACT, FAQS, PAGES, PRICING, PRODUCTS, SERVICES, SITE_URL, SOCIAL } from "./lib/site";
export { PRERENDERED } from "./App";
export { PAGES };

export function render(url = "/") {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}

/** Structured data for search engines and answer engines. */
export function structuredData(url = "/") {
  const org = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#org`,
    name: "Cloudisoft",
    legalName: "Cloudisoft LLC",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    image: `${SITE_URL}/og-image.jpg`,
    slogan: "Automate Intelligence. Amplify Growth.",
    description:
      "Cloudisoft builds websites, workflow automations, CRMs, AI voice agents and secure cloud infrastructure for businesses in the US and India.",
    email: CONTACT.email,
    telephone: CONTACT.phone.raw,
    sameAs: SOCIAL.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    contactPoint: [
      { "@type": "ContactPoint", telephone: CONTACT.phone.raw, contactType: "sales", areaServed: "US", availableLanguage: ["English"] },
      { "@type": "ContactPoint", telephone: "+918866819132", contactType: "customer support", areaServed: "IN", availableLanguage: ["English", "Hindi", "Gujarati"], contactOption: "WhatsApp" },
    ],
    address: CONTACT.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.locality,
      addressRegion: o.region,
      postalCode: o.postalCode,
      addressCountry: o.country,
    })),
    makesOffer: [
      ...PRICING.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.blurb,
        priceSpecification: { "@type": "PriceSpecification", minPrice: p.from, priceCurrency: "USD" },
        itemOffered: { "@type": "Service", name: p.name },
      })),
      ...PRODUCTS.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "SoftwareApplication", name: p.name, url: p.href, applicationCategory: "BusinessApplication", description: p.summary },
      })),
    ],
  };

  const page = PAGES[url] || PAGES["/"];
  const graph: any[] = [
    org,
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Cloudisoft", publisher: { "@id": `${SITE_URL}/#org` }, inLanguage: "en" },
    {
      "@type": url === "/about" ? "AboutPage" : "WebPage",
      "@id": `${SITE_URL}${url === "/" ? "/" : url}#webpage`,
      url: `${SITE_URL}${url === "/" ? "/" : url}`,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#org` },
    },
  ];
  if (url === "/" || url === "/services") {
    graph.push({
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  if (url === "/services") {
    graph.push(
      ...SERVICES.map((s) => ({
        "@type": "Service",
        name: s.name,
        description: s.desc,
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: ["US", "IN"],
        ...(s.from ? { offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: s.from, priceCurrency: "USD" } } } : {}),
      }))
    );
  }
  if (url !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.title.split(/ [—|] /)[0], item: `${SITE_URL}${url}` },
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
