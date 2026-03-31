using ErrorOr;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.GetTodo;

public sealed record GetTodoQuery(
    Guid Id
) : IRequest<ErrorOr<Todo>>;
