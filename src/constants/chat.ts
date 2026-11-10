// Static text for the "Ask me anything" chat widget.

/** Quick-reply chips shown under the first message. */
export const suggestedPrompts = [
  "Summarize his experience",
  "What has he built with GenAI?",
  "Is he a fit for a senior full-stack role?",
  "How can I contact him?",
];

// First bot message; takes the first name so it stays correct if the profile changes.
export const chatGreeting = (firstName: string) =>
  `Hi! I'm ${firstName}'s assistant. Ask me anything about his work, skills or availability.`;

// Reply when no keyword matches (placeholder until the real /api/chat backend ships).
export const chatFallback = (fullName: string) =>
  `I'm a placeholder assistant for now. Soon I'll answer anything about ${fullName}'s experience, projects and skills. Try one of the suggestions below.`;
