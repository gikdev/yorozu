using Yorozu.Application.ConsumptionTracks.UpdateProgress;

namespace Yorozu.Presentation.ConsumptionTracks.UpdateProgress;

internal record UpdateProgressRequest {
    public required ProgressAction Action { get; init; }
    public required int Amount { get; init; }
}
