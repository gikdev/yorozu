using ErrorOr;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ChangeTodo;

public record ChangeTodoCommand : IRequest<ErrorOr<Todo>> {
    public required Guid Id { get; init; }
    public required string? Title { get; init; }
    public required ObjectValueOfNullableString? Context { get; init; }
    public required ObjectValueOfNullableString? Project { get; init; }
    public required ObjectValueOfNullableInt? Time { get; init; }
    public required ObjectValueOfNullableString? Tag { get; init; }
    public required EnergyLevel? EnergyLevel { get; init; }
    public required TodoBucket? Bucket { get; init; }
    public required bool? IsImportant { get; init; }
    public required bool? IsUrgent { get; init; }
    public required bool? IsDone { get; init; }
    public required bool? IsArchived { get; init; }
}

public record ObjectValue<T> {
    public required T Value { get; init; }
}

public sealed record ObjectValueOfNullableString : ObjectValue<string?>;
public sealed record ObjectValueOfNullableInt : ObjectValue<int?>;
