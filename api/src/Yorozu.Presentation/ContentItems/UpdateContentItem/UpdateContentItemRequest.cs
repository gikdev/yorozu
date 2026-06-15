using Yorozu.Domain.ContentItems;
using Yorozu.Presentation.ContentItems.Common;

namespace Yorozu.Presentation.ContentItems.UpdateContentItem;

internal record UpdateContentItemRequest {
    public required string FullTitle { get; init; }
    public required ContentItemFormat Format { get; init; }
    public required string? NickName { get; init; }
    public required List<string> Tags { get; init; } = [];
    public required List<Genre> Genres { get; init; } = [];
    public required bool IsSecret { get; init; }
    public required bool IsBookmarked { get; init; }
    public required bool IsFavorite { get; init; }
    public required string? CoverImagePath { get; init; }
    public required LocationRto? Location { get; init; }
    public required ContentUnitSpecRto? UnitSpec { get; init; }
}
