/**
 * CopilotConceptsDemo — index.js
 * ================================
 * Entry point for the demo. This file:
 *   1. Defines mock task data (no external APIs needed)
 *   2. Runs the Task Agent against that data
 *   3. Prints the result
 *
 * Run with: node index.js
 *
 * ──────────────────────────────────────────────────────────────
 * CONCEPTS RECAP
 * ──────────────────────────────────────────────────────────────
 *
 *  INSTRUCTIONS  →  Configuration layer. Defines the agent's role,
 *                   rules, skill pipeline, and output preferences.
 *                   File: instructions/agentInstructions.js
 *
 *  SKILLS        →  Logic layer. Each skill does ONE thing well.
 *                   They are reusable, stateless, and composable.
 *                   Files: skills/summarizeSkill.js
 *                          skills/prioritizeSkill.js
 *
 *  AGENT         →  Orchestration layer. Reads Instructions, calls
 *                   Skills in order, and formats the final output.
 *                   File: agents/taskAgent.js
 *
 * ──────────────────────────────────────────────────────────────
 */

const { runTaskAgent } = require("./agents/taskAgent");

// ── Mock Task Data ────────────────────────────────────────────────────────────
// In a real system this would come from a database, API, or user input.
// Here we use hardcoded data so the demo works with zero external dependencies.

const mockTasks = [
  {
    id: 1,
    title: "Fix login bug",
    description: "Users are unable to log in when 2FA is enabled.",
    status: "open",
    urgency: "critical",
    impact: "high",
  },
  {
    id: 2,
    title: "Update onboarding docs",
    description: "The getting-started guide is out of date since the v2 release.",
    status: "open",
    urgency: "low",
    impact: "medium",
  },
  {
    id: 3,
    title: "Migrate database to Postgres",
    description: "Move all production data from SQLite to Postgres for scalability.",
    status: "blocked",
    urgency: "high",
    impact: "high",
  },
  {
    id: 4,
    title: "Add dark mode to dashboard",
    description: "Implement a theme toggle so users can switch between light and dark mode.",
    status: "in-progress",
    urgency: "medium",
    impact: "low",
  },
  {
    id: 5,
    title: "Set up CI/CD pipeline",
    description: "Automate testing and deployment using GitHub Actions.",
    status: "open",
    urgency: "high",
    impact: "high",
  },
];

// ── Run the Agent ─────────────────────────────────────────────────────────────

console.log("CopilotConceptsDemo — Demonstrating Agents, Skills, and Instructions\n");
console.log("Concept Overview:");
console.log("  Instructions → configure the Agent's behavior and rules");
console.log("  Skills       → contain the actual task logic (summarize, prioritize)");
console.log("  Agent        → reads Instructions, calls Skills, returns result");
console.log("");

const report = runTaskAgent(mockTasks);

console.log("\n" + report);
