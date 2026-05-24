using System.Text.Json.Serialization;

namespace Yorozu.Domain.Todos;

/// <summary>
/// Categorizes the task based on the user's emotional resistance or difficulty.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoEffortType {
    /// <summary>
    /// The effort type has not been determined.
    /// </summary>
    Unknown = 0,

    /// <summary>
    /// Represents a task that is easy, enjoyable, or low-stress.
    /// Often referred to as "Eating the cake" (a reward or simple task).
    /// </summary>
    Cake = 1,

    /// <summary>
    /// Represents a difficult, complex, or anxiety-inducing task.
    /// Based on the concept of "Eating the frog" (doing the hardest task first to overcome procrastination).
    /// </summary>
    Frog = 2,
}
