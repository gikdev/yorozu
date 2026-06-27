using ErrorOr;
using Yorozu.Common.Domain;
using Yorozu.Domain.ConsumptionTracks;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Domain;

public static class CommonService {
    public static ErrorOr<ConsumptionTrack> CreateTrack(
        ContentItem contentItem,
        NotEmptyString title,
        NotEmptyString? description = null
    ) {
        return ConsumptionTrack.Create(
            contentItem.Id,
            contentItem.TotalUnits,
            title,
            description
        );
    }
}
