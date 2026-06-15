using Yorozu.Domain.ContentItems;
using Yorozu.Presentation.ContentItems.CreateContentItem;

namespace Yorozu.Presentation.ContentItems.Common;

internal record ContentItemResponse {
    public required Guid Id { get; init; }
    public required DateTimeOffset CreatedAt { get; init; }
    public required DateTimeOffset? UpdatedAt { get; init; }
    public required string FullTitle { get; init; }
    public required string? NickName { get; init; }
    public required string Title { get; init; }
    public required ContentItemFormat Format { get; init; }
    public required List<string> Tags { get; init; }
    public required List<Genre> Genres { get; init; }
    public required bool IsSecret { get; init; }
    public required bool IsBookmarked { get; init; }
    public required bool IsFavorite { get; init; }
    public required LocationRto? Location { get; init; }
    public required ContentUnitSpecRto? UnitSpec { get; init; }
    public required bool HasAnyTracks { get; init; }
    public required string? CoverImageUrl { get; init; }
    public required string PlaceholderColor { get; init; }
    public required string PlaceholderLetter { get; init; }
}


internal record LocationRto(LocationType Type, string Value);
internal record ContentUnitSpecRto(bool IsOngoing, ContentUnitType UnitType, int? TotalUnits);
