using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.Common;

public interface IContentItemRepository {
    void Add(ContentItem contentItem);
    void Update(ContentItem contentItem);
    void Remove(ContentItem contentItem);
    Task<List<ContentItem>> ListAsync(CancellationToken cancellationToken = default);
    Task<ContentItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<string>> GetAllTagsAsync(CancellationToken cancellationToken = default);
}

public record LocationDto(LocationType Type, string Value);
