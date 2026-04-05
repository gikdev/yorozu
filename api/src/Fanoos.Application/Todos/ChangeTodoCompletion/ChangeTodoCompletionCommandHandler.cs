
using ErrorOr;
using Fanoos.Common.Data;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.ChangeTodoCompletion;

internal sealed class ChangeTodoCompletionCommandHandler(
    ITodoRepository todoRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ChangeTodoCompletionCommand, ErrorOr<Todo>> {
    public async Task<ErrorOr<Todo>> Handle(ChangeTodoCompletionCommand request, CancellationToken cancellationToken) {
        Todo? todo = await todoRepository.GetOneByIdAsync(request.Id, cancellationToken);

        if (todo is null) return Error.NotFound(description: "Task was not found");

        switch (request.CompletionChangeAction) {
            case TodoCompletionChangeAction.Toggle:
                todo.ToggleDone();
                break;

            case TodoCompletionChangeAction.MarkDone:
                todo.MarkDone();
                break;

            case TodoCompletionChangeAction.MarkNotDone:
                todo.MarkUndone();
                break;

            default:
                break;
        }

        await todoRepository.UpdateAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return todo;
    }
}

