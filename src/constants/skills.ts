// Skill groups. `plain` is the plain-English tagline, `built` is what was built with them.
import type { SkillGroup } from "./types";

export const skills = [
  { id: "frontend", title: "Frontend", plain: "What people see and touch", items: ["HTML5", "CSS3", "React", "Next.js", "Redux", "SWR", "Tailwind", "SCSS", "Material UI", "shadcn/ui"], built: "Storefront modules and themes on the D365 Commerce React SDK, a reconciliation interface, and the cited-answer chat of an AI notebook.", color: "yellow" },
  { id: "backend", title: "Backend", plain: "The engine behind the screens", items: ["JavaScript", "TypeScript", "Node.js", "Express", "NextAuth"], built: "Node and Express services: the B2B assistant's 30-tool service, the notebook's API and background jobs, and a portal API with role-based access.", color: "blue" },
  { id: "genai", title: "GenAI", plain: "Making AI useful in products", items: ["OpenAI API", "Azure OpenAI", "Agents SDK", "Claude", "MCP", "RAG", "Vector Search", "Azure AI Search", "AI Agents", "Inngest"], built: "A router-plus-agent assistant, MCP servers, a citation-grounded RAG notebook, and AI assistants using Azure AI Search.", color: "coral" },
  { id: "data", title: "Data", plain: "Where everything is remembered", items: ["PostgreSQL", "Azure Cosmos DB", "MongoDB", "Redis", "SQL"], built: "PostgreSQL behind the notebook, Cosmos DB and Blob Storage for the delivery portal, and MongoDB on other back ends.", color: "green" },
  { id: "cloud", title: "Cloud & DevOps", plain: "Keeping it fast and reliable", items: ["Microsoft Azure", "Azure DevOps", "Docker", "GitHub"], built: "Azure OpenAI, AI Search, Cosmos DB and Blob Storage, containerised apps shipped by CI/CD, and sprint delivery in Azure DevOps.", color: "yellow" },
] satisfies SkillGroup[];
