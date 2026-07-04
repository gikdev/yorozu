namespace Yorozu.Common.Domain;

public interface IHasUpdateTimestamp {
    DateTimeOffset? UpdatedAt { get; }
}
