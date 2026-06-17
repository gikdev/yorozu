using Yorozu.Domain.ContentItems;

namespace Yorozu.Presentation.ContentItems.Common;

internal static class Mapper {
    internal static ContentItemResponse MapToResponse(ContentItem i)
        => new() {
            CoverImageUrl = i.CoverImageUrl?.Value,
            CreatedAt = i.CreatedAt,
            Format = i.Format,
            FullTitle = i.FullTitle.Value,
            Id = i.Id,
            IsBookmarked = i.IsBookmarked,
            IsFavorite = i.IsFavorite,
            IsSecret = i.IsSecret,
            Location = i.Location == null ? null : new LocationRto(i.Location.Type, i.Location.Value),
            NickName = i.NickName?.Value,
            PlaceholderColor = i.PlaceholderColor,
            PlaceholderLetter = i.PlaceholderLetter,
            Tags = i.Tags.ToList(),
            Title = i.Title,
            UnitSpec = i.UnitSpec == null ? null : new ContentUnitSpecRto(
                i.UnitSpec.IsOngoing,
                i.UnitSpec.UnitType,
                i.UnitSpec.TotalUnits
            ),
            UpdatedAt = i.UpdatedAt,
        };
}
