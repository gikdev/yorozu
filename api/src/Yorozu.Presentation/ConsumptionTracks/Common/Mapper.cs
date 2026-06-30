using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Presentation.ConsumptionTracks.Common;

internal static class Mapper {
    internal static ConsumptionTrackResponse MapToResponse(ConsumptionTrackSummaryDto dto)
    => new() {
        Id = dto.Id,
        ContentItemId = dto.ContentItemId,
        ContentItemTitle = dto.ContentItemTitle,
        ContentItemCoverImageUrl = dto.ContentItemCoverImageUrl,
        ContentItemPlaceholderColor = dto.ContentItemPlaceholderColor,
        ContentItemPlaceholderLetter = dto.ContentItemPlaceholderLetter,
        ContentItemFormat = dto.ContentItemFormat,
        IsSecret = dto.IsSecret,
        UnitType = dto.UnitType,
        Status = MapConsumptionStatus(dto.Status),
        Title = dto.Title,
        CurrentUnit = dto.CurrentUnit,
        TotalUnits = dto.TotalUnits,
        Description = dto.Description,
        CreatedAt = dto.CreatedAt,
        UpdatedAt = dto.UpdatedAt,
        StartedAt = dto.StartedAt,
        CompletedAt = dto.CompletedAt,
        DroppedAt = dto.DroppedAt,
        PausedAt = dto.PausedAt,
        CanStart = dto.CanStart,
        CanPause = dto.CanPause,
        CanResume = dto.CanResume,
        CanComplete = dto.CanComplete,
        CanDrop = dto.CanDrop,
        CanProgress = dto.CanProgress,
        CanDecrement = dto.CanDecrement
    };

    private static ConsumptionStatus MapConsumptionStatus(
        Domain.ConsumptionTracks.ConsumptionStatus domainStatus
    ) {
        return (ConsumptionStatus)domainStatus.Value;
    }

}
