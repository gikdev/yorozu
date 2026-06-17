namespace Yorozu.Presentation.ConsumptionTracks.Common;

public record ConsumptionTracksResponse {
    public required List<ConsumptionTrackResponse> Items { get; init; }
}
