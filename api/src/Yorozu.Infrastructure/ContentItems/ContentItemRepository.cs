using Yorozu.Application.ContentItems.Common;
using Yorozu.Domain.ContentItems;
using Yorozu.Infrastructure.Database;

namespace Yorozu.Infrastructure.ContentItems;

internal class ContentItemRepository(
    MainDbCtx db
) : IContentItemRepository {
    public void Add(ContentItem contentItem)
        => db.ContentItems.Add(contentItem);
}
