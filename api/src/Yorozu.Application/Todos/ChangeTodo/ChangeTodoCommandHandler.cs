#pragma warning disable CA1851 // Possible multiple enumerations of 'IEnumerable' collection

using ErrorOr;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.ChangeTodo;

internal sealed class ChangeTodoCommandHandler(
    ITodoRepository todoRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ChangeTodoCommand, ErrorOr<Todo>> {
    public async Task<ErrorOr<Todo>> Handle(ChangeTodoCommand request, CancellationToken cancellationToken) {
        Todo? todo = await todoRepository.GetOneByIdAsync(request.Id, cancellationToken);

        if (todo is null) return Error.NotFound(description: "Task was not found");

        var titleResult = NotEmptyString.Create(request.Title);
        if (titleResult.IsError) return titleResult.Errors;
        var newTitle = titleResult.Value;
        todo.Title = newTitle;

        if (request.Why != null) {
            var result = NotEmptyString.Create(request.Why);
            if (result.IsError) return result.Errors;
            var newWhy = result.Value;
            todo.Why = newWhy;
        } else {
            todo.Why = null;
        }

        if (request.Description != null) {
            var result = NotEmptyString.Create(request.Description);
            if (result.IsError) return result.Errors;
            var newDescription = result.Value;
            todo.Description = newDescription;
        } else {
            todo.Description = null;
        }

        if (request.IsDone)
            todo.MarkDone();
        else
            todo.MarkUndone();

        todo.EstimatedPomodoros = request.EstimatedPomodoros;

        if (request.DueDate.HasValue) {
            var result = FutureDateTimeOffset.Create(request.DueDate.Value, DateTimeOffset.UtcNow);
            if (result.IsError) return result.Errors;
            var newDueDate = result.Value;
            todo.DueDate = newDueDate;
        } else {
            todo.DueDate = null;
        }

        var contextsResults = request.Contexts.Select(NotEmptyString.Create);
        if (contextsResults.Any(x => x.IsError))
            return contextsResults.First(x => x.IsError).Errors;
        var contexts = contextsResults.Select(x => x.Value).ToList();
        todo.SetContexts(contexts);

        todo.Priority = request.Priority;
        todo.EffortType = request.EffortType;
        todo.EnergyLevel = request.EnergyLevel;

        var updateResult = todo.Update(
            isUrgent: request.IsUrgent,
            waitingForInfo: request.WaitingForInfo,
            bucket: request.Bucket
        );
        if (updateResult.IsError) return updateResult.Errors;

        await todoRepository.UpdateAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return todo;
    }
}
