namespace Yorozu.Contracts.ConsumptionTrackLists;

public sealed record ConsumptionTrackListsResponse {
    public required List<ConsumptionTrackListMiniResponse> Items { get; init; }
}
