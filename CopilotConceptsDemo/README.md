# CopilotConceptsDemo

A lightweight Node.js demo that helps teams clearly understand the difference between **Agents**, **Skills**, and **Instructions**.

---

## What This Demo Teaches

### 1) Agents
An **Agent** is an autonomous AI component that can:
- Interpret a high-level goal
- Plan multi-step actions
- Call skills/tools
- Combine outputs into a final response

In this demo, the agent lives in `agents/taskAgent.js`.

### 2) Skills
A **Skill** is a focused capability the agent can call.
- Skills are intentionally small and reusable
- They do one job each
- The agent orchestrates when and how they are used

In this demo, skills live in `skills/`:
- `summarizeSkill.js`
- `prioritizeSkill.js`

### 3) Instructions
**Instructions** are the behavioral rules/persona that shape how the agent responds.
- Think of these as a system prompt or policy layer
- Instructions influence style and constraints
- Instructions are separate from business logic

In this demo, instructions live in `instructions/agentInstructions.js`.

---

## Project Structure

```text
CopilotConceptsDemo/
├── README.md
├── package.json
├── agents/
│   ├── README.md
│   └── taskAgent.js
├── skills/
│   ├── README.md
│   ├── summarizeSkill.js
│   └── prioritizeSkill.js
├── instructions/
│   ├── README.md
│   └── agentInstructions.js
└── index.js
```

---

## How It Works (Flow)

1. `index.js` loads instruction text from `instructions/agentInstructions.js`
2. `index.js` sends a goal + mock tasks + instructions to `agents/taskAgent.js`
3. The agent builds a mini-plan
4. The agent calls:
   - `summarizeSkill(tasks)`
   - `prioritizeSkill(tasks)`
5. The agent returns a final response influenced by instructions
6. `index.js` prints all layers to the console

---

## Run the Demo

```bash
cd CopilotConceptsDemo
npm install
npm start
```

> Note: There are no external dependencies; `npm install` is just standard setup.

---

## Suggested Team Discussion Prompts

- If we changed instructions, which files should remain untouched?
- If we add a new capability (e.g., "estimate effort"), is that an agent or a skill?
- If we swap the agent but keep skills, what still works?

This separation is the key idea: **Instructions set behavior, skills provide capabilities, agents orchestrate reasoning and execution.**
