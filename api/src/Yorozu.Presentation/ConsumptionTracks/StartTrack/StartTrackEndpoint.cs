using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.StartTrack;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ConsumptionTracks.Common;

namespace Yorozu.Presentation.ConsumptionTracks.StartTrack;

internal class StartTrackEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapPost("tracks/{id:guid}/start", Handle)
            .WithName(nameof(StartTrackEndpoint))
            .WithSummary("Start a track")
            .WithTags(ApiTags.ConsumptionTracks)
            .Produces<ConsumptionTrackResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id
    ) {
        var command = new StartTrackCommand(id);
        var result = await sender.Send(command);
        return result.MatchResponse(dto => Results.Ok(Mapper.MapToResponse(dto)));
    }
}
