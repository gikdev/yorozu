using ErrorOr;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.DeleteTodo;

public sealed record DeleteTodoCommand(
    Guid Id
) : IRequest<ErrorOr<Deleted>>;
