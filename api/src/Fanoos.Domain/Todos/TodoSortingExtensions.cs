namespace Fanoos.Domain.Todos;

public static class TodoSortingExtensions {
    /// <summary>
    /// This static extension method encapsulates the sorting logic into a single LINQ chain that
    /// can use to apply the required order of precedence: non-done first,
    /// then null contexts first, then alphabetical context.
    /// </summary>
    public static IOrderedQueryable<Todo> TodoDefaultSort(this IQueryable<Todo> query) {
        return query
            .OrderBy(t => t.IsDone ? 1 : 0)
            .ThenBy(t => t.Context == null ? 0 : 1)
            .ThenBy(t => t.Context);
    }
}
