using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Presentation.ConsumptionTracks.Common;

public record ConsumptionTrackSummariesResponse {
    public required List<ConsumptionTrackSummaryDto> Items { get; init; }
}
