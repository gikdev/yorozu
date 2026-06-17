using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.ListAllTracks;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ConsumptionTracks.Common;

namespace Yorozu.Presentation.ConsumptionTracks.ListAllTracks;

internal class ListAllTracksEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapGet("tracks", Handle)
            .WithName(nameof(ListAllTracksEndpoint))
            .WithSummary("List all tracks")
            .WithTags(ApiTags.ConsumptionTracks)
            .Produces<ConsumptionTracksResponse>();
    }

    private static async Task<IResult> Handle([FromServices] ISender sender) {
        var query = new ListAllTracksQuery();
        var result = await sender.Send(query);
        return result.MatchResponse(tracks => Results.Ok(
            new ConsumptionTracksResponse {
                Items = tracks.ConvertAll(Mapper.MapToResponse)
            }
        ));
    }
}
