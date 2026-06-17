using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.GetTrack;

public record GetTrackQuery(Guid TrackId) : IRequest<ErrorOr<ConsumptionTrackSummaryDto>>;
