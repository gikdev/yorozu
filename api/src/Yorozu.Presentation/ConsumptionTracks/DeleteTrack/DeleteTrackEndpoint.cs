using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.DeleteTrack;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;

namespace Yorozu.Presentation.ConsumptionTracks.DeleteTrack;

internal class DeleteTrackEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapDelete("tracks/{id:guid}", Handle)
            .WithName(nameof(DeleteTrackEndpoint))
            .WithSummary("Delete a track")
            .WithTags(ApiTags.ConsumptionTracks)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id
    ) {
        var command = new DeleteTrackCommand(id);
        var result = await sender.Send(command);
        return result.MatchResponse();
    }
}
