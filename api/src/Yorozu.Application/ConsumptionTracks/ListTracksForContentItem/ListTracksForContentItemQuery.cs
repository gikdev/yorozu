using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.ListTracksForContentItem;

public record ListTracksForContentItemQuery(Guid ContentItemId) : IRequest<ErrorOr<List<ConsumptionTrackSummaryDto>>>;
