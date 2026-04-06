# Agents

## What Is an Agent?

An **Agent** is the orchestrator — the "brain" of the system. It reads its Instructions, calls Skills in the right order, and assembles a final result. Agents coordinate work; they don't do the work themselves.

## Analogy

Think of an Agent like a project manager. The PM doesn't write the code (that's the developer/skill), and they don't invent the company's rules (that's the handbook/instructions). They read the handbook, decide who to assign work to, and make sure everything comes together.

## How `taskAgent.js` Works

```
1. Load Instructions  →  agentInstructions.js
2. Receive input      →  raw task list
3. Call skill #1      →  summarizeSkill  (as defined in skillPipeline)
4. Call skill #2      →  prioritizeSkill (as defined in skillPipeline)
5. Format output      →  following outputFormat rules from Instructions
6. Return report      →  final string for display
```

## Key Patterns

### Skill Registry
The agent uses a registry object to map skill names (strings in Instructions) to actual functions. This means Instructions can reference skills by name without tight coupling.

```js
const SKILL_REGISTRY = {
  summarize: summarizeSkill,
  prioritize: prioritizeSkill,
};
```

### Pipeline Loop
The agent iterates over `instructions.skillPipeline` — so changing the order or adding skills requires only an Instructions change, not an Agent code change.

```js
for (const skillName of agentInstructions.skillPipeline) {
  data = SKILL_REGISTRY[skillName](data);
}
```

## What the Agent Does NOT Do

- It does **not** contain summarization logic (that's `summarizeSkill`)
- It does **not** contain prioritization logic (that's `prioritizeSkill`)
- It does **not** define its own rules (those come from `agentInstructions`)

## The Three-Layer Model

```
┌─────────────────────────────────────────┐
│  Instructions  (config / rules / style) │  ← passive, declarative
├─────────────────────────────────────────┤
│  Agent         (orchestrator / glue)    │  ← reads config, calls skills
├─────────────────────────────────────────┤
│  Skills        (logic / execution)      │  ← do the actual work
└─────────────────────────────────────────┘
```
