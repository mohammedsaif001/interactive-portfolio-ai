// One place that assembles the pieces. Edit the content in the individual files next to this one:
//   basics.ts · about.ts · experience.ts · projects.ts · skills.ts · recommendations.ts · socials.ts · sections.ts
// Site-wide text: seo.ts (title, description, keywords) · faqs.ts (FAQ answers) · chat.ts (chat widget copy)
import { basics } from "./basics";
import { socials } from "./socials";
import { about } from "./about";
import { experience } from "./experience";
import { projects } from "./projects";
import { skills } from "./skills";
import { recommendations } from "./recommendations";

// Everything the components read: `import { profile } from "@/constants"`.
export const profile = { ...basics, socials, about, experience, projects, skills, recommendations };
