using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.GetContentItem;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ContentItems;
using Yorozu.Presentation.Common.Mappers;

namespace Yorozu.Presentation.ContentItems.GetContentItem;

internal class GetContentItemEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("content-items/{id:guid}", Handle)
            .WithName(nameof(GetContentItem))
            .WithSummary("Get Content Item")
            .WithTags(ApiTags.ContentItems)
            .Produces<ContentItemResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id,
        CancellationToken cancellationToken
    ) {
        var query = new GetContentItemQuery(id);
        var result = await sender.Send(query, cancellationToken);

        return result.MatchResponse(item => Results.Ok(
            item.ToResponse()
        ));
    }
}
