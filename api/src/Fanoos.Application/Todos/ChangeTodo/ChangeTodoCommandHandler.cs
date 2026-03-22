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

        if (request.Title != null) {
            todo.SetTitle(request.Title);
        }

        if (request.Context != null) {
            todo.SetContext(request.Context.Value);
        }

        if (request.Project != null) {
            todo.SetProject(request.Project.Value);
        }

        if (request.Time != null) {
            todo.SetTime(request.Time.Value);
        }

        if (request.Tag != null) {
            todo.SetTag(request.Tag.Value);
        }

        if (request.EnergyLevel != null) {
            todo.SetEnergyLevel(request.EnergyLevel.Value);
        }

        if (request.Bucket != null) {
            var result = todo.MoveToBucket(request.Bucket.Value);
            if (result.IsError) return result.Errors;
        }

        if (request.IsImportant != null || request.IsUrgent != null) {
            bool isImportant = request.IsImportant ?? todo.IsImportant;
            bool isUrgent = request.IsUrgent ?? todo.IsUrgent;

            var result = todo.SetUrgency(isImportant, isUrgent);
            if (result.IsError) return result.Errors;
        }

        if (request.IsDone != null) {
            if (request.IsDone.Value)
                todo.MarkDone();
            else
                todo.MarkUndone();
        }

        if (request.IsArchived != null) {
            if (request.IsArchived.Value)
                todo.Archive();
            else
                todo.Unarchive();
        }

        await todoRepository.UpdateAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return todo;
    }
}
