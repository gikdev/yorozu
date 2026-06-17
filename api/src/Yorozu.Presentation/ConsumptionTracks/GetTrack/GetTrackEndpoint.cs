using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ConsumptionTracks.GetTrack;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;

namespace Yorozu.Presentation.ConsumptionTracks.GetTrack;

internal class GetTrackEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapGet("tracks/{id:guid}", Handle)
            .WithName(nameof(GetTrackEndpoint))
            .WithSummary("Get a single track")
            .WithTags(ApiTags.ConsumptionTracks)
            .Produces<ConsumptionTrackSummaryDto>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id
    ) {
        var query = new GetTrackQuery(id);
        var result = await sender.Send(query);
        return result.MatchResponse(dto => Results.Ok(dto));
    }
}
