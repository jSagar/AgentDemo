using System;
using System.Collections.Generic;

namespace SimpleAgent;

internal static class Program
{
    private static void Main()
    {
        var instructions = AgentInstructions.CreateDefault();
        var skills = new List<ISkill>
        {
            new GreetingSkill(),
            new WeatherSkill()
        };

        var agent = new SimpleAgent(instructions, skills);

        Console.WriteLine("SimpleAgent Demo (type 'exit' to quit)");
        while (true)
        {
            Console.Write("> ");
            var input = Console.ReadLine() ?? string.Empty;

            if (input.Equals("exit", StringComparison.OrdinalIgnoreCase))
            {
                break;
            }

            var output = agent.Run(input);
            Console.WriteLine(output);
        }
    }
}
