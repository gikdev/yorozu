using ErrorOr;
using Fanoos.Common.Data;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ChangeTodo;

internal sealed class ChangeTodoCommandHandler(
    ITodoRepository todoRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ChangeTodoCommand, ErrorOr<Todo>> {
    public async Task<ErrorOr<Todo>> Handle(ChangeTodoCommand request, CancellationToken cancellationToken) {
        Todo? todo = await todoRepository.GetOneByIdAsync(request.Id, cancellationToken);

        if (todo is null) return Error.NotFound(description: "Task was not found");

        // TODO: FIX THESE!
        //if (request.RawTitle != null) {
        //    todo.UpdateFromRaw(request.RawTitle);
        //}

        //if (request.IsArchived != null) {
        //    todo.UpdateArchived(request.IsArchived);
        //}

        //if (request.IsDone != null) {
        //    todo.UpdateDone(request.IsDone);
        //}

        await todoRepository.UpdateAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return todo;
    }
}
