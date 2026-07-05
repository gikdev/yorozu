namespace Yorozu.Contracts.ContentItems;

public sealed record ChangeContentItemRequest {
    public FlagAction? IsSecret { get; init; }
    public FlagAction? IsFavorited { get; init; }
    public FlagAction? IsBookmarked { get; init; }
}
