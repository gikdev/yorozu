using ErrorOr;
using MediatR;
using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.ConsumptionTrackLists.ListConsumptionTrackLists;

public sealed record ListConsumptionTrackListsQuery : IRequest<ErrorOr<List<ConsumptionList>>>;
