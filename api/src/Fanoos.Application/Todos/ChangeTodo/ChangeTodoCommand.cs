#pragma warning disable CA1002 // Do not expose generic lists

using ErrorOr;
using Fanoos.Common.Dto;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ChangeTodo;

public record ChangeTodoCommand : IRequest<ErrorOr<Todo>> {
    public required Guid Id { get; init; }
    public required string? Title { get; init; }
    public required StringNullObject? Why { get; init; }
    public required StringNullObject? Description { get; init; }
    public required bool? IsDone { get; init; }
    public required ByteNullObject? EstimatedPomodoros { get; init; }
    public required bool? IsUrgent { get; init; }
    public required DateTimeOffsetNullObject? DueDate { get; init; }
    public required List<string>? Contexts { get; init; }
    public required TodoPriority? Priority { get; init; }
    public required TodoEffortType? EffortType { get; init; }
    public required EnergyLevel? EnergyLevel { get; init; }
    public required TodoBucket? Bucket { get; init; }
    public required WaitingForInfoNullObject? WaitingForInfo { get; init; }
}

public sealed record WaitingForInfoNullObject : NullObject<WaitingForInfo?>;
