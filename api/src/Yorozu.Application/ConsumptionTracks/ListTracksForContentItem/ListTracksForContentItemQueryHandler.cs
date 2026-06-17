using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.ListTracksForContentItem;

internal class ListTracksForContentItemQueryHandler(
    IConsumptionTrackRepository consumptionTrackRepository
) : IRequestHandler<ListTracksForContentItemQuery, ErrorOr<List<ConsumptionTrackSummaryDto>>> {
    public async Task<ErrorOr<List<ConsumptionTrackSummaryDto>>> Handle(ListTracksForContentItemQuery request, CancellationToken cancellationToken)
        => await consumptionTrackRepository.GetSummariesByContentItemIdAsync(request.ContentItemId, cancellationToken);
}
