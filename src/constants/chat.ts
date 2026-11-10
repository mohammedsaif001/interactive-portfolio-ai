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
  `Hi! I'm ${firstName}'s assistant. Our full AI assistant is being upgraded right now, but I can still answer quick questions about his work, skills or availability.`;

// Reply when no keyword matches: the full AI assistant is offline for maintenance (until the real /api/chat backend ships).
export const chatFallback = (fullName: string) =>
  `Our AI assistant is undergoing scheduled maintenance and will be back soon. In the meantime I can still help with quick questions about ${fullName}'s experience, skills, projects or how to get in touch. Try one of the suggestions below.`;

// Status line in the chat header, next to the status dot.
export const chatStatus = "Quick answers · upgrade in progress";
