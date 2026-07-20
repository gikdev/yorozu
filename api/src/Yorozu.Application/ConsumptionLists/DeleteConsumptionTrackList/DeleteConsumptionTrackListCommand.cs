using ErrorOr;
using MediatR;

namespace Yorozu.Application.ConsumptionTrackLists.DeleteConsumptionTrackList;

public sealed record DeleteConsumptionTrackListCommand(
    Guid Id
) : IRequest<ErrorOr<Success>>;
