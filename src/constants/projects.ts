// Project cards and case studies.
// TODO: LinkedIn has no Projects section, so these are drawn from the experience descriptions.
// Tags, architecture flows and the problem/approach wording are drafts: please review them.
// Add repo or demo links via `href` where public.
import type { Project } from "./types";

export const projects = [
  {
    title: "Source-grounded AI Notebook",
    blurb: "A web app where people add documents, web pages, videos and code repositories, then chat with them and generate study material, with answers that point back to the exact passages.",
    impact: "Every answer links back to its source passages",
    tags: ["TypeScript", "Next.js", "Express", "PostgreSQL"],
    stack: ["TypeScript", "Next.js", "React", "Express", "PostgreSQL"],
    color: "yellow",
    role: "Full-stack engineer · designed and built the backend, web interface and documentation",
    problem: "People who study from many scattered sources, such as PDFs, articles and videos, struggle to ask questions across them and trust the answers. They need replies tied to their own material, plus a quick way to turn it into things to revise from.",
    approach:
      // paragraphs are separated by a blank line and rendered as separate paragraphs
      "Built the full stack: authentication, workspaces and ingestion of files, web pages, video transcripts and code repositories, with slow work running as background jobs. The interface has a dashboard, a source library, a chat with clickable citations and a study hub.\n\n" +
      "Answers use retrieval with citations, optional live web search and per-user memory. Seven types of study material, from flashcards to mind maps, are generated in a structured form and validated before they are shown. Backed by tests, CI and a production container build.",
    architecture: ["Add a source", "Split into passages", "Index for search", "Retrieve and answer with citations", "Generate study material"],
  },
  {
    title: "D365 B2B Commerce AI Assistant",
    blurb: "A chat assistant for D365 B2B Commerce customers that answers account, order and product questions from live data, and guides them through adding items to the cart.",
    impact: "Two-model setup: router model + main agent model",
    tags: ["Azure OpenAI", "Agents SDK", "MCP", "Node.js", "Express", "TypeScript"],
    color: "green",
    role: "Built the assistant end to end, then optimised it with a two-model setup",
    problem: "D365 B2B Commerce customers had to go through several storefront screens to check balances, invoices, orders and stock, or to build a cart from a spreadsheet.",
    approach:
      // paragraphs are separated by a blank line and rendered as separate paragraphs
      "Built the assistant as a standalone service on Azure OpenAI and the OpenAI Agents SDK, with about 30 tools over the D365 Commerce endpoint. It answers questions on accounts, invoices, orders, products and warranty, confirms before changing the cart, accepts CSV or Excel bulk orders, and is also available as an MCP server.\n\n" +
      "To keep model calls lean, prompts were trimmed, tools merged and prompt caching added, then a router model was introduced to pick only the tool groups each request needs. Evals with an LLM judge and cost logging verified each change.",
    architecture: ["Storefront chat", "Router model", "Main agent model", "Tool groups", "D365 Commerce endpoint"],
  },
  {
    title: "D365 B2B Storefront on the Commerce SDK",
    blurb: "Extended the D365 Commerce React SDK to turn the ERP's commerce platform into a custom B2B storefront.",
    impact: "From approval workflows to an AI assistant",
    tags: ["React", "TypeScript", "D365 Commerce SDK", "SCSS"],
    color: "blue",
    role: "Front-end engineer · extended the D365 Commerce React SDK for a B2B storefront",
    problem: "The standard D365 storefront does not cover many B2B needs, such as approvals, quotes, bulk ordering, product configuration, invoices and returns. Business buyers need these in one branded storefront, not in separate tools.",
    approach:
      // paragraphs are separated by a blank line and rendered as separate paragraphs
      "Worked in a team to build custom B2B storefront modules for buying and account management, with shared themes and design tokens that restyle the standard modules, and data actions that connect to the D365 commerce endpoint.\n\n" +
      "Added an AI layer: a streaming chat assistant with a Stop button, and a configurator assistant using intent parsing and Azure AI Search. The codebase stays upgradable through SDK and Node upgrades, a style lint check and unit tests.",
    architecture: ["D365 storefront", "React SDK", "Modules, themes and data actions", "Commerce endpoint", "AI assistant API"],
  },
  {
    title: "Financial Reconciliation Platform",
    blurb: "A web interface where teams connect their systems, map data fields and set matching rules.",
    impact: "Guided onboarding and versioned publishing in one flow",
    tags: ["Next.js", "TypeScript", "Material UI", "SWR"],
    stack: ["Next.js", "React", "TypeScript", "Material UI", "SWR", "Redux Toolkit"],
    color: "coral",
    role: "Built the web interface for onboarding systems, mapping fields and setting matching rules",
    problem: "Each business system stores data in its own format, so matching records between them needed manual setup that was slow and easy to get wrong.",
    approach:
      // paragraphs are separated by a blank line and rendered as separate paragraphs
      "Built the web interface where a team connects a system, maps its fields to a shared data model and defines matching rules.\n\n" +
      "Drafts are versioned and published from the same screens, with status tracking, caching, retries and clear error messages.",
    architecture: ["Connect system", "Map fields", "Set rules", "Publish"],
  },
  {
    title: "Software Delivery Portal",
    blurb: "A role-based web portal where a software vendor's team publishes package versions and assigns them to customers, and customers download them and raise support tickets.",
    impact: "From UI and auth to data and deployment",
    tags: ["Next.js", "TypeScript", "Azure Cosmos DB", "Tailwind"],
    stack: ["Next.js", "React", "TypeScript", "Azure Cosmos DB", "Azure Blob Storage", "NextAuth", "Tailwind", "Redux Toolkit", "SWR"],
    color: "yellow",
    role: "Full-stack engineer · built the interface, API, access control and pipeline",
    problem: "Software vendors often share release packages with customers by hand, so nobody can easily tell who holds which version. Customers have no single place to get what they are entitled to or to ask for help.",
    approach:
      // paragraphs are separated by a blank line and rendered as separate paragraphs
      "Built a portal where the vendor's team publishes each package version and assigns it to the customers who should have it, with downloads logged so they can see who holds which version. Customers sign in to one place to download what they are entitled to and raise support tickets.\n\n" +
      "Access is controlled by role, with login lockout and optional email one-time-code verification, and the app ships through an automated build and deploy pipeline.",
    architecture: ["Browser UI", "Auth and role guards", "API routes", "Database and file storage", "Email and audit records"],
  },
  {
    title: "Agent SDK Built From Scratch",
    blurb: "A small TypeScript library that runs an LLM in a reasoning loop, calls validated tools, hands tasks between agents and screens inputs and outputs.",
    impact: "Bad tool arguments go back to the model as structured errors, so it can correct itself and retry",
    tags: ["TypeScript", "OpenAI API", "Zod", "Node.js"],
    stack: ["TypeScript", "OpenAI API", "Zod", "Node.js", "Multi-agent", "Guardrails"],
    color: "blue",
    role: "Personal project · a from-scratch agent runtime with validated tools, agent handoffs and guardrails",
    problem: "Agent frameworks hide the reasoning loop, tool parsing, retries and safety checks, so it is hard to know what they actually do. Building each piece from scratch makes the behaviour visible and understandable.",
    approach:
      // paragraphs are separated by a blank line and rendered as separate paragraphs
      "Built a runtime that asks the model for one JSON step at a time (think, request a tool, analyse, output), with a cap on loop iterations. Tool arguments are checked against Zod schemas, and invalid arguments or tool failures go back to the model as structured errors so it can retry.\n\n" +
      "Agents can hand tasks to one another along with the conversation history. Guardrails screen three points: input (prompt injection, PII masking, length limit), tool calls (destructive commands) and output (secret redaction). Also includes a fluent builder API, a logging interceptor and demos that run without an API key.",
    architecture: ["User input", "Input guardrails", "Model step loop", "Tool or handoff", "Output guardrails", "Final reply"],
  },
] satisfies Project[];
