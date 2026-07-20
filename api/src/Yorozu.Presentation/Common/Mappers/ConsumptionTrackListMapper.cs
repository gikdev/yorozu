using Yorozu.Contracts.ConsumptionTrackLists;
using Yorozu.Contracts.ContentItems;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Presentation.Common.Mappers;

internal static class ConsumptionTrackListMapper {
    extension(ConsumptionList list) {
        internal ConsumptionTrackListMiniResponse ToMiniResponse() => new() {
            Id = list.Id,
            CreatedAt = list.CreatedAt,
            Title = list.Title,
            Description = list.Description,
        };
    }
}
