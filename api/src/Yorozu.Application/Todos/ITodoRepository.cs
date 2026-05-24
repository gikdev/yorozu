#pragma warning disable CA1002 // Do not expose generic lists

using Yorozu.Domain.Todos;

namespace Yorozu.Application.Todos;

public interface ITodoRepository {
    Task AddAsync(Todo todo, CancellationToken cancellationToken = default);
    Task UpdateAsync(Todo todo, CancellationToken cancellationToken = default);
    Task RemoveAsync(Todo todo, CancellationToken cancellationToken = default);
    Task<List<Todo>> ListAsync(CancellationToken cancellationToken = default);
    Task<Todo?> GetOneByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<Todo>> GetBackup(CancellationToken cancellationToken = default);
    Task RestoreBackup(List<Todo> todos, CancellationToken cancellationToken = default);
}
