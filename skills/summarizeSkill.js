/**
 * SKILL: summarizeSkill
 * =====================
 * Skills are focused, reusable functions that do ONE thing well.
 * They contain the actual logic — they know HOW to perform a specific task.
 *
 * This skill takes a list of tasks and returns a one-sentence summary for each.
 * It has no knowledge of the agent, no knowledge of other skills, and no
 * opinion about priority or output format. It just summarizes.
 *
 * Skills are:
 *   - Single-purpose (this one only summarizes)
 *   - Reusable (any agent could call this skill)
 *   - Stateless (no memory between calls)
 *   - Input/output driven (takes tasks, returns summaries)
 */

/**
 * Summarizes each task into a single human-readable sentence.
 *
 * @param {Array<{id: number, title: string, description: string, status: string}>} tasks
 * @returns {Array<{id: number, title: string, summary: string, status: string}>}
 */
function summarizeSkill(tasks) {
  console.log(`  [summarizeSkill] Summarizing ${tasks.length} tasks...`);

  return tasks.map((task) => {
    // Build a concise one-sentence summary combining title and description
    const summary = `${task.title}: ${task.description.trim().replace(/\.$/, "")}.`;

    // Spread all original task fields so downstream skills (e.g. prioritizeSkill)
    // still have access to urgency, impact, and any other properties.
    return {
      ...task,
      summary,
    };
  });
}

module.exports = summarizeSkill;
