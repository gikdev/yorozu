using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.DropTrack;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ConsumptionTracks.Common;

namespace Yorozu.Presentation.ConsumptionTracks.DropTrack;

internal class DropTrackEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapPost("tracks/{id:guid}/drop", Handle)
            .WithName(nameof(DropTrackEndpoint))
            .WithSummary("Drop a track")
            .WithTags(ApiTags.ConsumptionTracks)
            .Produces<ConsumptionTrackResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id) {
        var command = new DropTrackCommand(id);
        var result = await sender.Send(command);
        return result.MatchResponse(dto => Results.Ok(Mapper.MapToResponse(dto)));
    }
}
