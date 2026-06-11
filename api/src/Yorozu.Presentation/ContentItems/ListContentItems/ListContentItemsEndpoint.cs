using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.ListContentItems;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Domain.ContentItems;
using Yorozu.Presentation.ContentItems.Common;

namespace Yorozu.Presentation.ContentItems.ListContentItems;

internal class ListContentItemsEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("content-items", Handle)
            .WithName(nameof(ListContentItems))
            .WithSummary("List content items")
            .WithTags("Content Items")
            .Produces<ContentItemsResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender
    ) {
        var query = new ListContentItemsQuery();
        var result = await sender.Send(query);

        return result.MatchResponse(item => Results.Ok(MapToResponse(item)));
    }

    private static ContentItemsResponse MapToResponse(List<ContentItem> contentItems)
        => new() {
            Items = contentItems.ConvertAll(x => Mapper.MapToResponse(x)),
        };
}
