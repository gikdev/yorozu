using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ConsumptionTracks.UpdateTrack;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;

namespace Yorozu.Presentation.ConsumptionTracks.UpdateTrack;

internal class UpdateTrackEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapPut("tracks/{id:guid}", Handle)
            .WithName(nameof(UpdateTrackEndpoint))
            .WithSummary("Update track metadata")
            .WithTags(ApiTags.ConsumptionTracks)
            .Accepts<UpdateTrackRequest>("application/json")
            .Produces<ConsumptionTrackSummaryDto>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id,
        [FromBody] UpdateTrackRequest request
    ) {
        var command = new UpdateTrackCommand {
            TrackId = id,
            Title = request.Title,
            Description = request.Description,
            Type = request.Type
        };

        var result = await sender.Send(command);

        return result.MatchResponse(dto => Results.Ok(dto));
    }
}
