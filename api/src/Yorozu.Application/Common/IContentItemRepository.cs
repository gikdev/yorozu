using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.Common;

public interface IContentItemRepository
{
    Task<ContentItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<ContentItem>> GetAllAsync(CancellationToken cancellationToken = default);
    void Add(ContentItem entity);
    void Update(ContentItem entity);
    void Delete(ContentItem entity);
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
}
