using ErrorOr;
using Yorozu.Common.Domain;
using Yorozu.Domain.ConsumptionTracks;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Domain;

public static class CommonService { // previously ConsumptionTrackService
    public static ErrorOr<ConsumptionTrack> CreateTrack(
        ContentItem contentItem,
        IntentionType type,
        NotEmptyString title,
        NotEmptyString? description = null
    ) {
        if (!contentItem.CanAddTracks)
            return ContentItemErrors.MustHaveUnitSpecError;

        return ConsumptionTrack.Create(
            contentItem.Id,
            contentItem.UnitSpec!.TotalUnits, // checked right up there!
            type,
            title,
            description
        );
    }

    public static void SyncTrackUnits(ConsumptionTrack track, ContentItem contentItem) {
        if (track.Status.IsTerminal) return; // If terminated, no need to update the cap or the current progress or whatever really...

        track.SyncTotalUnits(contentItem.UnitSpec?.TotalUnits);
    }
}
