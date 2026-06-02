namespace Yorozu.Domain.ContentItems;

public interface IHasTimestamps {
    DateTimeOffset CreatedAt { get; }
    DateTimeOffset? UpdatedAt { get; }
}
