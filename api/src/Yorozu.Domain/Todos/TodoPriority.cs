#pragma warning disable CA1707 // Identifiers should not contain underscores
using System.Text.Json.Serialization;

namespace Yorozu.Domain.Todos;

/// <summary>
/// Represents the priority classification of a to_do item using the ABCDE prioritization method.
/// </summary>
/// <remarks>
/// The ABCDE method categorizes tasks based on importance and consequences:
/// <list type="bullet">
/// <item><description><c>A_MustDo</c> – Critical tasks with serious consequences if not completed.</description></item>
/// <item><description><c>B_ShouldDo</c> – Important tasks with mild consequences if delayed.</description></item>
/// <item><description><c>C_NiceToDo</c> – Optional tasks with no significant consequences.</description></item>
/// <item><description><c>D_Delegate</c> – Tasks that should be delegated to someone else if possible.</description></item>
/// <item><description><c>E_Eliminate</c> – Tasks that provide little or no value and should be removed.</description></item>
/// </list>
/// </remarks>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoPriority {
    Unknown = 0,
    A_MustDo = 1,
    B_ShouldDo = 2,
    C_NiceToDo = 3,
    D_Delegate = 4,
    E_Eliminate = 5,
}
