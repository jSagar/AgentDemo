/**
 * Skill: prioritize tasks.
 * Sorts tasks by priority order: high -> medium -> low.
 */
function prioritizeSkill(tasks) {
  if (!Array.isArray(tasks)) {
    return [];
  }

  const order = { high: 1, medium: 2, low: 3 };

  // Return a new sorted array (do not mutate input).
  return [...tasks].sort((a, b) => {
    const aRank = order[(a.priority || "").toLowerCase()] || 99;
    const bRank = order[(b.priority || "").toLowerCase()] || 99;
    return aRank - bRank;
  });
}

module.exports = {
  prioritizeSkill
};
