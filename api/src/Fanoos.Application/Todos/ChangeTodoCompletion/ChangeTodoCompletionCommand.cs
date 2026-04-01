using ErrorOr;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ChangeTodoCompletion;

public sealed class ChangeTodoCompletionCommand : IRequest<ErrorOr<Todo>> {
    public required Guid Id { get; init; }
    public required TodoCompletionChangeAction CompletionChangeAction { get; init; }
}
