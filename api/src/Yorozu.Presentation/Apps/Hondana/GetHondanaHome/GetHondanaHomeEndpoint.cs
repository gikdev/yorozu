using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.Apps.Hondana.GetHondanaHome;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.Common.Mappers;

namespace Yorozu.Presentation.Apps.Hondana.GetHondanaHome;

internal class GetHondanaHomeEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("apps/hondana/home", Handle)
            .WithName(nameof(GetHondanaHome))
            .WithSummary("Get Hondana Home")
            .WithTags(ApiTags.ContentItems)
            .Produces<HondanaHomeResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender
    ) {
        var query = new GetHondanaHomeQuery();
        var result = await sender.Send(query);

        return result.MatchResponse(item => Results.Ok(
            MapToResponse(item)
        ));
    }

    private static HondanaHomeResponse MapToResponse(HondanaHomeDto dto) {
        var lists = dto.ConsumptionTrackLists.ConvertAll(
            i => i.ToMiniResponse()
        );

        return new() {
            ConsumptionTrackLists = lists
        };
    }
}
