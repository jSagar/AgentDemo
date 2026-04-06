# Skills

## What Are Skills?

**Skills** are focused, reusable functions that each do **one thing well**. They contain the actual execution logic — they know *how* to perform a specific task. The Agent decides *when* to call them.

## Analogy

Think of Skills like tools in a toolbox. A hammer drives nails; a screwdriver turns screws. Each tool is specialized. The person using the tools (the Agent) decides which tool to pick up and when.

## Skills in This Demo

### `summarizeSkill.js`
- **Input:** Raw task list
- **Output:** Same task list, each item with a one-sentence `summary` field added
- **Does NOT know:** anything about priority, output format, or the agent

### `prioritizeSkill.js`
- **Input:** Summarized task list (from `summarizeSkill`)
- **Output:** Same list sorted by `priorityScore`, with a `rank` field added
- **Does NOT know:** anything about summaries, the agent, or how the output will be displayed

## Key Properties of Skills

| Property | Description |
|---|---|
| **Single-purpose** | Each skill does exactly one thing |
| **Reusable** | Any agent (or app) can call the same skill |
| **Stateless** | No memory between calls — only input → output |
| **Composable** | Skills can be chained: output of one becomes input of the next |

## Skills vs Instructions vs Agents

| Concept | Contains Logic? | Knows About Other Components? | Owns the Workflow? |
|---|---|---|---|
| Instructions | No | No | No |
| **Skills** | **Yes** | **No** | **No** |
| Agent | Minimal | Yes | Yes |

## Example

```js
// A skill just takes input and returns output — clean and simple
function summarizeSkill(tasks) {
  return tasks.map(task => ({
    ...task,
    summary: `${task.title}: ${task.description}`,
  }));
}
```
