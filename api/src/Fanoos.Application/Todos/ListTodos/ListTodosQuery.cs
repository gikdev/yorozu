using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ListTodos;

public record ListTodosQuery : IRequest<List<Todo>> {
    public required bool IncludeArchived { get; init; }
}
