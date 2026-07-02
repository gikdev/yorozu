using ErrorOr;
using MediatR;
using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.ConsumptionTrackLists.ListConsumptionTrackLists;

public sealed record ListConsumptionTrackListsQuery : IRequest<ErrorOr<List<ConsumptionTrackList>>>;
