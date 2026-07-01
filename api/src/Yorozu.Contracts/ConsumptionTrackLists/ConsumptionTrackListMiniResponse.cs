namespace Yorozu.Contracts.ConsumptionTrackLists;

public sealed record ConsumptionTrackListMiniResponse {
    public required Guid Id { get; init; }
    public required DateTimeOffset CreatedAt { get; init; }
    public required string Title { get; init; }
    public required string? Description { get; init; }
}
