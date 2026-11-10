// Project cards and case studies.
// TODO: LinkedIn has no Projects section, so these are drawn from the experience descriptions.
// Tags, architecture flows and the problem/approach wording are drafts: please review them.
// Add repo or demo links via `href` where public.
import type { Project } from "./types";

export const projects = [
  {
    title: "D365 AI Chat Assistant",
    blurb: "A chat assistant inside D365 Commerce that guides users through multi-step actions.",
    impact: "Dual-agent answers: tables and charts, live",
    tags: ["Azure OpenAI", "Agents", "SignalR", "React"],
    color: "yellow",
    role: "Designed the agent setup and built the real-time experience",
    problem: "Commerce users had to dig through screens to get answers and complete multi-step actions on their own.",
    approach: "Split the work between two agents, one for tabular answers and one for charts, on Azure OpenAI. Streamed results to the UI in real time with SignalR and Pub/Sub, keeping every user's conversation isolated.",
    architecture: ["React chat UI", "SignalR", "Pub/Sub", "Table + chart agents", "Azure OpenAI"],
    metrics: [{ value: 2, label: "specialised agents: tables and charts" }],
  },
  {
    title: "D365 Commerce Storefront Modules",
    blurb: "Custom modules that let ISV solutions run natively inside D365 storefronts.",
    impact: "6 modules running inside D365 Commerce",
    tags: ["React", "TypeScript", "D365 Commerce SDK"],
    color: "blue",
    role: "Front-end engineer · extended the D365 Commerce React SDK",
    problem: "ISV solutions need to feel like part of the storefront, not a separate app bolted on.",
    approach: "Extended the D365 Commerce React SDK with custom modules: Bulk Order Upload, CPQ Products, Warranty Management, Quotations, Smart Discounts and a B2B Dashboard.",
    architecture: ["D365 storefront", "React SDK", "Custom modules", "ISV back end"],
    metrics: [{ value: 6, label: "custom storefront modules" }],
  },
  {
    title: "Financial Reconciliation Platform",
    blurb: "Matching financial records with a mix of manual review and automation.",
    impact: "Hybrid manual + automated matching",
    tags: ["API design", "Full-stack", "Azure"],
    color: "coral",
    role: "Designed the API contracts with the back-end team",
    problem: "Reconciling financial records by hand is slow, but fully automatic matching is hard to trust.",
    approach: "Designed the API contracts with the back-end teams for a platform that combines automated matching with manual review for the cases that need a person.",
    architecture: ["Records in", "Auto-match", "Manual review", "Reconciled"],
    metrics: [{ value: 2, label: "matching modes: manual and automated" }],
  },
] satisfies Project[];
