using Yorozu.Domain.ContentItems;

namespace Yorozu.Presentation.ContentItems.Common;

internal static class Mapper {
    internal static ContentItemResponse MapToResponse(ContentItem i)
        => new() {
            CoverImageUrl = i.CoverImageUrl,
            CreatedAt = i.CreatedAt,
            Format = i.Format,
            FullTitle = i.FullTitle,
            Id = i.Id,
            IsBookmarked = i.IsBookmarked,
            IsFavorite = i.IsFavorited,
            IsSecret = i.IsSecret,
            Location = i.Location == null ? null : new LocationRto(i.Location.Type, i.Location.Value),
            NickName = i.NickName,
            PlaceholderColor = i.PlaceholderColor,
            PlaceholderLetter = i.PlaceholderLetter,
            Tags = i.Tags.ToList(),
            Title = i.Title,
            UpdatedAt = i.UpdatedAt,
            UnitSpec =null,
        };
}
