using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.ResumeTrack;

public record ResumeTrackCommand(Guid Id) : IRequest<ErrorOr<ConsumptionTrackSummaryDto>>;
