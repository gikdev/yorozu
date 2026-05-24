using ErrorOr;
using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.GetTodo;

public sealed record GetTodoQuery(
    Guid Id
) : IRequest<ErrorOr<Todo>>;
