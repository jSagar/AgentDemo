# SimpleAgent (C# .NET 8)

This folder demonstrates a **complete, minimal agent pattern** in C#. The project is intentionally small and heavily documented so each file explains its own architectural role.

## Files and Their Purpose

- `SimpleAgent.cs`
  - Defines the orchestration class (`SimpleAgent`).
  - Accepts `AgentInstructions` and a list of `ISkill` implementations.
  - Routes user input to the first allowed skill that can handle it.

- `ISkill.cs`
  - Defines the `ISkill` contract (`CanHandle`, `Execute`, and `Name`).
  - Provides `SkillBase` abstract class with shared keyword-matching logic.
  - Includes two concrete skills:
    - `GreetingSkill` for greetings (`hello`, `hi`)
    - `WeatherSkill` for weather-related input (`weather`)

- `AgentInstructions.cs`
  - Defines configuration that shapes the agent's behavior.
  - Includes persona name, system prompt, and allowed skill names.
  - Provides `CreateDefault()` factory method for quick startup.

- `Program.cs`
  - Console entry point for running the sample with `dotnet run`.
  - Builds the instruction object, registers skills, and runs an input loop.

- `SimpleAgent.csproj`
  - .NET project file targeting **.NET 8**.

## Dependency Flow

```text
+---------------------+
|  AgentInstructions  |
|  (persona, policy)  |
+----------+----------+
           |
           v
+---------------------+
|     SimpleAgent     |
| (routing engine)    |
+----------+----------+
           |
           v
+---------------------+
| ISkill Implementors |
| Greeting, Weather   |
+---------------------+
```

Flow summary: `AgentInstructions --> SimpleAgent --> ISkill implementations`.

## How to Run

From this folder:

```bash
dotnet run
```

Example inputs:
- `hello`
- `hi there`
- `what is the weather today?`

Type `exit` to quit.

## Skill Routing Table

| Example input                        | Matching skill  | Response style |
|--------------------------------------|-----------------|----------------|
| `hello`                              | `GreetingSkill` | Friendly greet |
| `hi agent`                           | `GreetingSkill` | Friendly greet |
| `what's the weather?`                | `WeatherSkill`  | Weather demo   |
| `tell me a joke`                     | none            | Fallback reply |

## How It All Fits Together

1. `Program.cs` calls `AgentInstructions.CreateDefault()` to get a default persona and policy.
2. `Program.cs` creates concrete skill instances (`GreetingSkill`, `WeatherSkill`).
3. `Program.cs` constructs `SimpleAgent` with those instructions + skills.
4. User types a message in the console.
5. `SimpleAgent.Run()` loops through all skills in order.
6. For each skill, the agent checks:
   - Is this skill name allowed by `AgentInstructions`?
   - Can this skill handle the specific input (`CanHandle`)?
7. First skill that passes both checks executes and returns text.
8. If no skill can handle input, the agent emits a fallback response.

This pattern cleanly separates **policy/configuration** (instructions), **orchestration** (agent), and **capabilities** (skills).
