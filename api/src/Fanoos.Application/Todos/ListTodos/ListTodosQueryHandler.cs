using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ListTodos;

internal sealed class ListTodosQueryHandler(
    ITodoRepository todoRepository
) : IRequestHandler<ListTodosQuery, List<Todo>> {
    public async Task<List<Todo>> Handle(ListTodosQuery request, CancellationToken cancellationToken) {
        List<Todo> todos = await todoRepository.ListAsync(request, cancellationToken);

        return todos;
    }
}
