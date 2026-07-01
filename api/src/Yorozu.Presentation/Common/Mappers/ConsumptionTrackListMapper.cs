using Yorozu.Contracts.ConsumptionTrackLists;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Presentation.Common.Mappers;

internal static class ConsumptionTrackListMapper {
    extension(ConsumptionTrackList list) {
        internal ConsumptionTrackListMiniResponse ToMiniResponse() => new() {
            Id = list.Id,
            CreatedAt = list.CreatedAt,
            Title = list.Title,
            Description = list.Description,
        };
    }
}
