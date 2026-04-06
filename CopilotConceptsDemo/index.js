const { AGENT_INSTRUCTIONS } = require("./instructions/agentInstructions");
const { runTaskAgent } = require("./agents/taskAgent");

// Hardcoded mock data for demo purposes.
const mockTasks = [
  { title: "Prepare sprint demo slides", priority: "high" },
  { title: "Refactor logging utility", priority: "medium" },
  { title: "Clean up old branches", priority: "low" },
  { title: "Fix onboarding bug", priority: "high" }
];

const goal = "Summarize and prioritize my tasks";

console.log("=== Copilot Concepts Demo ===\n");

console.log("1) Instructions Layer");
console.log(AGENT_INSTRUCTIONS);
console.log("\n--------------------------------\n");

console.log("2) Agent Execution");
const result = runTaskAgent({
  goal,
  tasks: mockTasks,
  instructions: AGENT_INSTRUCTIONS
});

console.log("Agent Plan:");
result.plan.forEach((step, i) => console.log(`- ${i + 1}. ${step}`));

console.log("\nSkills Used:");
console.log(`- summarizeSkill => ${result.skillOutputs.summary}`);
console.log(
  `- prioritizeSkill => returned ${result.skillOutputs.prioritized.length} sorted tasks`
);

console.log("\n--------------------------------\n");
console.log("3) Final Agent Response");
console.log(result.finalResponse);
