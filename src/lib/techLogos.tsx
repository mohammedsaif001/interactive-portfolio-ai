import type { ComponentType } from "react";
import { Bot, Brain, Database, Library, Plug, Search, Sparkles, Webhook, Workflow, Wrench, type LucideIcon } from "lucide-react";
import {
  SiClaude,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiLeetcode,
  SiModelcontextprotocol,
  SiMui,
  SiShadcnui,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaCss3, FaLinkedin } from "react-icons/fa6";
import { BsOpenai } from "react-icons/bs";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";

type IconComponent = ComponentType<{ size?: number | string; color?: string; className?: string; "aria-hidden"?: boolean }>;

const DARK = "#1f2430"; // used for brands whose logo is black, so it stays visible on the white logo tile

// Original brand colours (a few darkened a touch so they read on white).
const logos: Record<string, { Icon: IconComponent; color: string }> = {
  react: { Icon: SiReact, color: "#0E8CB5" },
  nextjs: { Icon: SiNextdotjs, color: DARK },
  html: { Icon: SiHtml5, color: "#E34F26" },
  css: { Icon: FaCss3, color: "#1572B6" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  javascript: { Icon: SiJavascript, color: "#D9B800" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  redux: { Icon: SiRedux, color: "#764ABC" },
  materialui: { Icon: SiMui, color: "#007FFF" },
  shadcn: { Icon: SiShadcnui, color: DARK },
  reactquery: { Icon: SiReactquery, color: "#FF4154" },
  sass: { Icon: SiSass, color: "#CC6699" },
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E" },
  express: { Icon: SiExpress, color: DARK },
  graphql: { Icon: SiGraphql, color: "#E10098" },
  python: { Icon: SiPython, color: "#3776AB" },
  postgresql: { Icon: SiPostgresql, color: "#336791" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  redis: { Icon: SiRedis, color: "#DC382D" },
  prisma: { Icon: SiPrisma, color: "#2D3748" },
  drizzle: { Icon: SiDrizzle, color: "#8FB012" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  aws: { Icon: FaAws, color: "#FF9900" },
  azure: { Icon: VscAzure, color: "#0078D4" },
  azureopenai: { Icon: VscAzure, color: "#0078D4" },
  azuredevops: { Icon: VscAzureDevops, color: "#0078D4" },
  git: { Icon: SiGit, color: "#F05032" },
  github: { Icon: SiGithub, color: DARK },
  leetcode: { Icon: SiLeetcode, color: "#FFA116" },
  linkedin: { Icon: FaLinkedin, color: "#0A66C2" },
  claude: { Icon: SiClaude, color: "#D97757" },
  openai: { Icon: BsOpenai, color: DARK },
  mcp: { Icon: SiModelcontextprotocol, color: DARK },
};

// Concepts with no brand logo get a drawn icon instead.
const concepts: Record<string, LucideIcon> = {
  rag: Library,
  agents: Bot,
  aiagents: Bot,
  genai: Sparkles,
  ai: Brain,
  inngest: Workflow,
  sql: Database,
  vectorsearch: Search,
  restapis: Webhook,
  eventdriven: Plug,
};

// Different spellings of the same technology.
const aliases: Record<string, string> = {
  next: "nextjs",
  html5: "html",
  css3: "css",
  ts: "typescript",
  js: "javascript",
  tailwindcss: "tailwind",
  reduxtoolkit: "redux",
  node: "nodejs",
  expressjs: "express",
  postgres: "postgresql",
  amazonwebservices: "aws",
  microsoftazure: "azure",
  modelcontextprotocol: "mcp",
  reactjs: "react",
  mui: "materialui",
  openaiapi: "openai",
  shadcnui: "shadcn",
};

const key = (name: string) => {
  const k = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return aliases[k] ?? k;
};

/** Just the logo for a technology (or a drawn icon when it has none). */
export function TechLogo({ name, size = 16 }: { name: string; size?: number }) {
  const k = key(name);
  const brand = logos[k];
  if (brand) return <brand.Icon size={size} color={brand.color} aria-hidden />;
  const Concept = concepts[k] ?? Wrench;
  return <Concept size={size} color={DARK} aria-hidden />;
}
