using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.ListAllTracks;

internal sealed class ListAllTracksQueryHandler(
    IConsumptionTrackRepository consumptionTrackRepository
) : IRequestHandler<ListAllTracksQuery, ErrorOr<List<ConsumptionTrackSummaryDto>>> {
    public async Task<ErrorOr<List<ConsumptionTrackSummaryDto>>> Handle(ListAllTracksQuery request, CancellationToken cancellationToken)
        => await consumptionTrackRepository.GetAllSummariesAsync(cancellationToken);
}
