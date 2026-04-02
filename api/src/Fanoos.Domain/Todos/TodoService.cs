#pragma warning disable CA1002 // Do not expose generic lists
#pragma warning disable CA1307 // Specify StringComparison for clarity

namespace Fanoos.Domain.Todos;

public static class TodoService {
    public static List<Todo> OrganizeTodos(List<Todo> todos, OrganizeTodosDto dto) {
        List<Todo> organizedTodos = [.. todos];

        if (dto.AvailablePomodoros.HasValue) {
            organizedTodos = organizedTodos.Where(
                t => t.EstimatedPomodoros <= dto.AvailablePomodoros.Value
            ).ToList();
        }

        if (dto.AvailableEnergyLevel.HasValue) {
            organizedTodos = organizedTodos.Where(
                t => t.EnergyLevel <= dto.AvailableEnergyLevel.Value
            ).ToList();
        }

        if (dto.Bucket.HasValue) {
            organizedTodos = organizedTodos.Where(
                t => t.Bucket == dto.Bucket
            ).ToList();
        }

        if (dto.IncludeQuery != null) {
            organizedTodos = organizedTodos.Where(
                t => t.Title.Value.Contains(dto.IncludeQuery)
            ).ToList();
        }

        if (dto.ExcludeQuery != null) {
            organizedTodos = organizedTodos.Where(
                t => !t.Title.Value.Contains(dto.ExcludeQuery)
            ).ToList();
        }

        TodoSortOrder todoSortOrder = dto.SortOrder ?? TodoSortOrder.Asc;
        TodoSortBy sortBy = dto.SortBy ?? TodoSortBy.None;

        organizedTodos = todoSortOrder switch {
            TodoSortOrder.Asc => sortBy switch {
                TodoSortBy.Title => organizedTodos.OrderBy(t => t.Title.Value).ToList(),
                TodoSortBy.DueDate => organizedTodos.OrderBy(t => t.DueDate?.Value).ToList(),
                TodoSortBy.Priority => organizedTodos.OrderBy(t => t.Priority).ToList(),
                _ => organizedTodos,
            },

            TodoSortOrder.Desc => sortBy switch {
                TodoSortBy.Title => organizedTodos.OrderByDescending(t => t.Title.Value).ToList(),
                TodoSortBy.DueDate => organizedTodos.OrderByDescending(t => t.DueDate?.Value).ToList(),
                TodoSortBy.Priority => organizedTodos.OrderByDescending(t => t.Priority).ToList(),
                _ => organizedTodos,
            },

            _ => organizedTodos,
        };

        organizedTodos = organizedTodos.OrderBy(t => t.IsDone).ToList();

        return organizedTodos;
    }
}
