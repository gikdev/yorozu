using System.Text.Json.Serialization;

namespace Fanoos.Domain.Todos;

/// <summary>
/// Represents the category or stage of the task, typically based on GTD (Getting Things Done) methodology.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoBucket {
    /// <summary>
    /// The task has not yet been sorted into a specific category.
    /// </summary>
    Uncategorized = 0,

    /// <summary>
    /// An actionable task that can be done.
    /// </summary>
    NextActions = 1,

    /// <summary>
    /// A task that is currently blocked or delegated, waiting for an external response or event before proceeding.
    /// </summary>
    Waiting = 2,

    /// <summary>
    /// Tasks that are not actionable now and may be tackled later.
    /// These are ideas or aspirations that do not have a specific deadline.
    /// </summary>
    SomedayMaybe = 3,
}
