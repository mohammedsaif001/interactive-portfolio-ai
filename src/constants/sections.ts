// The whiteboard / overview / story sections, in reading order.

// Order here is the order of the nav pills and the page.
export const sections = [
  { id: "intro", label: "Hello" },
  { id: "about", label: "About me" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "recs", label: "Kind words" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
