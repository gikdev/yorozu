using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;

namespace Yorozu.Application.ConsumptionTracks.ListAllTracks;

public record ListAllTracksQuery : IRequest<ErrorOr<List<ConsumptionTrackSummaryDto>>>;
