using Yorozu.Domain.ConsumptionTracks;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ConsumptionTracks.Common;

internal static class ConsumptionTrackMapper {
    public static ConsumptionTrackSummaryDto MapToSummary(ConsumptionTrack track, ContentItem contentItem)
        => new() {
            Id = track.Id,
            ContentItemId = track.ContentItemId,
            ContentItemTitle = contentItem.Title.Value,
            ContentItemCoverImageUrl = contentItem.CoverImageUrl?.Value,
            ContentItemPlaceholderColor = contentItem.PlaceholderColor,
            ContentItemPlaceholderLetter = contentItem.PlaceholderLetter,
            UnitType = contentItem.UnitSpec?.UnitType,
            ContentItemFormat = contentItem.Format,
            IsSecret = contentItem.IsSecret,
            Type = track.Type,
            Status = track.Status,
            Title = track.Title,
            CurrentUnit = track.CurrentUnit,
            TotalUnits = track.TotalUnits,
            Description = track.Description,
            CreatedAt = track.CreatedAt,
            UpdatedAt = track.UpdatedAt,
            StartedAt = track.StartedAt,
            CompletedAt = track.CompletedAt,
            DroppedAt = track.DroppedAt,
            PausedAt = track.PausedAt,
            CanStart = track.CanStart,
            CanPause = track.CanPause,
            CanResume = track.CanResume,
            CanComplete = track.CanComplete,
            CanDrop = track.CanDrop,
            CanProgress = track.CanProgress,
            CanDecrement = track.CanDecrement,
        };
}
