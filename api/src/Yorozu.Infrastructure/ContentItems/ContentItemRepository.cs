using Microsoft.EntityFrameworkCore;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Domain.ContentItems;
using Yorozu.Infrastructure.Database;

namespace Yorozu.Infrastructure.ContentItems;

internal class ContentItemRepository(
    MainDbCtx db
) : IContentItemRepository {
    public void Add(ContentItem contentItem) => db.ContentItems.Add(contentItem);
    public void Update(ContentItem contentItem) => db.ContentItems.Update(contentItem);
    public void Remove(ContentItem contentItem) => db.ContentItems.Remove(contentItem);

    public Task<ContentItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => db.ContentItems.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public Task<List<ContentItem>> ListAsync(CancellationToken cancellationToken = default)
        => db.ContentItems.ToListAsync(cancellationToken);

    public Task<List<string>> GetAllTagsAsync(CancellationToken cancellationToken = default)
        => db.ContentItems
            .AsAsyncEnumerable()
            .SelectMany(ci => ci.Tags)
            .Distinct()
            .OrderBy(t => t)
            .ToListAsync(cancellationToken)
            .AsTask();
}
