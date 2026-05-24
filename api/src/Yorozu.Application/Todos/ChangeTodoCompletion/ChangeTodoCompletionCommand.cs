using ErrorOr;
using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.ChangeTodoCompletion;

public sealed class ChangeTodoCompletionCommand : IRequest<ErrorOr<Todo>> {
    public required Guid Id { get; init; }
    public required TodoCompletionChangeAction CompletionChangeAction { get; init; }
}
