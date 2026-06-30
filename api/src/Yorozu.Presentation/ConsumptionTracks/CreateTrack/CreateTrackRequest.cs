namespace Yorozu.Presentation.ConsumptionTracks.CreateTrack;

internal record CreateTrackRequest {
    public required string Title { get; init; }
    public string? Description { get; init; }
}
