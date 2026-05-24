using ErrorOr;
using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.CreateTodo;

public record CreateTodoCommand : IRequest<ErrorOr<Todo>> {
    public required string Title { get; init; }
    public required string? Description { get; init; }
    public required string? Why { get; init; }
    public required byte? PomodoroEstimate { get; init; }
    public required bool? IsUrgent { get; init; }
    public required bool? IsDone { get; init; }
    public required DateTimeOffset? DueDate { get; init; }
    public required IEnumerable<string>? Contexts { get; init; }
    public required TodoPriority? Priority { get; init; }
    public required TodoEffortType? EffortType { get; init; }
    public required EnergyLevel? EnergyLevel { get; init; }
    public required TodoBucket? Bucket { get; init; }
    public required WaitingForInfo? WaitingForInfo { get; init; }
}
