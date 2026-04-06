# Instructions

## What Are Instructions?

**Instructions** configure how an Agent thinks and behaves. They are the "system prompt" or "job description" layer — they don't execute logic themselves, but they shape every decision the Agent makes.

## Analogy

Think of Instructions like an employee handbook or a job description. The employee (Agent) reads it once at the start and then applies those rules throughout their work.

## What Instructions Define

| Property | Purpose |
|---|---|
| `role` | The agent's identity/job title |
| `purpose` | Plain-language description of the agent's goal |
| `rules` | Constraints and behavioral guidelines |
| `skillPipeline` | Which skills to use, and in what order |
| `outputFormat` | How results should be presented |

## Key Principle

Instructions are **declarative** — they describe *what* the agent should do and *how* it should behave, not *how to execute* a specific task. The actual execution logic lives in Skills.

## Example

```js
const agentInstructions = {
  role: "Task Manager Agent",
  rules: [
    "Always summarize tasks before prioritizing them.",
    "Prioritize by urgency first, then by impact.",
  ],
  skillPipeline: ["summarize", "prioritize"],
};
```

## How It Fits Together

```
Instructions  →  configure  →  Agent
Agent         →  calls      →  Skills
Skills        →  return     →  results to Agent
Agent         →  formats    →  final output (per Instructions)
```
