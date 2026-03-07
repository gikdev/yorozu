using ErrorOr;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.CreateTodo;

public record CreateTodoCommand : IRequest<ErrorOr<Todo>> {
    public required RawTodoPayload? RawTodoPayload { get; init; }
    public required NormalTodoPayload? NormalTodoPayload { get; init; }

}

public record RawTodoPayload {
    public required string RawInput { get; init; }
}

public record NormalTodoPayload {
    public required string Title { get; init; }
    public required string? Context { get; init; }
    public required string? Project { get; init; }
    public required int? Time { get; init; }
    public required string? Tag { get; init; }
    public required EnergyLevel? EnergyLevel { get; init; }
    public required TodoBucket? Bucket { get; init; }
    public required bool? IsImportant { get; init; }
    public required bool? IsUrgent { get; init; }
    public required bool? IsDone { get; init; }
}
