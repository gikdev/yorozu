using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.ConsumptionTrackLists.GetConsumptionTrackList;

internal sealed class GetConsumptionTrackListQueryHandler(
    IConsumptionListRepository consumptionTrackListRepository
) : IRequestHandler<GetConsumptionTrackListQuery, ErrorOr<ConsumptionList>> {
    public async Task<ErrorOr<ConsumptionList>> Handle(GetConsumptionTrackListQuery request, CancellationToken cancellationToken) {
        var existingList = await consumptionTrackListRepository.GetByIdAsync(request.Id, cancellationToken);
        if (existingList is null)
            return Error.NotFound("ConsumptionTrackList.NotFound", $"List with ID {request.Id} was not found.");

        return existingList;
    }
}
