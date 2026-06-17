using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.ListTracksForContentItem;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ConsumptionTracks.Common;

namespace Yorozu.Presentation.ConsumptionTracks.ListTracksForContentItem;

internal class ListTracksForContentItemEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapGet("content-items/{id:guid}/tracks", Handle)
            .WithName(nameof(ListTracksForContentItemEndpoint))
            .WithSummary("List tracks for a content item")
            .WithTags(ApiTags.ConsumptionTracks)
            .Produces<ConsumptionTrackSummariesResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id
    ) {
        var query = new ListTracksForContentItemQuery(id);
        var result = await sender.Send(query);
        return result.MatchResponse(tracks => Results.Ok(new ConsumptionTrackSummariesResponse { Items = tracks }));
    }
}
