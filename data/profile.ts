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
  stat: { value: number; suffix: string; label: string };
};
export type Metric = { value: number; prefix?: string; suffix?: string; label: string };
export type Project = {
  title: string;
  blurb: string;
  impact: string;
  tags: string[];
  href: string;
  color: Color;
  role: string;
  problem: string;
  approach: string;
  architecture: string[]; // left-to-right flow of components
  metrics: Metric[];
};
export type SkillGroup = {
  id: "frontend" | "backend" | "genai" | "data" | "cloud";
  title: string;
  plain: string;
  items: string[];
  built: string; // "in practice" sentence shown when a node is selected
  color: Color;
};
export type Recommendation = { quote: string; name: string; title: string };

export const profile = {
  name: "Mohammed Saif",
  initials: "MS",
  role: "Senior Software Engineer",
  subtitle: "Full-stack · GenAI",
  rotatingRoles: ["Full-stack engineer", "GenAI builder", "System designer", "Team mentor"],
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
  stats: [
    { value: 8, suffix: "+", label: "years shipping" },
    { value: 20, suffix: "+", label: "products launched" },
    { value: 200, suffix: "k", label: "monthly users served" },
    { value: 35, suffix: "%", label: "support load cut with RAG" },
  ],
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
      stat: { value: 35, suffix: "%", label: "less support load" },
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
      stat: { value: 200, suffix: "k", label: "monthly users" },
    },
    {
      role: "Software Engineer",
      company: "Company C",
      period: "2017 to 2019",
      plain: "Started career building internal tools and backend services.",
      points: ["Shipped internal dashboards used daily by 300+ staff", "Owned the reporting data pipeline"],
      stat: { value: 300, suffix: "+", label: "daily users" },
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
      role: "Tech lead · designed and built end to end",
      problem: "Support agents spent hours searching scattered docs, and customers waited days for simple answers.",
      approach: "Indexed docs into a vector store, retrieved the best passages per question, and had an LLM answer with citations. Added an eval harness so every prompt change is scored before it ships.",
      architecture: ["Next.js UI", "API", "Retriever", "LLM", "pgvector"],
      metrics: [
        { value: 35, suffix: "%", label: "fewer tickets" },
        { value: 92, suffix: "%", label: "answer accuracy (eval set)" },
        { value: 4, prefix: "<", suffix: "s", label: "median response" },
      ],
    },
    {
      title: "Agent Workbench",
      blurb: "Multi-step AI agents with tool use, tracing and automated evals.",
      impact: "Used by 4 product teams",
      tags: ["TypeScript", "Agents", "Evals"],
      href: "https://github.com",
      color: "blue",
      role: "Architect · platform owner",
      problem: "Teams were each hand-rolling fragile agent code with no way to debug or measure quality.",
      approach: "Built a shared framework: declarative tools, step-by-step tracing, replayable runs and automated evals in CI, so agents become testable software.",
      architecture: ["Agent spec", "Orchestrator", "Tools", "Tracer", "Eval runner"],
      metrics: [
        { value: 4, label: "product teams" },
        { value: 60, suffix: "%", label: "faster agent debugging" },
        { value: 300, suffix: "+", label: "automated eval cases" },
      ],
    },
    {
      title: "Realtime Ops Dashboard",
      blurb: "Live operations dashboard with streaming metrics and alerts.",
      impact: "Updates in under 200ms at scale",
      tags: ["React", "Node", "WebSockets", "AWS"],
      href: "https://github.com",
      color: "coral",
      role: "Full-stack lead",
      problem: "Operators relied on stale reports and found incidents from customer complaints.",
      approach: "Streamed events through a message queue into WebSocket channels, with client-side windowing so thousands of data points stay smooth.",
      architecture: ["Producers", "Queue", "Stream API", "WebSocket", "React UI"],
      metrics: [
        { value: 200, prefix: "<", suffix: "ms", label: "update latency" },
        { value: 10, suffix: "k", label: "events per second" },
        { value: 70, suffix: "%", label: "faster incident detection" },
      ],
    },
  ] satisfies Project[],
  skills: [
    { id: "frontend", title: "Frontend", plain: "What people see and touch", items: ["React", "Next.js", "TypeScript", "Tailwind"], built: "Design-system-driven apps with fast, accessible UIs, like the dashboards and chat experiences above.", color: "yellow" },
    { id: "backend", title: "Backend", plain: "The engine behind the screens", items: ["Node.js", "Python", "REST / GraphQL", "Queues"], built: "Typed APIs and services that stay boring under load: auth, queues, streaming and background jobs.", color: "blue" },
    { id: "genai", title: "GenAI", plain: "Making AI useful in products", items: ["LLM APIs", "RAG", "Agents", "Evals"], built: "Retrieval pipelines, tool-using agents and eval suites, so AI features are measured, not guessed.", color: "coral" },
    { id: "data", title: "Data", plain: "Where everything is remembered", items: ["PostgreSQL", "pgvector", "Redis", "Search"], built: "Schemas and indexes shaped by real query patterns, plus vector search for retrieval.", color: "green" },
    { id: "cloud", title: "Cloud & DevOps", plain: "Keeping it fast and reliable", items: ["AWS", "Docker", "CI/CD", "Observability"], built: "Containerised services with automated pipelines, tracing and alerts, deployed without drama.", color: "yellow" },
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
