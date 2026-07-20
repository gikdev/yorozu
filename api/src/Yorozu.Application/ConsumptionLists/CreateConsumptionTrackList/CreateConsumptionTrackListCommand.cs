using ErrorOr;
using MediatR;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.ConsumptionTrackLists.CreateConsumptionTrackList;

public sealed record CreateConsumptionTrackListCommand : IRequest<ErrorOr<ConsumptionList>> {
    public required string Title { get; init; }
    public required string? Description { get; init; }
}
