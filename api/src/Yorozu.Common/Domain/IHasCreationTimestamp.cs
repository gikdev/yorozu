namespace Yorozu.Common.Domain;

public interface IHasCreationTimestamp {
    DateTimeOffset CreatedAt { get; }
}
