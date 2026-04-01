using Fanoos.Common.Dto;
using Fanoos.Domain.Todos;


namespace Fanoos.Presentation.Todos.ChangeTodo;

internal sealed record ChangeTodoRequest {
    public string? Title { get; init; }
    public StringNullObject? Why { get; init; }
    public StringNullObject? Description { get; init; }
    public bool? IsDone { get; init; }
    public ByteNullObject? EstimatedPomodoros { get; init; }
    public bool? IsUrgent { get; init; }
    public DateTimeOffsetNullObject? DueDate { get; init; }
    public List<string>? Contexts { get; init; }
    public TodoPriority? Priority { get; init; }
    public TodoEffortType? EffortType { get; init; }
    public EnergyLevel? EnergyLevel { get; init; }
    public TodoBucket? Bucket { get; init; }
    public WaitingForRequestNullObject? WaitingForInfo { get; init; }
}
