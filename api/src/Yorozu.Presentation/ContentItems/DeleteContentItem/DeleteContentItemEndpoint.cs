using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.DeleteContentItem;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;

namespace Yorozu.Presentation.ContentItems.DeleteContentItem;

internal class DeleteContentItemEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapDelete("content-items/{id:guid}", Handle)
            .WithName(nameof(DeleteContentItem))
            .WithSummary("Delete a content item")
            .WithTags("Content Items");
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id
    ) {
        var result = await sender.Send(new DeleteContentItemCommand(id));
        return result.MatchResponse(_ => Results.NoContent());
    }
}
