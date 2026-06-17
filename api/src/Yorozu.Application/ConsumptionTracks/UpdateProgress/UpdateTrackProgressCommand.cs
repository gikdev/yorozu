using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.UpdateProgress;

public record UpdateTrackProgressCommand : IRequest<ErrorOr<ConsumptionTrackSummaryDto>> {
    public required Guid TrackId { get; init; }
    public required ProgressAction Action { get; init; }
    public required int Amount { get; init; }
}
