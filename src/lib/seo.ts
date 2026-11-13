// Builds the JSON-LD structured data. The text it uses lives in src/constants/ (seo.ts, faqs.ts).
import { profile } from "@/constants";
import { aliases, seoDescription, seoTitle, siteUrl } from "@/constants/seo";
import { faqs } from "@/constants/faqs";

const personId = `${siteUrl}/#person`;

/** One @graph with Person, WebSite, ProfilePage and FAQPage, so search engines can connect the entities. */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: aliases,
      url: siteUrl,
      image: `${siteUrl}${profile.photo}`,
      jobTitle: profile.role,
      description: seoDescription,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
      homeLocation: { "@type": "Place", name: "Bengaluru, Karnataka, India" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Presidency University", address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" } },
      worksFor: { "@type": "Organization", name: "Basofa Consulting Private Limited" },
      knowsAbout: profile.skills.flatMap((s) => s.items),
      sameAs: [siteUrl, ...profile.socials.map((s) => s.href)],
      mainEntityOfPage: { "@id": `${siteUrl}/#profilepage` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${profile.name} | Portfolio`,
      alternateName: aliases,
      inLanguage: "en-IN",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: seoTitle,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: `Projects by ${profile.name}`,
      itemListElement: profile.projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: p.title,
          description: p.blurb,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          author: { "@id": personId },
          keywords: (p.stack ?? p.tags).join(", "),
          ...(p.live && { url: p.live }),
          ...(p.repo && { codeRepository: p.repo }),
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};
