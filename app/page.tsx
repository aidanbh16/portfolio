import { PortfolioClient } from "./components/PortfolioClient";
import { experience, links, profile, siteUrl } from "./data";

// Tells search engines this page is about a person, not just a generic site.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dahlonega", addressRegion: "GA", addressCountry: "US" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of North Georgia" },
  worksFor: experience
    .filter((role) => role.period.includes("Present"))
    .map((role) => ({ "@type": "Organization", name: role.org })),
  sameAs: links.map((link) => link.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" keeps the JSON from ever closing the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <PortfolioClient />
    </>
  );
}
