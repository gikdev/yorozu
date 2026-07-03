using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.ListAllContentItemTags;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ContentItems;

namespace Yorozu.Presentation.ContentItems.ListAllContentItemTags;

internal class ListAllContentItemTagsEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("content-items/tags", Handle)
            .WithName(nameof(ListAllContentItemTags))
            .WithSummary("List unique tags of content items")
            .WithTags(ApiTags.ContentItems)
            .Produces<ListAllContentItemTagsResponse>();
    }

    private static async Task<IResult> Handle([FromServices] ISender sender) {
        var query = new ListAllContentItemTagsQuery();
        var result = await sender.Send(query);

        return result.MatchResponse(item => Results.Ok(MapToResponse(item)));
    }

    private static ListAllContentItemTagsResponse MapToResponse(List<string> tags)
        => new() { Items = tags };
}
