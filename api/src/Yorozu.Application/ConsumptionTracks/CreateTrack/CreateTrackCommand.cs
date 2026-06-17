using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Domain.ConsumptionTracks;

namespace Yorozu.Application.ConsumptionTracks.CreateTrack;

public record CreateTrackCommand : IRequest<ErrorOr<ConsumptionTrackSummaryDto>> {
    public required Guid ContentItemId { get; init; }
    public required IntentionType Type { get; init; }
    public required string Title { get; init; }
    public string? Description { get; init; }
}
