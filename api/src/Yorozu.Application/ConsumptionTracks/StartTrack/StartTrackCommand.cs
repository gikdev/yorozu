using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.StartTrack;

public record StartTrackCommand(Guid Id) : IRequest<ErrorOr<ConsumptionTrackSummaryDto>>;
