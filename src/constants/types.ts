// Shapes of the content in profile.ts.

export type Color = "yellow" | "coral" | "blue" | "green";

// `id` doubles as the key into lib/techLogos.tsx, so "linkedin" | "github" | "leetcode" get their brand logo.
export type Social = { id: string; label: string; handle: string; href: string };
export type Job = {
  role: string;
  company: string;
  period: string;
  plain?: string; // optional plain-language summary for the recruiter view; omit when it would only repeat `points`
  points: string[];
};
export type Project = {
  title: string;
  blurb: string;
  impact: string;
  tags: string[]; // short list shown on the card
  stack?: string[]; // fuller list for the case study "Built with" row; defaults to `tags`
  repo?: string; // public GitHub repository: shows a "GitHub" button in the case study
  live?: string; // deployed app: shows a "Live demo" button. Omit either for private / employer work.
  color: Color;
  role: string;
  problem: string;
  approach: string;
  architecture: string[]; // left-to-right flow of components
};
export type SkillGroup = {
  id: "frontend" | "backend" | "genai" | "data" | "cloud";
  title: string;
  plain: string;
  items: string[];
  built: string; // "in practice" sentence shown when a node is selected
  color: Color;
};
export type Recommendation = { quote: string; name: string; title: string; date: string };
