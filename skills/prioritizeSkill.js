/**
 * SKILL: prioritizeSkill
 * ======================
 * Another focused skill — this one takes summarized tasks and assigns
 * each a priority score, then sorts them so the most important work
 * rises to the top.
 *
 * Notice that this skill:
 *   - Doesn't know about the agent that called it
 *   - Doesn't know about the summarizeSkill
 *   - Only cares about its own job: scoring and sorting tasks
 *
 * The Agent (not the skill) is responsible for calling the two skills
 * in the right order and combining their outputs.
 */

// Priority scores for each urgency level (higher = more urgent)
const URGENCY_SCORE = {
  critical: 40,
  high: 30,
  medium: 20,
  low: 10,
};

// Impact scores (higher = more valuable to the team)
const IMPACT_SCORE = {
  high: 30,
  medium: 20,
  low: 10,
};

// Status penalties — blocked tasks get a lower effective priority
const STATUS_PENALTY = {
  blocked: -15,
  "in-progress": 5,
  open: 0,
  done: -99, // Completed tasks sink to the bottom
};

/**
 * Scores and sorts tasks by urgency (primary) and impact (secondary).
 *
 * @param {Array<{id: number, title: string, summary: string, status: string, urgency: string, impact: string}>} tasks
 * @returns {Array<{id: number, title: string, summary: string, status: string, priorityScore: number, rank: number}>}
 */
function prioritizeSkill(tasks) {
  console.log(`  [prioritizeSkill] Scoring and ranking ${tasks.length} tasks...`);

  const scored = tasks.map((task) => {
    const urgency = URGENCY_SCORE[task.urgency] ?? 0;
    const impact = IMPACT_SCORE[task.impact] ?? 0;
    const statusMod = STATUS_PENALTY[task.status] ?? 0;
    const priorityScore = urgency + impact + statusMod;

    return { ...task, priorityScore };
  });

  // Sort descending by score; tasks with equal scores keep their original order
  const ranked = scored
    .slice()
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .map((task, index) => ({ ...task, rank: index + 1 }));

  return ranked;
}

module.exports = prioritizeSkill;
