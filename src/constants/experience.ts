// Work history. `plain` is the one-line, jargon-free summary shown on the Quick overview page.
import type { Job } from "./types";

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Basofa Consulting Private Limited (Microsoft Certified Partner)",
    period: "Nov 2024 to Present",
    plain: "Designs how AI fits into Microsoft D365 Commerce, and builds the storefront experiences on top of it.",
    points: [
      "Architected the AI assistant for D365 B2B Commerce on Azure OpenAI: about 30 tools over live account, invoice, order and stock data, also exposed as an MCP server",
      "Cut LLM cost with a router model that loads only the tool groups each request needs, plus prompt caching, with LLM-judge evals guarding quality",
      "Own the custom B2B storefront on the D365 Commerce React SDK: 6 custom modules, a streaming chat assistant and an Azure AI Search configurator",
      "Delivered a financial reconciliation front end and a software delivery portal, end to end",
      "Run sprint planning and code reviews, and mentor engineers",
    ],
  },
  {
    role: "Software Engineer",
    company: "Aarabhya Systems Pvt Ltd.",
    period: "Apr 2023 to Nov 2024",
    points: [
      "Brought a medical-device training application to life with a mannequin animated in GSAP from live socket data",
      "Owned the front end of a Next.js platform with a 7-level role hierarchy, where each level adds, removes and monitors the users beneath it",
    ],
  },
  {
    role: "Software Engineer",
    company: "Nviera Technologies",
    period: "Jul 2022 to Feb 2023",
    points: [],
  },
] satisfies Job[];
