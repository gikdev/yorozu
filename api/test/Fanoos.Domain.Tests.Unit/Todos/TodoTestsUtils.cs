using ErrorOr;
using Fanoos.Common.Domain;
using Fanoos.Domain.Todos;

namespace Fanoos.Domain.Tests.Unit.Todos;

internal static class TodoTestsUtils {
    internal static ErrorOr<Todo> CreateTodo(
        NotEmptyString? title = null,
        NotEmptyString? why = null,
        NotEmptyString? description = null,
        byte? pomodoroEstimate = null,
        bool? isUrgent = null,
        bool? isDone = null,
        FutureDateTimeOffset? dueDate = null,
        NotEmptyString[]? contexts = null,
        TodoPriority? priority = null,
        TodoEffortType? effortType = null,
        EnergyLevel? energyLevel = null,
        TodoBucket? bucket = null,
        WaitingForInfo? waitingForInfo = null,
        Guid? id = null
    ) {
        var fallbackTitle = NotEmptyString.Create("Sth").Value;

        var result = Todo.Create(
            id: id,
            title: title ?? fallbackTitle,
            why: why,
            description: description,
            pomodoroEstimate: pomodoroEstimate,
            isUrgent: isUrgent,
            isDone: isDone,
            dueDate: dueDate,
            contexts: contexts,
            priority: priority,
            effortType: effortType,
            energyLevel: energyLevel,
            bucket: bucket,
            waitingForInfo: waitingForInfo
        );

        return result;
    }
}
