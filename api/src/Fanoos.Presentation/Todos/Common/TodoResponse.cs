using Fanoos.Domain.Todos;

namespace Fanoos.Presentation.Todos.Common;

internal sealed record TodoResponse {
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public required string? Why { get; init; }
    public required string? Description { get; init; }
    public required bool IsDone { get; init; }
    public required byte? EstimatedPomodoros { get; init; }
    public required bool IsUrgent { get; init; }
    public required DateTimeOffset? DueDate { get; init; }
    public required List<string> Contexts { get; init; }
    public required TodoPriority Priority { get; init; }
    public required TodoEffortType EffortType { get; init; }
    public required EnergyLevel EnergyLevel { get; init; }
    public required TodoBucket Bucket { get; init; }
    public required WaitingForResponse? WaitingForInfo { get; init; }
}
