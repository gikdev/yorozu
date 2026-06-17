using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.PauseTrack;

public record PauseTrackCommand(Guid Id) : IRequest<ErrorOr<ConsumptionTrackSummaryDto>>;
