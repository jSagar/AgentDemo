using System;
using System.Collections.Generic;
using System.Linq;

namespace SimpleAgent;

/// <summary>
/// Represents a tiny, composable agent that routes user input to the correct skill.
/// This file exists to show the "agent" part of the architecture:
/// it does orchestration, not domain work.
/// </summary>
/// <remarks>
/// <para>
/// The agent depends on two core building blocks:
/// </para>
/// <list type="bullet">
/// <item><description><see cref="AgentInstructions"/> to define persona and policy context.</description></item>
/// <item><description>A list of <see cref="ISkill"/> implementations to execute concrete behaviors.</description></item>
/// </list>
/// <para>
/// In other words, instructions shape behavior boundaries, while skills provide capabilities.
/// </para>
/// </remarks>
public sealed class SimpleAgent
{
    private readonly AgentInstructions _instructions;
    private readonly IReadOnlyList<ISkill> _skills;

    /// <summary>
    /// Creates a new <see cref="SimpleAgent"/> with explicit instructions and skill set.
    /// </summary>
    /// <param name="instructions">
    /// High-level agent configuration (persona, system prompt, allowed skills).
    /// </param>
    /// <param name="skills">
    /// Concrete capabilities the agent can invoke while handling user input.
    /// </param>
    public SimpleAgent(AgentInstructions instructions, IEnumerable<ISkill> skills)
    {
        _instructions = instructions ?? throw new ArgumentNullException(nameof(instructions));
        _skills = skills?.ToList() ?? throw new ArgumentNullException(nameof(skills));
    }

    /// <summary>
    /// Runs one agent turn by selecting the first skill that can handle the user input.
    /// </summary>
    /// <param name="userInput">Raw text input from the user.</param>
    /// <returns>The selected skill's output, or a fallback if no skill can handle the input.</returns>
    public string Run(string userInput)
    {
        if (string.IsNullOrWhiteSpace(userInput))
        {
            return $"{_instructions.PersonaName}: Please share a question or request.";
        }

        foreach (var skill in _skills)
        {
            var isAllowed = _instructions.AllowedSkillNames.Contains(skill.Name, StringComparer.OrdinalIgnoreCase);
            if (isAllowed && skill.CanHandle(userInput))
            {
                return skill.Execute(userInput);
            }
        }

        return $"{_instructions.PersonaName}: I do not have a skill for that yet. Try saying hello or asking about weather.";
    }
}
