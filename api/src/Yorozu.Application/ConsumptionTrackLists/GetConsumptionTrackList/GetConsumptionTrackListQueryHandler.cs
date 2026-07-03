using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.ConsumptionTrackLists.GetConsumptionTrackList;

internal sealed class GetConsumptionTrackListQueryHandler(
    IConsumptionTrackListRepository consumptionTrackListRepository
) : IRequestHandler<GetConsumptionTrackListQuery, ErrorOr<ConsumptionTrackList>> {
    public async Task<ErrorOr<ConsumptionTrackList>> Handle(GetConsumptionTrackListQuery request, CancellationToken cancellationToken) {
        var existingList = await consumptionTrackListRepository.GetByIdAsync(request.Id, cancellationToken);
        if (existingList is null)
            return Error.NotFound("ConsumptionTrackList.NotFound", $"List with ID {request.Id} was not found.");

        return existingList;
    }
}
