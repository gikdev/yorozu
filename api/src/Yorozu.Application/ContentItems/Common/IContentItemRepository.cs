using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.Common;

public interface IContentItemRepository {
    void Add(ContentItem contentItem);
    Task<List<ContentItem>> ListAsync(CancellationToken cancellationToken = default);
}
