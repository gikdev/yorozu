using ErrorOr;
using Yorozu.Common.Data;
using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.DeleteTodo;

internal sealed class DeleteTodoCommandHandler(
    ITodoRepository todoRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteTodoCommand, ErrorOr<Deleted>> {
    public async Task<ErrorOr<Deleted>> Handle(DeleteTodoCommand request, CancellationToken cancellationToken) {
        Todo? todo = await todoRepository.GetOneByIdAsync(request.Id, cancellationToken);

        if (todo is null) {
            return Error.NotFound(description: "Todo not found.");
        }

        await todoRepository.RemoveAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Deleted;
    }
}
