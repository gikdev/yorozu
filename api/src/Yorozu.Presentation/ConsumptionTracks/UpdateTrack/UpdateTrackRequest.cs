using Yorozu.Domain.ConsumptionTracks;

namespace Yorozu.Presentation.ConsumptionTracks.UpdateTrack;

internal record UpdateTrackRequest {
    public required string Title { get; init; }
    public string? Description { get; init; }
    public required IntentionType Type { get; init; }
}
