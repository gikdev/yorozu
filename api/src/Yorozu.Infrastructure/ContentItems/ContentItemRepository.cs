using Microsoft.EntityFrameworkCore;
using Yorozu.Application.Common;
using Yorozu.Domain.ContentItems;
using Yorozu.Infrastructure.Database;

namespace Yorozu.Infrastructure.ContentItems;

internal sealed class ContentItemRepository(
    MainDbCtx db
) : IContentItemRepository {
    public async Task<ContentItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.ContentItems.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public async Task<List<ContentItem>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.ContentItems.ToListAsync(cancellationToken);

    public void Add(ContentItem entity) {
        db.ContentItems.Add(entity);
    }

    public void Update(ContentItem entity) {
        db.ContentItems.Update(entity);
    }

    public void Delete(ContentItem entity) {
        db.ContentItems.Remove(entity);
    }

    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.ContentItems.AnyAsync(e => e.Id == id, cancellationToken);

    public async Task<List<string>> GetAllTagsAsync(CancellationToken cancellationToken = default) {
        var allItems = await db.ContentItems
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return allItems
            .SelectMany(item => item.Tags)
            .Distinct()
            .OrderBy(tag => tag)
            .ToList();
    }
}
