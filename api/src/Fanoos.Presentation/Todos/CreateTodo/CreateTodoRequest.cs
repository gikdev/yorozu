using Fanoos.Domain.Todos;

namespace Fanoos.Presentation.Todos.CreateTodo;

internal sealed record CreateTodoRequest {
    public required string Title { get; init; }
    public string? Description { get; init; }
    public string? Why { get; init; }
    public byte? PomodoroEstimate { get; init; }
    public bool? IsUrgent { get; init; }
    public bool? IsDone { get; init; }
    public DateTimeOffset? DueDate { get; init; }
    public IEnumerable<string>? Contexts { get; init; }
    public TodoPriority? Priority { get; init; }
    public TodoEffortType? EffortType { get; init; }
    public EnergyLevel? EnergyLevel { get; init; }
    public TodoBucket? Bucket { get; init; }
    public WaitingForInfo? WaitingForInfo { get; init; }
}
