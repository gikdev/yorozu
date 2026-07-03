using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTrackLists.CreateConsumptionTrackList;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ConsumptionTrackLists;
using Yorozu.Presentation.Common.Mappers;

namespace Yorozu.Presentation.ConsumptionTrackLists.CreateConsumptionTrackList;

internal class CreateConsumptionTrackListEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPost("consumption-track-lists", Handle)
            .WithName(nameof(CreateConsumptionTrackList))
            .WithSummary("Create Consumption Track List")
            .WithTags(ApiTags.ConsumptionTrackLists)
            .Produces<ConsumptionTrackListMiniResponse>();
    }

    private static async Task<IResult> Handle(
        [FromBody] CreateConsumptionTrackListRequest request,
        [FromServices] ISender sender,
        CancellationToken cancellationToken
    ) {
        var command = MapToCommand(request);

        var result = await sender.Send(command, cancellationToken);

        return result.MatchResponse(list => Results.Ok(
            list.ToMiniResponse()
        ));
    }

    private static CreateConsumptionTrackListCommand MapToCommand(CreateConsumptionTrackListRequest req)
        => new() { Description = req.Description, Title = req.Title };
}
