namespace Yorozu.Contracts.ConsumptionTrackLists;

public sealed record UpdateConsumptionTrackListRequest {
    public required string Title { get; init; }
    public required string? Description { get; init; }
}
