namespace Yorozu.Common.Domain;

public interface IHasTimestamps {
    DateTimeOffset CreatedAt { get; }
    DateTimeOffset? UpdatedAt { get; }
}
