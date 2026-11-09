// Single source of truth for everything search engines, social cards and AI answer engines read.
import { profile } from "@/data/profile";

// Set NEXT_PUBLIC_SITE_URL (e.g. https://imohdsaif.dev) once you attach a custom domain.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://imohdsaif-ai.azurewebsites.net").replace(/\/$/, "");

export const siteName = "Mohammed Saif";
export const firstName = profile.name.split(" ")[0];

export const seoTitle = "Mohammed Saif | Senior Software Engineer in Bangalore · Full-stack & GenAI";
export const seoDescription =
  "Mohammed Saif (imohdsaif) is a Bangalore-based Senior Software Engineer open to immediate joining. React, Next.js, Node.js and GenAI: Azure OpenAI, RAG, MCP, AI agents, Microsoft D365 Commerce.";

/** Short handles and spellings people actually type. */
export const aliases = ["mohammedsaif001", "mohammed001saif", "imohdsaif", "imohdsaif.in", "imohdsaif.com", "imohdsaif.dev", "imohdsaif.ai", "Mohammad Saif", "Md Saif"];

export const keywords = [
  // name + handles
  "Mohammed Saif",
  "Mohammed Saif Bangalore",
  "Mohammed Saif Bengaluru",
  "Mohammed Saif software engineer",
  "Mohammed Saif portfolio",
  "Mohammed Saif Presidency University",
  ...aliases,
  // role + intent
  "Senior Software Engineer",
  "Senior Software Engineer Immediate Joining",
  "Senior Software Engineer Bangalore",
  "immediate joiner software engineer",
  "hire senior software engineer Bangalore",
  "full-stack developer Bangalore",
  "full stack engineer India",
  "GenAI engineer Bangalore",
  "AI engineer Bangalore",
  "remote software engineer India",
  "open to work software engineer",
  // places + education
  "Bangalore",
  "Bengaluru",
  "Karnataka",
  "India",
  "Presidency University",
  "Presidency University Bangalore",
  // skills
  "React developer",
  "Next.js developer",
  "Node.js developer",
  "TypeScript developer",
  "frontend engineer",
  "Microsoft D365 Commerce developer",
  "Azure OpenAI",
  "RAG",
  "MCP",
  "AI agents",
  "LLM integration",
  "Vector search",
  "Microsoft Azure",
];

/** Question-and-answer pairs: feed FAQ rich results, voice assistants and AI answer engines (AEO/GEO). */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Who is Mohammed Saif?",
    a: `Mohammed Saif (also found online as imohdsaif, mohammedsaif001 and mohammed001saif) is a ${profile.role} based in Bengaluru (Bangalore), India. He works across full-stack development and GenAI, building enterprise solutions on Microsoft D365 Commerce with React, Next.js, Azure OpenAI, RAG and MCP.`,
  },
  {
    q: "Is Mohammed Saif available for immediate joining?",
    a: `Yes. Mohammed Saif is a Senior Software Engineer open to immediate joining for remote and Bangalore-based full-stack and GenAI engineering roles. Contact: ${profile.email}.`,
  },
  {
    q: "Where is Mohammed Saif based?",
    a: "He is based in Bengaluru (Bangalore), Karnataka, India, and is open to remote work.",
  },
  {
    q: "What does Mohammed Saif do?",
    a: profile.bio,
  },
  {
    q: "What are Mohammed Saif's skills?",
    a: profile.skills.map((s) => `${s.title}: ${s.items.join(", ")}`).join(". ") + ".",
  },
  {
    q: "Where did Mohammed Saif study?",
    a: "Mohammed Saif studied at Presidency University, Bengaluru.",
  },
  {
    q: "Where has Mohammed Saif worked?",
    a: profile.experience.map((j) => `${j.role} at ${j.company} (${j.period})`).join("; ") + ".",
  },
  {
    q: "How can I contact or hire Mohammed Saif?",
    a: `Email ${profile.email}, or connect on LinkedIn at ${profile.socials[0].href}. You can also use the Ask me anything chat assistant on this site.`,
  },
];

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
      worksFor: { "@type": "Organization", name: "BASOFA" },
      knowsAbout: profile.skills.flatMap((s) => s.items),
      sameAs: profile.socials.map((s) => s.href),
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
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};
