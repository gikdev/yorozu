using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.ConsumptionTrackLists.ListConsumptionTrackLists;

internal sealed class ListConsumptionTrackListsQueryHandler(
    IConsumptionListRepository consumptionTrackListRepository
) : IRequestHandler<ListConsumptionTrackListsQuery, ErrorOr<List<ConsumptionList>>> {
    public async Task<ErrorOr<List<ConsumptionList>>> Handle(ListConsumptionTrackListsQuery request, CancellationToken cancellationToken) {
        var lists = await consumptionTrackListRepository.GetAllAsync(cancellationToken);

        return lists;
    }
}
