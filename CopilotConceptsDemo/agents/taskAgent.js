const { summarizeSkill } = require("../skills/summarizeSkill");
const { prioritizeSkill } = require("../skills/prioritizeSkill");

/**
 * Demo Task Agent
 *
 * An "Agent" is responsible for:
 * 1) Interpreting a goal.
 * 2) Creating a plan.
 * 3) Calling skills/tools.
 * 4) Producing a final response.
 */
function runTaskAgent({ goal, tasks, instructions }) {
  // Step 1: Interpret the goal.
  const interpretedGoal = goal || "Summarize and prioritize my tasks";

  // Step 2: Build an explicit plan.
  const plan = [
    "Understand the task list",
    "Summarize current workload",
    "Prioritize tasks by urgency",
    "Return concise recommendations"
  ];

  // Step 3: Execute skills.
  const summary = summarizeSkill(tasks);
  const prioritized = prioritizeSkill(tasks);

  // Step 4: Format output (influenced by instructions).
  const bullets = prioritized.map(
    (task, index) => `- ${index + 1}. [${task.priority.toUpperCase()}] ${task.title}`
  );

  return {
    interpretedGoal,
    instructions,
    plan,
    skillOutputs: {
      summary,
      prioritized
    },
    finalResponse: [
      "Task manager result:",
      `- Goal: ${interpretedGoal}`,
      `- Summary: ${summary}`,
      "- Recommended order:",
      ...bullets
    ].join("\n")
  };
}

module.exports = {
  runTaskAgent
};
