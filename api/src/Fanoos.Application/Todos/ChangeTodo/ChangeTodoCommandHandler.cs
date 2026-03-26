#pragma warning disable CA1851 // Possible multiple enumerations of 'IEnumerable' collection

using ErrorOr;
using Fanoos.Common.Data;
using Fanoos.Common.Domain;
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
            var result = NotEmptyString.Create(request.Title);
            if (result.IsError) return result.Errors;
            var newTitle = result.Value;
            todo.Title = newTitle;
        }

        if (request.Why != null) {
            if (request.Why.Value == null) {
                todo.Why = null;
            } else {
                var result = NotEmptyString.Create(request.Why.Value);
                if (result.IsError) return result.Errors;
                var newWhy = result.Value;
                todo.Why = newWhy;
            }
        }

        if (request.Description != null) {
            if (request.Description.Value == null) {
                todo.Description = null;
            } else {
                var result = NotEmptyString.Create(request.Description.Value);
                if (result.IsError) return result.Errors;
                var newDescription = result.Value;
                todo.Description = newDescription;
            }
        }

        if (request.IsDone.HasValue) {
            if (request.IsDone.Value)
                todo.MarkDone();
            else
                todo.MarkUndone();
        }

        if (request.EstimatedPomodoros != null) {
            todo.EstimatedPomodoros = request.EstimatedPomodoros.Value;
        }

        if (request.IsUrgent.HasValue) {
            var result = todo.SetUrgency(request.IsUrgent.Value);
            if (result.IsError) return result.Errors;
        }

        if (request.DueDate != null) {
            if (request.DueDate.Value == null) {
                todo.DueDate = null;
            } else {
                var result = FutureDateTimeOffset.Create(request.DueDate.Value.Value, DateTimeOffset.UtcNow);
                if (result.IsError) return result.Errors;
                var newDueDate = result.Value;
                todo.DueDate = newDueDate;
            }
        }

        if (request.Contexts != null) {
            var contextsResults = request.Contexts.Select(x => NotEmptyString.Create(x));

            if (contextsResults.Any(x => x.IsError)) {
                return contextsResults.First(x => x.IsError).Errors;
            }

            var contexts = contextsResults.Select(x => x.Value).ToList();

            todo.SetContexts(contexts);
        }

        if (request.Priority.HasValue) {
            todo.Priority = request.Priority.Value;
        }

        if (request.EffortType.HasValue) {
            todo.EffortType = request.EffortType.Value;
        }

        if (request.EnergyLevel.HasValue) {
            todo.EnergyLevel = request.EnergyLevel.Value;
        }

        if (request.Bucket.HasValue) {
            var result = todo.MoveToBucket(request.Bucket.Value);
            if (result.IsError) return result.Errors;
        }

        // TODO: Make this a method
        if (request.WaitingForInfo != null) {
            if (request.WaitingForInfo.Value == null) {
                todo.WaitingForInfo = null;
            } else {
                todo.WaitingForInfo = request.WaitingForInfo.Value;
            }
        }

        await todoRepository.UpdateAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return todo;
    }
}
