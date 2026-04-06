/**
 * Skill: summarize tasks.
 * A skill should do ONE thing well and return data the agent can use.
 */
function summarizeSkill(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return "No tasks were provided.";
  }

  const total = tasks.length;
  const byPriority = { high: 0, medium: 0, low: 0 };

  for (const task of tasks) {
    const p = (task.priority || "").toLowerCase();
    if (byPriority[p] !== undefined) {
      byPriority[p] += 1;
    }
  }

  return [
    `Total tasks: ${total}`,
    `High priority: ${byPriority.high}`,
    `Medium priority: ${byPriority.medium}`,
    `Low priority: ${byPriority.low}`
  ].join(" | ");
}

module.exports = {
  summarizeSkill
};
