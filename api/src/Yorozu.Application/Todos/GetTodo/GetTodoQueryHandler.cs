using ErrorOr;
using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.GetTodo;

internal sealed class GetTodoQueryHandler(
    ITodoRepository todoRepository
) : IRequestHandler<GetTodoQuery, ErrorOr<Todo>> {
    public async Task<ErrorOr<Todo>> Handle(GetTodoQuery request, CancellationToken cancellationToken) {
        Todo? todo = await todoRepository.GetOneByIdAsync(request.Id, cancellationToken);

        if (todo is null) {
            return Error.NotFound(description: "Todo not found.");
        }

        return todo;
    }
}
