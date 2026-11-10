// Question-and-answer pairs: feed FAQ rich results, voice assistants and AI answer engines (AEO/GEO).
import { profile } from "./index";


export const faqs: { q: string; a: string }[] = [
  {
    q: "Who is Mohammed Saif?",
    a: `Mohammed Saif (also found online as imohdsaif, mohammedsaif001 and mohammed001saif) is a ${profile.role} based in Bengaluru (Bangalore), India. He works across full-stack development and GenAI, building enterprise solutions on Microsoft D365 Commerce with React, Next.js, Azure OpenAI, RAG and MCP.`,
  },
  {
    q: "Is Mohammed Saif available for immediate joining?",
    a: `Yes. Mohammed Saif is a Senior Software Engineer open to immediate joining for full-stack and GenAI engineering roles, either remote or hybrid in Bangalore. Contact: ${profile.email}.`,
  },
  {
    q: "Where is Mohammed Saif based?",
    a: "He is based in Bengaluru (Bangalore), Karnataka, India, and is open to remote work as well as hybrid roles in Bangalore.",
  },
  {
    q: "What does Mohammed Saif do?",
    a: profile.bio,
  },
  {
    q: "What are Mohammed Saif's skills?",
    a: profile.skills.map((s) => `${s.title}: ${s.items.join(", ")}`).join(". ") + ".",
  },
  {
    q: "Where did Mohammed Saif study?",
    a: "Mohammed Saif studied at Presidency University, Bengaluru.",
  },
  {
    q: "Where has Mohammed Saif worked?",
    a: profile.experience.map((j) => `${j.role} at ${j.company} (${j.period})`).join("; ") + ".",
  },
  {
    q: "How can I contact or hire Mohammed Saif?",
    a: `Email ${profile.email}, or connect on LinkedIn at ${profile.socials[0].href}. You can also use the Ask me anything chat assistant on this site.`,
  },
];
