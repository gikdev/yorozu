using Fanoos.Application.Todos;
using Fanoos.Application.Todos.ListTodos;
using Fanoos.Domain.Todos;
using Fanoos.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Fanoos.Infrastructure.Todos;

internal sealed class TodoRepository(
    MainDbCtx db
) : ITodoRepository {
    public Task AddAsync(Todo todo, CancellationToken cancellationToken = default) {
        db.Todos.Add(todo);

        return Task.CompletedTask;
    }

    public Task UpdateAsync(Todo todo, CancellationToken cancellationToken = default) {
        db.Todos.Update(todo);

        return Task.CompletedTask;
    }

    public async Task<List<Todo>> ListAsync(ListTodosQuery query, CancellationToken cancellationToken = default) {
        IQueryable<Todo> queryable = db.Todos;

        // 1. Filter by Archived Status
        queryable = query.ArchivedStatus switch {
            ArchivedStatus.Active => queryable.Where(t => !t.IsArchived),
            ArchivedStatus.Archived => queryable.Where(t => t.IsArchived),
            _ => queryable, 
        };

        // 2. Filter by Bucket
        if (query.Bucket.HasValue) {
            queryable = queryable.Where(t => t.Bucket == query.Bucket.Value);
        }

        // 3. Search: Include Query
        if (!string.IsNullOrWhiteSpace(query.IncludeQuery)) {
            queryable = queryable.Where(t => (
                t.Title.Contains(query.IncludeQuery)
                ||
                (t.Project != null && t.Project.Contains(query.IncludeQuery))
                ||
                (t.Context != null && t.Context.Contains(query.IncludeQuery))
                ||
                (t.Tag != null && t.Tag.Contains(query.IncludeQuery))
            ));
        }

        // 4. Search: Exclude Query
        if (!string.IsNullOrWhiteSpace(query.ExcludeQuery)) {
            queryable = queryable.Where(t => (
                !t.Title.Contains(query.ExcludeQuery)
                &&
                (t.Project == null || !t.Project.Contains(query.ExcludeQuery))
                &&
                (t.Context == null || !t.Context.Contains(query.ExcludeQuery))
                &&
                (t.Tag == null || !t.Tag.Contains(query.ExcludeQuery))
            ));
        }

        // 5. Sorting
        queryable = query.SortOrder switch {
            SortOrder.Asc => query.SortBy switch {
                SortBy.Time => queryable.OrderBy(t => t.Time),
                SortBy.Context => queryable.OrderBy(t => t.Context),
                SortBy.Project => queryable.OrderBy(t => t.Project),
                SortBy.Tag => queryable.OrderBy(t => t.Tag),
                _ => queryable,
            },

            SortOrder.Desc => query.SortBy switch {
                SortBy.Time => queryable.OrderByDescending(t => t.Time),
                SortBy.Context => queryable.OrderByDescending(t => t.Context),
                SortBy.Project => queryable.OrderByDescending(t => t.Project),
                SortBy.Tag => queryable.OrderByDescending(t => t.Tag),
                _ => queryable,
            },

            _ => queryable,
        };

        List<Todo> todos = await queryable.ToListAsync(cancellationToken: cancellationToken);

        return todos;
    }

    public async Task<Todo?> GetOneByIdAsync(Guid id, CancellationToken cancellationToken = default) {
        Todo? todo = await db.Todos.FirstOrDefaultAsync(t => t.Id == id, cancellationToken: cancellationToken);

        return todo;
    }

    public Task RemoveAsync(Todo todo, CancellationToken cancellationToken = default) {
        db.Todos.Remove(todo);

        return Task.CompletedTask;
    }
}
