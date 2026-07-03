using ErrorOr;
using MediatR;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.ConsumptionTrackLists.CreateConsumptionTrackList;

public sealed record CreateConsumptionTrackListCommand : IRequest<ErrorOr<ConsumptionTrackList>> {
    public required string Title { get; init; }
    public required string? Description { get; init; }
}
