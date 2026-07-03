using Yorozu.Contracts.ContentItems;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Presentation.Common.Mappers;

internal static class ContentItemMapper {
    extension(ContentItem item) {
        internal ContentItemResponse ToResponse() => new() {
            Title = item.Title,
            CoverImageUrl = item.CoverImageUrl,
            Format = (Contracts.ContentItems.ContentItemFormat)item.Format,
            Id = item.Id,
            IsBookmarked = item.IsBookmarked,
            IsFavorited = item.IsFavorited,
            IsOngoing = item.IsOngoing,
            IsSecret = item.IsSecret,
            LocationType = (Contracts.ContentItems.LocationType?)item.Location?.Type,
            LocationValue = item.Location?.Value,
            PlaceholderLetter = item.PlaceholderLetter,
        };
    }
}
