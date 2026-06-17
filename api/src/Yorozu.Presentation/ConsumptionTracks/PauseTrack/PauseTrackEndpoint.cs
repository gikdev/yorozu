using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ConsumptionTracks.PauseTrack;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;

namespace Yorozu.Presentation.ConsumptionTracks.PauseTrack;

internal class PauseTrackEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapPost("tracks/{id:guid}/pause", Handle)
            .WithName(nameof(PauseTrackEndpoint))
            .WithSummary("Pause a track")
            .WithTags(ApiTags.ConsumptionTracks)
            .Produces<ConsumptionTrackSummaryDto>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id
    ) {
        var command = new PauseTrackCommand(id);
        var result = await sender.Send(command);
        return result.MatchResponse(dto => Results.Ok(dto));
    }
}
