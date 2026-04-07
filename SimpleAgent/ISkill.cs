using System;

namespace SimpleAgent;

/// <summary>
/// Contract for all skills the agent can call.
/// This file defines how skills "plug in" to the agent runtime.
/// </summary>
public interface ISkill
{
    /// <summary>
    /// Human-readable skill name used by <see cref="AgentInstructions.AllowedSkillNames"/>.
    /// </summary>
    string Name { get; }

    /// <summary>
    /// Returns true when this skill can process the user's input.
    /// </summary>
    bool CanHandle(string input);

    /// <summary>
    /// Executes this skill's behavior and returns a text result.
    /// </summary>
    string Execute(string input);
}

/// <summary>
/// Base class with small shared helpers for string matching.
/// Skill authors can inherit this to avoid repeating boilerplate.
/// </summary>
public abstract class SkillBase : ISkill
{
    /// <inheritdoc />
    public abstract string Name { get; }

    /// <inheritdoc />
    public abstract bool CanHandle(string input);

    /// <inheritdoc />
    public abstract string Execute(string input);

    /// <summary>
    /// Utility matcher used by concrete skills to detect trigger keywords.
    /// </summary>
    protected static bool ContainsAny(string input, params string[] keywords)
    {
        foreach (var keyword in keywords)
        {
            if (input.Contains(keyword, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }
        }

        return false;
    }
}

/// <summary>
/// A concrete skill that handles simple greeting inputs like "hello" or "hi".
/// This demonstrates how conversational behavior can be isolated from the agent class.
/// </summary>
public sealed class GreetingSkill : SkillBase
{
    /// <inheritdoc />
    public override string Name => "GreetingSkill";

    /// <inheritdoc />
    public override bool CanHandle(string input) => ContainsAny(input, "hello", "hi");

    /// <inheritdoc />
    public override string Execute(string input) => "Hello! I'm your simple agent. How can I help today?";
}

/// <summary>
/// A concrete skill that handles weather-related inputs.
/// In a real application this would call a weather API, but this demo returns static guidance.
/// </summary>
public sealed class WeatherSkill : SkillBase
{
    /// <inheritdoc />
    public override string Name => "WeatherSkill";

    /// <inheritdoc />
    public override bool CanHandle(string input) => ContainsAny(input, "weather");

    /// <inheritdoc />
    public override string Execute(string input) => "Weather check: It's sunny in this demo. Integrate an API for real forecasts.";
}
