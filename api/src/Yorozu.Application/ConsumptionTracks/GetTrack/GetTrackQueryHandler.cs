using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.GetTrack;

internal class GetTrackQueryHandler(
    IConsumptionTrackRepository consumptionTrackRepository
) : IRequestHandler<GetTrackQuery, ErrorOr<ConsumptionTrackSummaryDto>> {
    public async Task<ErrorOr<ConsumptionTrackSummaryDto>> Handle(GetTrackQuery request, CancellationToken cancellationToken) {
        var summary = await consumptionTrackRepository.GetSummaryByIdAsync(request.TrackId, cancellationToken);
        if (summary is null) return Error.NotFound(description: "Track not found");
        return summary;
    }
}
