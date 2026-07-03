using ErrorOr;
using MediatR;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.ConsumptionTrackLists.UpdateConsumptionTrackList;

public sealed record UpdateConsumptionTrackListCommand : IRequest<ErrorOr<ConsumptionTrackList>> {
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public required string? Description { get; init; }
}
