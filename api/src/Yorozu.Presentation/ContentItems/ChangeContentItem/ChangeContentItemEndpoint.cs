using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.ChangeContentItem;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ContentItems;

namespace Yorozu.Presentation.ContentItems.ChangeContentItem;

internal class ChangeContentItemEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPatch("content-items/{id:guid}", Handle)
            .WithName(nameof(ChangeContentItem))
            .WithSummary("Change Content Item")
            .WithTags(ApiTags.ContentItems)
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .ProducesProblem(StatusCodes.Status400BadRequest);
    }

    private static async Task<IResult> Handle(
        [FromRoute] Guid id,
        [FromBody] ChangeContentItemRequest request,
        [FromServices] ISender sender,
        CancellationToken cancellationToken
    ) {
        var command = MapToCommand(id, request);

        var result = await sender.Send(command, cancellationToken);

        return result.MatchResponse();
    }

    private static ChangeContentItemCommand MapToCommand(Guid id, ChangeContentItemRequest request)
        => new() {
            Id = id,
            IsBookmarked = (Yorozu.Common.Domain.FlagAction?)request.IsBookmarked,
            IsFavorited = (Yorozu.Common.Domain.FlagAction?)request.IsFavorited,
            IsSecret = (Yorozu.Common.Domain.FlagAction?)request.IsSecret,
        };
}
