using Fanoos.Domain.Todos;

namespace Fanoos.Presentation.Todos.Common;

internal static class Mappings {
    internal static TodoResponse MapToResponse(this Todo todo) {
        return new TodoResponse {
            Id = todo.Id,
            Contexts = todo.Contexts.ToList().ConvertAll(x => x.Value),
            EnergyLevel = todo.EnergyLevel,
            IsDone = todo.IsDone,
            IsUrgent = todo.IsUrgent,
            Bucket = todo.Bucket,
            Title = todo.Title.Value,
            Description = todo.Description?.Value,
            DueDate = todo.DueDate?.Value,
            EffortType = todo.EffortType,
            EstimatedPomodoros = todo.EstimatedPomodoros,
            Priority = todo.Priority,
            WaitingForInfo = todo.WaitingForInfo == null ? null : new WaitingForResponse {
                Description = todo.WaitingForInfo.Description.Value,
                ReviewAt = todo.WaitingForInfo.ReviewAt.Value,
            },
            Why = todo.Why?.Value,
        };
    }
}
