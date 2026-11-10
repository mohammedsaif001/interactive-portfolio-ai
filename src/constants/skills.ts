// Skill groups. `plain` is the plain-English tagline, `built` is what was built with them.
import type { SkillGroup } from "./types";

export const skills = [
  { id: "frontend", title: "Frontend", plain: "What people see and touch", items: ["HTML5", "CSS3", "React", "Next.js", "Redux", "Tailwind", "Material UI", "shadcn/ui"], built: "Extended the D365 Commerce React SDK with custom modules and built a real-time chat experience for an AI assistant.", color: "yellow" },
  { id: "backend", title: "Backend", plain: "The engine behind the screens", items: ["JavaScript", "TypeScript", "Node.js", "Express"], built: "Worked with back-end teams on the API contracts behind AI and reconciliation features.", color: "blue" },
  { id: "genai", title: "GenAI", plain: "Making AI useful in products", items: ["OpenAI API", "Azure OpenAI", "Claude", "MCP", "RAG", "Vector Search", "AI Agents", "Inngest"], built: "RAG systems with vector search, durable agent workflows with Inngest, and MCP servers that connect LLMs to real tools.", color: "coral" },
  { id: "data", title: "Data", plain: "Where everything is remembered", items: ["MongoDB", "PostgreSQL", "Redis", "SQL"], built: "Postgres and MongoDB on the back end, vector search for retrieval, and Cosmos DB for an internal full-stack app.", color: "green" },
  { id: "cloud", title: "Cloud & DevOps", plain: "Keeping it fast and reliable", items: ["Microsoft Azure", "Azure DevOps", "Docker", "GitHub"], built: "Azure OpenAI services, containerised services with Docker, and sprint delivery through Azure DevOps.", color: "yellow" },
] satisfies SkillGroup[];
