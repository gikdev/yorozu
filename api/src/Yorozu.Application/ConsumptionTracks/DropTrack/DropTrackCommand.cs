using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.DropTrack;

public record DropTrackCommand(Guid Id) : IRequest<ErrorOr<ConsumptionTrackSummaryDto>>;
