import type { ResumeLink } from "@/constants/resume";

export type ContactKind = "pin" | "phone" | "mail" | "linkedin" | "github" | "web";

export function contactKind(c: ResumeLink): ContactKind {
  if (c.href.startsWith("mailto:")) return "mail";
  if (c.href.startsWith("tel:")) return "phone";
  if (c.href.includes("linkedin.com")) return "linkedin";
  if (c.href.includes("github.com")) return "github";
  return c.href ? "web" : "pin";
}
