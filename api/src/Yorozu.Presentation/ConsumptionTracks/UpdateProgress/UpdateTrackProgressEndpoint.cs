using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTracks.UpdateProgress;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ConsumptionTracks.Common;

namespace Yorozu.Presentation.ConsumptionTracks.UpdateProgress;

internal class UpdateTrackProgressEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app.MapPatch("tracks/{id:guid}/progress", Handle)
            .WithName(nameof(UpdateTrackProgressEndpoint))
            .WithSummary("Update track progress")
            .WithTags(ApiTags.ConsumptionTracks)
            .Accepts<UpdateProgressRequest>("application/json")
            .Produces<ConsumptionTrackResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id,
        [FromBody] UpdateProgressRequest request
    ) {
        var command = new UpdateTrackProgressCommand {
            TrackId = id,
            Action = request.Action,
            Amount = request.Amount
        };
        var result = await sender.Send(command);
        return result.MatchResponse(dto => Results.Ok(Mapper.MapToResponse(dto)));
    }
}
