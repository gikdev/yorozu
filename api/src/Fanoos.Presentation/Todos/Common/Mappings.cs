using Fanoos.Domain.Todos;

namespace Fanoos.Presentation.Todos.Common;

internal static class Mappings {
    internal static TodoResponse MapToResponse(this Todo todo) {
        return new TodoResponse {
            Id = todo.Id,
            Context = todo.Context,
            EnergyLevel = todo.EnergyLevel,
            IsDone = todo.IsDone,
            IsImportant = todo.IsImportant,
            IsUrgent = todo.IsUrgent,
            Project = todo.Project,
            // TODO: FIX THIS!
            //RawTitle = todo.ToRawFormat(),
            RawTitle = "N/A",
            Tag = todo.Tag,
            Time = todo.Time,
            Title = todo.Title,
            IsArchived = todo.IsArchived,
        };
    }
}
