// ALL portfolio content lives here. Everything below is PLACEHOLDER sample data,
// replace with your real details in phase 3.

export type Color = "yellow" | "coral" | "blue" | "green";

export type Social = { id: string; label: string; handle: string; href: string; short: string };
export type Job = {
  role: string;
  company: string;
  period: string;
  plain: string; // plain-language summary for the recruiter view
  points: string[];
};
export type Project = {
  title: string;
  blurb: string;
  impact: string;
  tags: string[];
  href: string;
  color: Color;
};
export type SkillGroup = {
  id: string;
  title: string;
  plain: string;
  items: string[];
  color: Color;
};
export type Recommendation = { quote: string; name: string; title: string };

export const profile = {
  name: "Mohammed Saif",
  initials: "MS",
  role: "Senior Software Engineer",
  subtitle: "Full-stack · GenAI",
  location: "India · Open to remote",
  years: "8+",
  tagline: "I build products end to end, and teach LLMs to be genuinely useful inside them.",
  bio: "Senior full-stack engineer who ships web platforms from database to pixel, and builds GenAI features (RAG, agents, evals) that hold up in production. I like turning fuzzy problems into simple, reliable systems.",
  availability: "Open to senior / staff full-stack and GenAI roles",
  resumeHref: "/resume.pdf",
  email: "hello@example.com",
  socials: [
    { id: "linkedin", label: "LinkedIn", handle: "/in/your-handle", href: "https://linkedin.com", short: "in" },
    { id: "github", label: "GitHub", handle: "@your-handle", href: "https://github.com", short: "gh" },
    { id: "leetcode", label: "LeetCode", handle: "@your-handle", href: "https://leetcode.com", short: "lc" },
  ] satisfies Social[],
  facts: [
    { label: "Experience", value: "8+ years" },
    { label: "Focus", value: "Full-stack + GenAI" },
    { label: "Currently", value: "Senior Engineer" },
    { label: "Location", value: "India · Remote-friendly" },
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Company A",
      period: "2022 to Present",
      plain: "Leads a product team building AI-powered features used by thousands of customers.",
      points: [
        "Designed an LLM-powered assistant with retrieval (RAG), cutting support load by 35%",
        "Led migration of a monolith to services, halving deploy time",
        "Mentored 5 engineers; ran the team's architecture reviews",
      ],
    },
    {
      role: "Full-Stack Engineer",
      company: "Company B",
      period: "2019 to 2022",
      plain: "Built and scaled the customer-facing web platform and its APIs.",
      points: [
        "Built a React + Node platform serving 200k monthly users",
        "Introduced CI/CD and observability across 12 services",
      ],
    },
    {
      role: "Software Engineer",
      company: "Company C",
      period: "2017 to 2019",
      plain: "Started career building internal tools and backend services.",
      points: ["Shipped internal dashboards used daily by 300+ staff", "Owned the reporting data pipeline"],
    },
  ] satisfies Job[],
  projects: [
    {
      title: "Ask-My-Docs",
      blurb: "Chat with company knowledge using retrieval-augmented generation.",
      impact: "35% fewer support tickets",
      tags: ["Next.js", "LLM", "RAG", "pgvector"],
      href: "https://github.com",
      color: "yellow",
    },
    {
      title: "Agent Workbench",
      blurb: "Multi-step AI agents with tool use, tracing and automated evals.",
      impact: "Used by 4 product teams",
      tags: ["TypeScript", "Agents", "Evals"],
      href: "https://github.com",
      color: "blue",
    },
    {
      title: "Realtime Ops Dashboard",
      blurb: "Live operations dashboard with streaming metrics and alerts.",
      impact: "Updates in under 200ms at scale",
      tags: ["React", "Node", "WebSockets", "AWS"],
      href: "https://github.com",
      color: "coral",
    },
  ] satisfies Project[],
  skills: [
    { id: "frontend", title: "Frontend", plain: "What people see and touch", items: ["React", "Next.js", "TypeScript", "Tailwind"], color: "yellow" },
    { id: "backend", title: "Backend", plain: "The engine behind the screens", items: ["Node.js", "Python", "REST / GraphQL", "PostgreSQL"], color: "blue" },
    { id: "genai", title: "GenAI", plain: "Making AI useful in products", items: ["LLM APIs", "RAG", "Agents", "Evals"], color: "coral" },
    { id: "cloud", title: "Cloud & DevOps", plain: "Keeping it fast and reliable", items: ["AWS", "Docker", "CI/CD", "Observability"], color: "green" },
  ] satisfies SkillGroup[],
  recommendations: [
    { quote: "One of the most dependable engineers I've worked with. Turns ambiguity into a clear plan, then ships it.", name: "Sample Person", title: "Engineering Manager, Company A" },
    { quote: "Brought our AI feature from demo to production, and taught the whole team how to evaluate it.", name: "Sample Person", title: "Product Lead, Company A" },
    { quote: "Great mentor. Code reviews that make you better, never smaller.", name: "Sample Person", title: "Engineer, Company B" },
  ] satisfies Recommendation[],
};

export const sections = [
  { id: "intro", label: "Hello" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "recs", label: "Kind words" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
