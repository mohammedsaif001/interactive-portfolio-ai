// Search-engine and social-card text: site URL, title, description, handles and keywords.
// The structured-data (JSON-LD) builder that uses these lives in src/lib/seo.ts.

// Official domain. NEXT_PUBLIC_SITE_URL can override it (e.g. for a preview deployment).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.imohdsaif.in").replace(/\/$/, "");

export const siteName = "Mohammed Saif";

export const seoTitle = "Mohammed Saif | Senior Software Engineer in Bangalore · Full-stack & GenAI";
export const seoDescription =
  "Mohammed Saif (imohdsaif) is a Bangalore-based Senior Software Engineer open to immediate joining. React, Next.js, Node.js and GenAI: Azure OpenAI, RAG, MCP, AI agents, Microsoft D365 Commerce.";

/** Short handles and spellings people actually type. */
export const aliases = ["mohammedsaif001", "mohammed001saif", "imohdsaif", "imohdsaif.in", "www.imohdsaif.in", "imohdsaif.com", "imohdsaif.dev", "imohdsaif.ai", "Mohammad Saif", "Md Saif"];

// Grouped: name, role + city combos, places, then skills. Add new phrases under the matching group.
export const keywords = [
  // name + handles
  "Mohammed Saif",
  "Mohd Saif",
  "Mohammed Saif Bangalore",
  "Mohammed Saif Bengaluru",
  "Mohammed Saif software engineer",
  "Mohammed Saif portfolio",
  "imohdsaif.in",
  "www.imohdsaif.in",
  "Grounded Brain",
  "Grounded Brain AI Notebook",
  "Grounded Brain RAG app",
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
  "Senior Software Engineer Bengaluru",
  "software engineer Bangalore",
  "software engineer Bengaluru",
  "software developer Bangalore",
  "software developer Bengaluru",
  "hire software engineer Bengaluru",
  "hire full-stack developer Bengaluru",
  "full-stack developer Bengaluru",
  "full stack developer Bangalore",
  "React developer Bangalore",
  "React developer Bengaluru",
  "Next.js developer Bangalore",
  "Next.js developer Bengaluru",
  "Node.js developer Bangalore",
  "Node.js developer Bengaluru",
  "frontend developer Bangalore",
  "frontend developer Bengaluru",
  "GenAI engineer Bengaluru",
  "AI engineer Bengaluru",
  "Generative AI developer Bangalore",
  "Generative AI developer Bengaluru",
  "D365 Commerce developer Bangalore",
  "D365 Commerce developer Bengaluru",
  "software engineer Karnataka",
  "software engineer Bangalore immediate joiner",
  "software engineer Bengaluru immediate joiner",
  "freelance software engineer Bangalore",
  // places + education
  "Bangalore",
  "Bengaluru",
  "Bengalooru",
  "Bangalore India",
  "Bengaluru India",
  "Bangalore Karnataka",
  "Bengaluru Karnataka",
  "Silicon Valley of India",
  "Karnataka",
  "India",
  "Presidency University Bengaluru",
  "Basofa Consulting Pvt Ltd",
  "Basofa",
  "Microsoft Certified partner",
  "Basofa Consulting Pvt Ltd - Microsoft Certified partner",
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
