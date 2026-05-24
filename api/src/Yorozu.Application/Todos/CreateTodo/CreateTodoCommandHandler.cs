#pragma warning disable CA1851 // Possible multiple enumerations of 'IEnumerable' collection
#pragma warning disable S1199 // Nested code blocks should not be used

using ErrorOr;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Todos.CreateTodo;

internal sealed class CreateTodoCommandHandler(
    ITodoRepository todoRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateTodoCommand, ErrorOr<Todo>> {
    public async Task<ErrorOr<Todo>> Handle(CreateTodoCommand request, CancellationToken cancellationToken) {
        List<NotEmptyString>? contexts = null;
        FutureDateTimeOffset? dueDate = null;
        NotEmptyString? description = null;
        NotEmptyString? why = null;
        NotEmptyString title;

        if (request.Contexts != null) {
            IEnumerable<ErrorOr<NotEmptyString>> contextsResults = request.Contexts.Select(x => NotEmptyString.Create(x));

            if (contextsResults.Any(x => x.IsError))
                return contextsResults.First(x => x.IsError).Errors;

            contexts = contextsResults.Select(x => x.Value).ToList();
        }

        if (request.DueDate.HasValue) {
            var now = DateTimeOffset.UtcNow;
            ErrorOr<FutureDateTimeOffset> dueDateResult = FutureDateTimeOffset.Create(request.DueDate.Value, now);

            if (dueDateResult.IsError)
                return dueDateResult.Errors;

            dueDate = dueDateResult.Value;
        }

        if (request.Description != null) {
            var descriptionResult = NotEmptyString.Create(request.Description);

            if (descriptionResult.IsError)
                return descriptionResult.Errors;

            description = descriptionResult.Value;
        }

        if (request.Why != null) {
            var whyResult = NotEmptyString.Create(request.Why);

            if (whyResult.IsError)
                return whyResult.Errors;

            why = whyResult.Value;
        }

        {
            var titleResult = NotEmptyString.Create(request.Title);

            if (titleResult.IsError)
                return titleResult.Errors;

            title = titleResult.Value;
        }

        ErrorOr<Todo> todoResult = Todo.Create(
            waitingForInfo: request.WaitingForInfo,
            bucket: request.Bucket,
            energyLevel: request.EnergyLevel,
            effortType: request.EffortType,
            priority: request.Priority,
            contexts: contexts,
            dueDate: dueDate,
            isDone: request.IsDone,
            isUrgent: request.IsUrgent,
            estimatedPomodoros: request.PomodoroEstimate,
            description: description,
            why: why,
            title: title
        );

        if (todoResult.IsError) return todoResult.Errors;

        Todo todo = todoResult.Value;

        await todoRepository.AddAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return todoResult;
    }
}
