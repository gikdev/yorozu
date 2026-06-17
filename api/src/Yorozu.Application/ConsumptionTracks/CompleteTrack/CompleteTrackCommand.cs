using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.CompleteTrack;

public record CompleteTrackCommand(Guid Id) : IRequest<ErrorOr<ConsumptionTrackSummaryDto>>;
