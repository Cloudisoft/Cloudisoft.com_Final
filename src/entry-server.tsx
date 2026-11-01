import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";
import { ARTICLES } from "./content/articles";
import { LOCATIONS } from "./content/locations";
import { CONTACT, FAQS, PAGES, PRICING_FAQS, PRICING, PRODUCTS, SERVICES, SERVICE_DETAILS, SITE_URL, SOCIAL } from "./lib/site";
export { PRERENDERED } from "./App";
export { PAGES };
export { ARTICLES } from "./content/articles";
export { LOCATIONS } from "./content/locations";
export { SERVICES, SERVICE_DETAILS, FAQS, PRICING, CONTACT, PRODUCTS, PRICING_FAQS } from "./lib/site";

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
    logo: `${SITE_URL}/brand/logo-512.png`,
    image: `${SITE_URL}/og/home.jpg`,
    slogan: "Automate Intelligence. Amplify Growth.",
    description:
      "Cloudisoft builds websites, workflow automations, CRMs, AI voice agents and secure cloud infrastructure for businesses in the US and India.",
    email: CONTACT.email,
    telephone: CONTACT.phone.raw,
    knowsAbout: [
      "Website development",
      "Landing pages",
      "Business process automation",
      "CRM implementation",
      "HubSpot",
      "Zoho CRM",
      "Salesforce",
      "AI voice agents",
      "AI receptionist",
      "Cloud infrastructure",
      "SOC 2 readiness",
    ],
    areaServed: [{ "@type": "Country", name: "United States" }, { "@type": "Country", name: "India" }],
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

  const locals = CONTACT.offices.map((o) => ({
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#office-${o.id}`,
    name: `Cloudisoft — ${o.city}`,
    parentOrganization: { "@id": `${SITE_URL}/#org` },
    url: `${SITE_URL}/locations/${o.id === "ahmedabad" ? "ahmedabad" : "new-jersey"}`,
    image: `${SITE_URL}/og/home.jpg`,
    logo: `${SITE_URL}/brand/logo-512.png`,
    email: CONTACT.email,
    telephone: o.country === "IN" ? "+918866819132" : CONTACT.phone.raw,
    priceRange: "$200 – $1,500+",
    address: { "@type": "PostalAddress", streetAddress: o.street, addressLocality: o.locality, addressRegion: o.region, postalCode: o.postalCode, addressCountry: o.country },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.query)}`,
    areaServed: o.country === "IN" ? "India" : "United States",
    sameAs: SOCIAL.filter((x) => x.href.startsWith("http")).map((x) => x.href),
  }));

  const page = PAGES[url] || PAGES["/"];
  const graph: any[] = [
    org,
    ...(url === "/" || url === "/about" ? locals : []),
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Cloudisoft", publisher: { "@id": `${SITE_URL}/#org` }, inLanguage: "en" },
    {
      "@type": url === "/about" ? "AboutPage" : url === "/contact" ? "ContactPage" : url === "/insights" ? "CollectionPage" : "WebPage",
      "@id": `${SITE_URL}${url === "/" ? "/" : url}#webpage`,
      url: `${SITE_URL}${url === "/" ? "/" : url}`,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#org` },
    },
  ];
  if (url === "/") {
    graph.push({
      "@type": "VideoObject",
      name: "Cloudisoft in 30 seconds — websites, automations, CRM, AI voice agents and cloud security",
      description:
        "A 28-second overview of Cloudisoft services: websites from $200, automations from $750, CRM setup, AI voice agents from $1,000, and cloud, security and SOC 2 readiness from $1,500.",
      thumbnailUrl: `${SITE_URL}/media/cloudisoft-reel-poster.jpg`,
      contentUrl: `${SITE_URL}/media/cloudisoft-reel-720.mp4`,
      uploadDate: "2026-11-01",
      duration: "PT28S",
      publisher: { "@id": `${SITE_URL}/#org` },
    });
  }
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
  const svc = SERVICES.find((x) => url === `/services/${SERVICE_DETAILS[x.id].slug}`);
  if (svc) {
    const d = SERVICE_DETAILS[svc.id];
    graph.push(
      {
        "@type": "Service",
        "@id": `${SITE_URL}${url}#service`,
        name: svc.name,
        serviceType: svc.name,
        description: d.intro,
        url: `${SITE_URL}${url}`,
        image: `${SITE_URL}/og/${d.slug}.jpg`,
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: [{ "@type": "Country", name: "United States" }, { "@type": "Country", name: "India" }],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${svc.name} — what’s included`,
          itemListElement: svc.deliverables.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x } })),
        },
        ...(svc.from ? { offers: { "@type": "Offer", priceCurrency: "USD", priceSpecification: { "@type": "PriceSpecification", minPrice: svc.from, priceCurrency: "USD" } } } : {}),
      },
      { "@type": "FAQPage", mainEntity: d.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
    );
  }
  // Articles
  const art = ARTICLES.find((a) => url === `/insights/${a.slug}`);
  if (art) {
    graph.push(
      {
        "@type": "BlogPosting",
        "@id": `${SITE_URL}${url}#article`,
        headline: art.title,
        description: art.description,
        abstract: art.answer,
        datePublished: art.published,
        dateModified: art.updated,
        inLanguage: "en",
        articleSection: art.category,
        wordCount: [art.answer, ...art.sections.flatMap((x) => x.blocks.map((b) => JSON.stringify(b)))].join(" ").split(/\s+/).length,
        image: `${SITE_URL}/og/${art.slug}.jpg`,
        mainEntityOfPage: `${SITE_URL}${url}`,
        author: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: "Cloudisoft" },
        publisher: { "@id": `${SITE_URL}/#org` },
        about: { "@type": "Thing", name: art.category },
      },
      { "@type": "FAQPage", mainEntity: art.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
    );
  }
  if (url === "/insights") {
    graph.push({
      "@type": "ItemList",
      itemListElement: ARTICLES.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/insights/${a.slug}`, name: a.title })),
    });
  }
  // Locations
  const loc = LOCATIONS.find((l) => url === `/locations/${l.slug}`);
  if (loc) {
    graph.push(locals.find((x) => x["@id"].endsWith(loc.officeId))!, {
      "@type": "FAQPage",
      mainEntity: loc.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  if (url === "/pricing") {
    graph.push({ "@type": "FAQPage", mainEntity: PRICING_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  }

  // Breadcrumbs follow the URL path
  if (url !== "/") {
    const items: { name: string; item: string }[] = [{ name: "Home", item: `${SITE_URL}/` }];
    if (svc) items.push({ name: "Services", item: `${SITE_URL}/services` });
    if (art) items.push({ name: "Insights", item: `${SITE_URL}/insights` });
    items.push({
      name: svc ? svc.name : art ? art.title : loc ? `Cloudisoft ${loc.city}` : page.title.split(/ [—|] /)[0],
      item: `${SITE_URL}${url}`,
    });
    graph.push({ "@type": "BreadcrumbList", itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, ...x })) });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
