using ErrorOr;
using MediatR;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.ConsumptionTrackLists.GetConsumptionTrackList;

public sealed record GetConsumptionTrackListQuery(
    Guid Id
) : IRequest<ErrorOr<ConsumptionTrackList>>;
