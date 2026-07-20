using ErrorOr;
using MediatR;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.ConsumptionTrackLists.UpdateConsumptionTrackList;

public sealed record UpdateConsumptionTrackListCommand : IRequest<ErrorOr<ConsumptionList>> {
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public required string? Description { get; init; }
}
