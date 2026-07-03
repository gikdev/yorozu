namespace Yorozu.Contracts.ConsumptionTrackLists;

public sealed record CreateConsumptionTrackListRequest
{
    public required string Title { get; init; }
    public string? Description { get; init; }
}
