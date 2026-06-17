using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ConsumptionTracks.CompleteTrack;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ConsumptionTracks.Common;

namespace Yorozu.Presentation.ConsumptionTracks.CompleteTrack;

internal class CompleteTrackEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapPost("tracks/{id:guid}/complete", Handle)
            .WithName(nameof(CompleteTrackEndpoint))
            .WithSummary("Mark a track as completed")
            .WithTags(ApiTags.ConsumptionTracks)
            .Produces<ConsumptionTrackResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id
    ) {
        var command = new CompleteTrackCommand(id);
        var result = await sender.Send(command);
        return result.MatchResponse(dto => Results.Ok(Mapper.MapToResponse(dto)));
    }
}
