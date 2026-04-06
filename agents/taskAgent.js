/**
 * AGENT: taskAgent
 * ================
 * An Agent is the orchestrator — the "brain" that reads its Instructions,
 * decides what to do, and calls Skills in the right order to get the job done.
 *
 * The Agent itself contains minimal logic. Its job is coordination:
 *   1. Load its Instructions (behavioral config)
 *   2. Receive input (tasks)
 *   3. Call each skill in the pipeline defined by Instructions
 *   4. Format and return the final result (per Instructions output rules)
 *
 * The Agent does NOT contain summarization logic (that's summarizeSkill's job).
 * The Agent does NOT contain prioritization logic (that's prioritizeSkill's job).
 * The Agent does NOT define its own rules (those come from Instructions).
 *
 * This separation of concerns is the whole point:
 *   Instructions = config   (what to do, how to behave)
 *   Skills       = logic    (how to execute one specific thing)
 *   Agent        = glue     (reads config, calls logic, returns result)
 */

const agentInstructions = require("../instructions/agentInstructions");
const summarizeSkill = require("../skills/summarizeSkill");
const prioritizeSkill = require("../skills/prioritizeSkill");

// Map skill names (strings in Instructions) to actual skill functions.
// This lets Instructions reference skills by name without tight coupling.
const SKILL_REGISTRY = {
  summarize: summarizeSkill,
  prioritize: prioritizeSkill,
};

/**
 * Runs the Task Agent against a list of tasks.
 *
 * @param {Array<object>} tasks - Raw mock task data
 * @returns {string} Formatted report ready for display
 */
function runTaskAgent(tasks) {
  console.log(`\n[${agentInstructions.role}] Starting up...`);
  console.log(`[${agentInstructions.role}] Loaded instructions with ${agentInstructions.rules.length} rules.`);
  console.log(`[${agentInstructions.role}] Skill pipeline: ${agentInstructions.skillPipeline.join(" → ")}\n`);

  // ── Step 1: Run each skill in the order defined by Instructions ──────────
  let data = tasks;

  for (const skillName of agentInstructions.skillPipeline) {
    const skillFn = SKILL_REGISTRY[skillName];

    if (!skillFn) {
      console.warn(`  [${agentInstructions.role}] WARNING: Unknown skill "${skillName}" — skipping.`);
      continue;
    }

    console.log(`[${agentInstructions.role}] Calling skill: "${skillName}"`);
    data = skillFn(data);
  }

  // ── Step 2: Apply Instructions rules while formatting output ─────────────
  // Rule: "Never skip tasks" — we include all of them.
  // Rule: "Flag any task marked as 'blocked' with a warning."
  // Rule: "Show priority score" (from outputFormat config).

  const lines = [
    "=".repeat(60),
    `  ${agentInstructions.role.toUpperCase()} — TASK REPORT`,
    "=".repeat(60),
    "",
  ];

  for (const task of data) {
    const blockedWarning =
      agentInstructions.outputFormat.includeWarnings && task.status === "blocked"
        ? "  ⚠  WARNING: This task is BLOCKED"
        : "";

    const scoreLabel = agentInstructions.outputFormat.showPriorityScore
      ? ` (score: ${task.priorityScore})`
      : "";

    lines.push(`#${task.rank}${scoreLabel} — ${task.title}`);
    lines.push(`  Status  : ${task.status}`);
    lines.push(`  Summary : ${task.summary}`);
    if (blockedWarning) lines.push(blockedWarning);
    lines.push("");
  }

  lines.push("=".repeat(60));

  return lines.join("\n");
}

module.exports = { runTaskAgent };
