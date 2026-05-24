using Yorozu.Domain.Todos;
using Yorozu.Presentation.Todos.Common;

namespace Yorozu.Presentation.Todos.ChangeTodo;

internal sealed record ChangeTodoRequest {
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
    public required WaitingForRequest? WaitingForInfo { get; init; }
}
