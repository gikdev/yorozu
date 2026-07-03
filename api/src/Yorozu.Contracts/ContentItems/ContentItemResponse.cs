#pragma warning disable CA1056 // URI-like properties should not be strings

namespace Yorozu.Contracts.ContentItems;

public sealed record ContentItemResponse {
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public required string PlaceholderLetter { get; init; }
    public required bool IsSecret { get; init; }
    public required bool IsFavorited { get; init; }
    public required bool IsBookmarked { get; init; }
    public required bool IsOngoing { get; init; }
    public required string? CoverImageUrl { get; init; }
    public required ContentItemFormat Format { get; init; }
    public required LocationType? LocationType { get; init; }
    public required string? LocationValue { get; init; }
}
