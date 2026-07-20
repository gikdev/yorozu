using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTrackLists.UpdateConsumptionTrackList;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ConsumptionTrackLists;
using Yorozu.Contracts.ContentItems;
using Yorozu.Presentation.Common.Mappers;

namespace Yorozu.Presentation.ConsumptionTrackLists.UpdateConsumptionTrackList;

internal class UpdateConsumptionTrackListEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPut("consumption-track-lists/{id:guid}", Handle)
            .WithName(nameof(UpdateConsumptionTrackList))
            .WithSummary("Update Consumption Track List")
            .WithTags(ApiTags.ConsumptionTrackLists)
            .Produces<ConsumptionTrackListMiniResponse>()
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status400BadRequest);
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid id,
        [FromBody] UpdateConsumptionTrackListRequest request,
        [FromServices] ISender sender,
        CancellationToken cancellationToken
    ) {
        var command = MapToCommand(id, request);

        var result = await sender.Send(command, cancellationToken);

        return result.MatchResponse(
            list => Results.Ok(list.ToMiniResponse())
        );
    }

    private static UpdateConsumptionListCommand MapToCommand(Guid id, UpdateConsumptionTrackListRequest request)
        => new() {
            Id = id,
            Description = request.Description,
            Title = request.Title,
        };
}
