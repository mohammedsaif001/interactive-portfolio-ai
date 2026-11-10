import { profile } from "@/constants";
import { chatFallback } from "@/constants/chat";

// PHASE 1 STUB: canned keyword replies so the chat UI can be judged.
// Phase 4 replaces this with a streaming /api/chat route backed by Claude.

export function mockReply(input: string): string {
  const q = input.toLowerCase();
  if (/(contact|email|reach|hire)/.test(q))
    return `You can reach ${profile.name} at ${profile.email}, or via LinkedIn. His resume is downloadable from the Contact section.`;
  if (/(genai|\bai\b|llm|rag|agent)/.test(q))
    return `He builds GenAI features end to end: ${profile.projects[0].title} (${profile.projects[0].impact}) and ${profile.projects[1].title}. Stack: LLM APIs, RAG, agents and evals.`;
  if (/(fit|senior|role|full)/.test(q))
    return `${profile.name} has been building software since ${profile.since}, across frontend, backend and cloud, and currently works as a ${profile.role}. ${profile.availability}.`;
  if (/(experience|work|career|history|summar)/.test(q))
    return profile.experience.map((j) => `${j.role}, ${j.company} (${j.period}): ${j.plain}`).join("\n");
  if (/(skill|stack|tech)/.test(q))
    return profile.skills.map((s) => `${s.title}: ${s.items.join(", ")}`).join("\n");
  return chatFallback(profile.name);
}
