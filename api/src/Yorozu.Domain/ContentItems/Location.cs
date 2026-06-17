namespace Yorozu.Domain.ContentItems;

public record Location {
    public required LocationType Type { get; init; }
    public required string Value { get; init; }
}
