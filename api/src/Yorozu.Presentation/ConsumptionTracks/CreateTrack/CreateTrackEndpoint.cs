using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ConsumptionTracks.CreateTrack;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;

namespace Yorozu.Presentation.ConsumptionTracks.CreateTrack;

internal class CreateTrackEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapPost("content-items/{contentItemId:guid}/tracks", Handle)
            .WithName(nameof(CreateTrackEndpoint))
            .WithSummary("Create a consumption track")
            .WithTags(ApiTags.ConsumptionTracks)
            .Accepts<CreateTrackRequest>("application/json")
            .Produces<ConsumptionTrackSummaryDto>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid contentItemId,
        [FromBody] CreateTrackRequest request
    ) {
        var command = new CreateTrackCommand {
            ContentItemId = contentItemId,
            Title = request.Title,
            Description = request.Description,
            Type = request.Type
        };
        var result = await sender.Send(command);
        return result.MatchResponse(dto => Results.Ok(dto));
    }
}
