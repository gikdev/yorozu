using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTrackLists.DeleteConsumptionTrackList;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;

namespace Yorozu.Presentation.ConsumptionTrackLists.DeleteConsumptionTrackList;

internal class DeleteConsumptionTrackListEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapDelete("consumption-track-lists/{id:guid}", Handle)
            .WithName(nameof(DeleteConsumptionTrackList))
            .WithSummary("Delete Consumption Track List")
            .WithTags(ApiTags.ConsumptionTrackLists)
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid id,
        [FromServices] ISender sender,
        CancellationToken cancellationToken
    ) {
        var command = MapToCommand(id);

        var result = await sender.Send(command, cancellationToken);

        return result.MatchResponse();
    }

    private static DeleteConsumptionTrackListCommand MapToCommand(Guid id)
        => new(id);
}
