using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.ListTodos;

public sealed record ListTodosQuery(
    OrganizeTodosDto OrganizeTodosDto
) : IRequest<List<Todo>>;
