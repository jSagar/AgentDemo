/**
 * Instructions represent the "system prompt" or policy layer.
 * They shape HOW the agent should behave, regardless of the task.
 */
const AGENT_INSTRUCTIONS = [
  "You are a helpful task manager.",
  "Always be concise.",
  "Prefer bullet points when presenting results.",
  "Explain your reasoning in plain language."
].join(" ");

module.exports = {
  AGENT_INSTRUCTIONS
};
