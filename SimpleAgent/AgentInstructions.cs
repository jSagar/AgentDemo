using System.Collections.Generic;

namespace SimpleAgent;

/// <summary>
/// Holds high-level agent instructions that shape behavior before any skill runs.
/// This file exists to separate policy/persona configuration from runtime logic.
/// </summary>
/// <remarks>
/// The instructions influence the agent in two key ways:
/// 1) Persona and system prompt define the communication style.
/// 2) Allowed skill names constrain which <see cref="ISkill"/> implementations may execute.
/// </remarks>
public sealed class AgentInstructions
{
    /// <summary>
    /// Friendly persona name presented in fallback or system-facing messages.
    /// </summary>
    public string PersonaName { get; init; } = string.Empty;

    /// <summary>
    /// System-level guidance that describes the intended assistant behavior.
    /// </summary>
    public string SystemPrompt { get; init; } = string.Empty;

    /// <summary>
    /// List of skill names that are permitted to run.
    /// This links instructions to concrete skill implementations.
    /// </summary>
    public IReadOnlyList<string> AllowedSkillNames { get; init; } = new List<string>();

    /// <summary>
    /// Factory helper that returns a ready-to-use baseline instruction set.
    /// Use this to bootstrap a simple demo agent quickly.
    /// </summary>
    public static AgentInstructions CreateDefault()
    {
        return new AgentInstructions
        {
            PersonaName = "SimpleAgent",
            SystemPrompt = "You are a helpful demo agent. Route requests to available skills and reply clearly.",
            AllowedSkillNames = new List<string>
            {
                "GreetingSkill",
                "WeatherSkill"
            }
        };
    }
}
