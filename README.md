# CopilotConceptsDemo

A simple Node.js demo that helps teams understand the difference between **GitHub Copilot Agents**, **Skills**, and **Instructions** — and how they work together.

## Quick Start

```bash
node index.js
```

No dependencies. No external APIs. Just plain Node.js.

---

## The Three Concepts

### Instructions
> *"What should the agent do, and how should it behave?"*

Instructions are the **configuration layer**. They define the agent's role, rules, skill pipeline, and output preferences. Instructions are declarative — they don't contain execution logic.

```
instructions/
└── agentInstructions.js   ← role, rules, skillPipeline, outputFormat
```

### Skills
> *"How do I perform this one specific task?"*

Skills are **focused, reusable functions** that each do one thing well. They contain the actual logic. Skills don't know about each other or about the agent — they just take input and return output.

```
skills/
├── summarizeSkill.js      ← takes tasks, returns tasks with a summary field
└── prioritizeSkill.js     ← takes tasks, returns tasks sorted by priority score
```

### Agent
> *"I'll read my instructions and call the right skills to get the job done."*

The Agent is the **orchestrator**. It reads its Instructions, calls Skills in the defined order (the pipeline), and formats the final result according to the output rules in Instructions.

```
agents/
└── taskAgent.js           ← reads Instructions, calls Skills, formats output
```

---

## How They Work Together

```
┌──────────────────────────────────────────────────────────┐
│                        index.js                          │
│                  (provides mock task data)               │
└───────────────────────┬──────────────────────────────────┘
                        │ calls runTaskAgent(tasks)
                        ▼
┌──────────────────────────────────────────────────────────┐
│                    taskAgent.js                          │
│                                                          │
│  1. Loads  ──────────────────► agentInstructions.js      │
│            (role, rules,        (config / behavioral     │
│             skillPipeline,       rules / output prefs)   │
│             outputFormat)                                │
│                                                          │
│  2. Calls  ──────────────────► summarizeSkill.js         │
│            (passes tasks)       (adds summary field)     │
│                                                          │
│  3. Calls  ──────────────────► prioritizeSkill.js        │
│            (passes summaries)   (scores + sorts tasks)   │
│                                                          │
│  4. Formats output per Instructions rules                │
│  5. Returns final report string                          │
└──────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
CopilotConceptsDemo/
├── index.js                       ← entry point, mock data, runs the agent
├── package.json
├── README.md                      ← you are here
│
├── agents/
│   ├── taskAgent.js               ← the orchestrator
│   └── README.md                  ← explains what agents are
│
├── skills/
│   ├── summarizeSkill.js          ← skill #1: summarize tasks
│   ├── prioritizeSkill.js         ← skill #2: score and rank tasks
│   └── README.md                  ← explains what skills are
│
└── instructions/
    ├── agentInstructions.js       ← behavioral config for the agent
    └── README.md                  ← explains what instructions are
```

---

## Key Takeaways

| Concept | Role | Contains Logic? | Knows About Others? |
|---|---|---|---|
| **Instructions** | Config / rules | No | No |
| **Skills** | Execution / logic | Yes | No |
| **Agent** | Orchestration / glue | Minimal | Yes |

- **Instructions** configure the agent without containing execution logic
- **Skills** execute specific tasks without knowing about the agent or each other
- **Agents** coordinate everything — they read Instructions and call Skills in order

Changing the skill pipeline, adding a new rule, or swapping a skill requires changes in only **one place**, keeping the system easy to maintain and extend.
