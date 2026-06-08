using Yorozu.Domain.ContentItems;

namespace Yorozu.Presentation.ContentItems.CreateContentItem;

internal record CreateContentItemRequest {
    public required string FullTitle { get; init; }
    public required ContentItemFormat Format { get; init; }
    public string? NickName { get; init; }
    public List<string> Tags { get; init; } = [];
    public List<Genre> Genres { get; init; } = [];
    public bool IsSecret { get; init; }
    public bool IsBookmarked { get; init; }
    public bool IsFavorite { get; init; }
    public string? CoverImagePath { get; init; }
    public LocationRto? Location { get; init; }
    public ContentUnitSpecRto? UnitSpec { get; init; }
}

internal record LocationRto(LocationType Type, string Value);
internal record ContentUnitSpecRto(bool IsOngoing, ContentUnitType UnitType, int? TotalUnits);
