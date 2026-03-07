using Fanoos.Application.Todos.ListTodos;
using Fanoos.Domain.Todos;

namespace Fanoos.Application.Todos;

public interface ITodoRepository {
    Task AddAsync(Todo todo, CancellationToken cancellationToken = default);
    Task UpdateAsync(Todo todo, CancellationToken cancellationToken = default);
    Task RemoveAsync(Todo todo, CancellationToken cancellationToken = default);
    Task<List<Todo>> ListAsync(ListTodosQuery query, CancellationToken cancellationToken = default);
    Task<Todo?> GetOneByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<Todo>> GetBackup(CancellationToken cancellationToken = default);
    Task RestoreBackup(List<Todo> todos, CancellationToken cancellationToken = default);
}
