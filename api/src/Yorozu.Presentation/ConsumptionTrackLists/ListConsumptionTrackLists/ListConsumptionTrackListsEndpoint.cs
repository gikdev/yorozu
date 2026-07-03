using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ConsumptionTrackLists.ListConsumptionTrackLists;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ConsumptionTrackLists;
using Yorozu.Domain.ConsumptionTrackLists;
using Yorozu.Presentation.Common.Mappers;

namespace Yorozu.Presentation.ConsumptionTrackLists.ListConsumptionTrackLists;

internal class ListConsumptionTrackListsEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("consumption-track-lists", Handle)
            .WithName(nameof(ListConsumptionTrackLists))
            .WithSummary("Get Consumption Track Lists")
            .WithTags(ApiTags.ConsumptionTrackLists)
            .Produces<ConsumptionTrackListsResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender
    ) {
        var query = new ListConsumptionTrackListsQuery();
        var result = await sender.Send(query);

        return result.MatchResponse(items => Results.Ok(
            MapToResponse(items)
        ));
    }

    private static ConsumptionTrackListsResponse MapToResponse(List<ConsumptionTrackList> items)
        => new() { Items = items.ConvertAll(i => i.ToMiniResponse()) };
}
