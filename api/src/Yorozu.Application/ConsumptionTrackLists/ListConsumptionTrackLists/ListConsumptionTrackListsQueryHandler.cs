using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.ConsumptionTrackLists.ListConsumptionTrackLists;

internal sealed class ListConsumptionTrackListsQueryHandler(
    IConsumptionTrackListRepository consumptionTrackListRepository
) : IRequestHandler<ListConsumptionTrackListsQuery, ErrorOr<List<ConsumptionTrackList>>> {
    public async Task<ErrorOr<List<ConsumptionTrackList>>> Handle(ListConsumptionTrackListsQuery request, CancellationToken cancellationToken) {
        var lists = await consumptionTrackListRepository.GetAllAsync(cancellationToken);

        return lists;
    }
}
