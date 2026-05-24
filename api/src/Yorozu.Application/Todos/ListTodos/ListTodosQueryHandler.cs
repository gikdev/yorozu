using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.ListTodos;

internal sealed class ListTodosQueryHandler(
    ITodoRepository todoRepository
) : IRequestHandler<ListTodosQuery, List<Todo>> {
    public async Task<List<Todo>> Handle(ListTodosQuery request, CancellationToken cancellationToken) {
        List<Todo> todos = await todoRepository.ListAsync(cancellationToken);

        todos = TodoService.OrganizeTodos(todos, request.OrganizeTodosDto);

        return todos;
    }
}
