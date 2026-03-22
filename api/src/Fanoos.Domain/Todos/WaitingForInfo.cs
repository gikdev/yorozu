namespace Fanoos.Domain.Todos;

/// <summary>
/// Represents the specific details regarding what a task is waiting for.
/// Used to track delegated tasks or blocked items.
/// </summary>
public sealed record WaitingForInfo {
    /// <summary>
    /// Describes what is being awaited (e.g., "Reply from John", "Invoice received").
    /// </summary>
    public required string Description { get; init; }

    /// <summary>
    /// The timestamp when the status of this waiting item should be reviewed or followed up on.
    /// </summary>
    public required DateTimeOffset ReviewAt { get; init; }
}
