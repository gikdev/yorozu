using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ListTodos;

public sealed record ListTodosQuery(
    OrganizeTodosDto OrganizeTodosDto
) : IRequest<List<Todo>>;
