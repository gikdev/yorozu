using Yorozu.Contracts.ConsumptionTrackLists;

namespace Yorozu.Presentation.Apps.Hondana.GetHondanaHome;

public sealed record HondanaHomeResponse {
    public required List<ConsumptionTrackListMiniResponse> ConsumptionTrackLists { get; init; }
}
