// Shapes of the content in profile.ts.

export type Color = "yellow" | "coral" | "blue" | "green";

// `id` doubles as the key into lib/techLogos.tsx, so "linkedin" | "github" | "leetcode" get their brand logo.
export type Social = { id: string; label: string; handle: string; href: string };
export type Job = {
  role: string;
  company: string;
  period: string;
  plain: string; // plain-language summary for the recruiter view
  points: string[];
};
export type Project = {
  title: string;
  blurb: string;
  impact: string;
  tags: string[]; // short list shown on the card
  stack?: string[]; // fuller list for the case study "Built with" row; defaults to `tags`
  href?: string; // omit for private / employer work: the "View project" button is hidden
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
