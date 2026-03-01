using ErrorOr;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ChangeTodo;

public record ChangeTodoCommand : IRequest<ErrorOr<Todo>> {
    public required Guid Id { get; init; }
    public required string? RawTitle { get; init; }
    public required bool? IsDone { get; init; }
    public required bool? IsArchived { get; init; }
}
