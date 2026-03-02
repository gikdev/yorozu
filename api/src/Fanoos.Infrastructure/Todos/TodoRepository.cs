using Fanoos.Application.Todos;
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

    public async Task<List<Todo>> ListAsync(bool includeArchived = false, CancellationToken cancellationToken = default) {
        IQueryable<Todo> query = db.Todos
            .Where(t => includeArchived || !t.IsArchived)
            .TodoDefaultSort();

        List<Todo> todos = await query.ToListAsync(cancellationToken: cancellationToken);

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
