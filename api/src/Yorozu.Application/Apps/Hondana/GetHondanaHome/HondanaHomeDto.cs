using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.Apps.Hondana.GetHondanaHome;

public sealed record HondanaHomeDto {
    public required List<ConsumptionTrackList> ConsumptionTrackLists { get; init; }
}
