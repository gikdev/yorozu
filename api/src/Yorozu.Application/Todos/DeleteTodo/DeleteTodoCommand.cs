using ErrorOr;
using MediatR;

namespace Yorozu.Application.Todos.DeleteTodo;

public sealed record DeleteTodoCommand(
    Guid Id
) : IRequest<ErrorOr<Deleted>>;
