using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.ListContentItems;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ContentItems;
using Yorozu.Domain.ContentItems;
using Yorozu.Presentation.Common.Mappers;

namespace Yorozu.Presentation.ContentItems.ListContentItems;

internal class ListContentItemsEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("content-items", Handle)
            .WithName(nameof(ListContentItems))
            .WithSummary("List Content Items")
            .WithTags(ApiTags.ContentItems)
            .Produces<ContentItemsResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        CancellationToken cancellationToken
    ) {
        var query = new ListContentItemsQuery();
        var result = await sender.Send(query, cancellationToken);

        return result.MatchResponse(items => Results.Ok(
            MapToResponse(items)
        ));
    }

    private static ContentItemsResponse MapToResponse(List<ContentItem> items)
        => new() { Items = items.ConvertAll(i => i.ToMiniResponse()) };
}
