#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable CA1034 // Nested types should not be visible

using Fanoos.Domain.Todos;

namespace Fanoos.Domain.Tests.Unit.Todos;

internal static class TodoTestsUtils {
    internal static Todo CreateTodo(
        string title = "Sth",
        string? context = null,
        string? tag = null,
        string? project = null,
        int? time = null,
        EnergyLevel? energyLevel = null,
        bool? isDone = null,
        bool? isImportant = null,
        bool? isUrgent = null,
        bool? isArchived = null,
        TodoBucket? bucket = null,
        Guid? id = null
    ) {
        var result = Todo.Create(
            id: id,
            isArchived: isArchived,
            isDone: isDone,
            isUrgent: isUrgent,
            isImportant: isImportant,
            bucket: bucket,
            energyLevel: energyLevel,
            tag: tag,
            time: time,
            project: project,
            context: context,
            title: title
        );

        if (result.IsError) throw new InvalidOperationException("CreateTodo result was an error!");

        return result.Value;
    }
}
