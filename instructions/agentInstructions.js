/**
 * INSTRUCTIONS - What Are They?
 * ==============================
 * Instructions define HOW an agent should behave. They are the configuration
 * layer that gives the agent its personality, constraints, and decision-making
 * rules — without containing any actual logic themselves.
 *
 * Think of Instructions like a job description:
 *   - They tell the agent what its role is
 *   - They define what the agent is allowed (and not allowed) to do
 *   - They set the tone and style of the agent's responses
 *   - They list which skills the agent should use and when
 *
 * Instructions are read by the Agent at startup and shape every decision it makes.
 */

const agentInstructions = {
  // The agent's name and role definition
  role: "Task Manager Agent",

  // A plain-language description of what the agent is responsible for
  purpose: `
    You are a task management assistant. Your job is to help teams understand
    and prioritize their work. You receive a list of tasks and produce a
    human-readable summary with a prioritized action plan.
  `,

  // Rules that constrain the agent's behavior
  rules: [
    "Always summarize tasks before prioritizing them.",
    "Never skip tasks — every task must appear in the output.",
    "Prioritize tasks by urgency first, then by impact.",
    "Keep summaries concise: one sentence per task.",
    "Flag any task marked as 'blocked' with a warning.",
  ],

  // Which skills the agent is permitted to call, and in what order
  skillPipeline: ["summarize", "prioritize"],

  // Output format preferences
  outputFormat: {
    style: "plain-text",
    includeWarnings: true,
    showPriorityScore: true,
  },
};

module.exports = agentInstructions;
