// Resume content used by the /resume builder (live preview, Word and PDF export).
// `**double asterisks**` mark bold text. Edit here for the default, or edit inline on the /resume page.
import { basics } from "./basics";

export type ResumeLink = { label: string; href: string };
export type ResumeData = {
  name: string;
  title: string;
  contact: ResumeLink[];
  summary: string;
  experience: { role: string; company: string; location: string; period: string; bullets: string[] }[];
  projects: { name: string; links: ResumeLink[]; bullets: string[] }[];
  skills: { label: string; items: string[] }[];
  education: { degree: string; school: string; period: string };
};

/** Name of the downloaded .docx / PDF (no extension). */
export const resumeFileName = "Mohammed_Saif_Full_Stack_GenAI_Developer_5yrs";

export const resumeDefaults: ResumeData = {
  name: basics.name,
  title: "Senior Software Engineer · Full-Stack · Generative AI",
  contact: [
    { label: "Bengaluru, India", href: "" },
    { label: "+91-9632137360", href: "tel:+919632137360" },
    { label: basics.email, href: `mailto:${basics.email}` },
    { label: "linkedin.com/in/mohammedsaif001", href: "https://www.linkedin.com/in/mohammedsaif001" },
    { label: "github.com/mohammedsaif001", href: "https://github.com/mohammedsaif001" },
    { label: "imohdsaif.in", href: "https://www.imohdsaif.in" },
  ],
  summary:
    "Senior Software Engineer with around **4.5 years** of experience in full-stack development and **production GenAI**, using **React, Next.js, Node.js, Express.js and Azure OpenAI**. Built a **30-tool AI agent** exposed as an **MCP server** and a citation-grounded **RAG application**.",
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Basofa Consulting Pvt Ltd (Microsoft Certified Partner)",
      location: "Bengaluru",
      period: "Nov 2024 – Present",
      bullets: [
        "Architected an **AI assistant for D365 B2B Commerce** on Azure OpenAI, with **~30 tools** over live account, order and invoice data, also exposed as an **MCP server**",
        "**Lowered LLM cost per request** with a **router model** and prompt caching, with quality guarded by **LLM-as-judge evals**",
        "Own a **B2B storefront on the D365 Commerce React SDK**: 6 custom modules plus an **Azure AI Search** product configurator",
        "Built the front end of an **ERP–PSP reconciliation** platform, with **real-time AI streaming over SignalR**",
        "**Lead a team of 5 engineers** through sprint planning, code reviews and mentoring",
      ],
    },
    {
      role: "Software Engineer",
      company: "Aarabhya Systems Pvt Ltd",
      location: "Bengaluru",
      period: "Apr 2023 – Nov 2024",
      bullets: [
        "Built the front end of a **Next.js B2B platform** with a **7-level role hierarchy** and dashboards",
        "Built a **real-time medical-device training app**, animating a mannequin in GSAP from live socket data",
      ],
    },
    {
      role: "Software Engineer",
      company: "Nviera Technologies Pvt Ltd",
      location: "Bengaluru",
      period: "Jul 2022 – Feb 2023",
      bullets: ["Built **React and Redux** features for internal and client-facing web applications"],
    },
  ],
  projects: [
    {
      name: "Grounded Brain AI Notebook",
      links: [
        { label: "grounded-brain.imohdsaif.in", href: "https://grounded-brain.imohdsaif.in" },
        { label: "GitHub", href: "https://github.com/mohammedsaif001/grounded-brain-notebook-llm" },
      ],
      bullets: [
        "**NotebookLM-style RAG app**: chat with PDFs, websites, YouTube videos and **GitHub repos**, with **inline citations** to the exact page or file",
        "Generates **summaries, flashcards, quizzes, mind maps** and reports from your sources, plus an auto-built **repo wiki** with architecture diagrams",
        "Express, PostgreSQL with Prisma, **Pinecone**, **Inngest** jobs, **Mem0** memory and **Langfuse** tracing, with tests and CI",
      ],
    },
    {
      name: "Agent SDK Built From Scratch",
      links: [{ label: "GitHub", href: "https://github.com/mohammedsaif001/agent-sdk-from-scratch" }],
      bullets: ["TypeScript agent runtime with **Zod-validated tools**, **multi-agent handoffs** and **guardrails**"],
    },
  ],
  // Top skills only, in this order: Frontend, Backend, GenAI, Cloud & Platforms.
  skills: [
    { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Material UI"] },
    { label: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Cosmos DB"] },
    { label: "GenAI", items: ["Azure OpenAI", "OpenAI Agents SDK", "MCP", "RAG", "AI Agents", "LLM Evals"] },
    { label: "Cloud & Platforms", items: ["Microsoft Azure", "Azure DevOps", "Docker", "CI/CD", "Git", "GitHub", "D365 Commerce"] },
  ],
  education: {
    degree: "Bachelor of Technology, Computer Science and Engineering",
    school: "Presidency University, Bengaluru",
    period: "2018 – 2022",
  },
};
