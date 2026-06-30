namespace Yorozu.Presentation.ConsumptionTracks.UpdateTrack;

internal record UpdateTrackRequest {
    public required string Title { get; init; }
    public string? Description { get; init; }
}
