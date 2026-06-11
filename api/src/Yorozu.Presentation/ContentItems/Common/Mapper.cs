using Yorozu.Domain.ContentItems;
using Yorozu.Presentation.ContentItems.CreateContentItem;

namespace Yorozu.Presentation.ContentItems.Common;

internal static class Mapper {
    internal static ContentItemResponse MapToResponse(ContentItem i)
        => new() {
            CoverImageUrl = i.CoverImageUrl?.Value,
            CreatedAt = i.CreatedAt,
            Format = i.Format,
            FullTitle = i.FullTitle.Value,
            Genres = i.Genres.ToList(),
            HasAnyTracks = i.HasAnyTracks,
            Id = i.Id,
            IsBookmarked = i.IsBookmarked,
            IsFavorite = i.IsFavorite,
            IsSecret = i.IsSecret,
            Location = i.Location == null ? null : new LocationRto(i.Location.Type, i.Location.Value),
            NickName = i.NickName?.Value,
            PlaceholderColor = i.PlaceholderColor,
            PlaceholderLetter = i.PlaceholderLetter,
            Tags = i.Tags.ToList().ConvertAll(x => x.Value),
            Title = i.Title,
            UnitSpec = i.UnitSpecification == null ? null : new ContentUnitSpecRto(
                i.UnitSpecification.IsOngoing,
                i.UnitSpecification.UnitType,
                i.UnitSpecification.TotalUnits
            ),
            UpdatedAt = i.UpdatedAt,
        };
}
