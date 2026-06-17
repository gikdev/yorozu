using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.GetContentItem;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ContentItems.Common;

namespace Yorozu.Presentation.ContentItems.GetContentItem;

internal class ListContentItemsEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("content-items/{id:guid}", Handle)
            .WithName(nameof(GetContentItem))
            .WithSummary("Get content item")
            .WithTags(ApiTags.ContentItems)
            .Produces<ContentItemResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id
    ) {
        var query = new GetContentItemQuery(id);
        var result = await sender.Send(query);

        return result.MatchResponse(item => Results.Ok(Mapper.MapToResponse(item)));
    }
}
