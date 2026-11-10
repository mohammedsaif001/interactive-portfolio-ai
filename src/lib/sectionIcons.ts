import { BookOpen, Briefcase, Cpu, Heart, Rocket, Send, UserRound, type LucideIcon } from "lucide-react";
import { type SectionId } from "@/constants/sections";

/** One icon per whiteboard section, reused by the nav chips in every view. */
export const sectionIcons: Record<SectionId, LucideIcon> = {
  intro: UserRound,
  about: BookOpen,
  experience: Briefcase,
  projects: Rocket,
  recs: Heart,
  skills: Cpu,
  contact: Send,
};
