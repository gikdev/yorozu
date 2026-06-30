using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.UpdateTrack;

public record UpdateTrackCommand : IRequest<ErrorOr<ConsumptionTrackSummaryDto>> {
    public required Guid TrackId { get; init; }
    public required string Title { get; init; }
    public required string? Description { get; init; }
}
