// Work history. `plain` is the one-line, jargon-free summary shown on the Quick overview page.
import type { Job } from "./types";

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Basofa Consulting Private Limited (Microsoft Certified Partner)",
    period: "Nov 2024 to Present",
    plain: "Designs how AI fits into Microsoft D365 Commerce, and builds the storefront experiences on top of it.",
    points: [
      "Designing how LLMs plug into D365 Commerce: intent parsing, RAG and MCP connections",
      "Built a dual-agent chat assistant (tables and charts) on Azure OpenAI with real-time updates",
      "Extended the D365 Commerce React SDK with 6 custom storefront modules",
      "Lead sprint planning, code reviews and mentoring",
    ],
  },
  {
    role: "Software Engineer",
    company: "Aarabhya Systems Pvt Ltd.",
    period: "Apr 2023 to Nov 2024",
    plain: "Built the user interface for real-time gaming platforms.",
    points: ["Built real-time gaming UIs with Next.js, Tailwind and GSAP", "Shipped JWT auth flows and led a responsive UI redesign"],
  },
  {
    role: "Software Engineer",
    company: "Nviera Technologies",
    period: "Jul 2022 to Feb 2023",
    plain: "First engineering role: building reusable front-end components in an agile team.",
    points: ["Built reusable React and Redux components in an agile team"],
  },
] satisfies Job[];
