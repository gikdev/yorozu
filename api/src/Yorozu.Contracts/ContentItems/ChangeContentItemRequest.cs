namespace Yorozu.Contracts.ContentItems;

public sealed record ChangeContentItemRequest {
    public required FlagAction? IsSecret { get; init; }
    public required FlagAction? IsFavorited { get; init; }
    public required FlagAction? IsBookmarked { get; init; }
}
