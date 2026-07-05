using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTrackLists.GetConsumptionTrackList;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ConsumptionTrackLists;
using Yorozu.Contracts.ContentItems;
using Yorozu.Presentation.Common.Mappers;

namespace Yorozu.Presentation.ConsumptionTrackLists.GetConsumptionTrackList;

internal class GetConsumptionTrackListEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("consumption-track-lists/{id:guid}", Handle)
            .WithName(nameof(GetConsumptionTrackList))
            .WithSummary("Get Consumption Track List")
            .WithTags(ApiTags.ConsumptionTrackLists)
            .Produces<ConsumptionTrackListMiniResponse>()
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid id,
        [FromServices] ISender sender,
        CancellationToken cancellationToken
    ) {
        var query = new GetConsumptionTrackListQuery(id);
        var result = await sender.Send(query, cancellationToken);

        return result.MatchResponse(list => Results.Ok(
            list.ToMiniResponse()
        ));
    }
}
