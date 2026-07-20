using ErrorOr;
using MediatR;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.ConsumptionTrackLists.GetConsumptionTrackList;

public sealed record GetConsumptionTrackListQuery(
    Guid Id
) : IRequest<ErrorOr<ConsumptionList>>;
