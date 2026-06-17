using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.DoQuickActions;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ContentItems.Common;

namespace Yorozu.Presentation.ContentItems.DoQuickActions;

internal class DoQuickActionsEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPatch("content-items/{id:guid}/quick-actions", Handle)
            .WithName(nameof(DoQuickActions))
            .WithSummary("Do quick actions")
            .WithTags(ApiTags.ContentItems)
            .Accepts<DoQuickActionsRequest>("application/json")
            .Produces<ContentItemResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id,
        [FromBody] DoQuickActionsRequest request
    ) {
        var result = await sender.Send(new DoQuickActionsCommand {
            Id = id,
            IsBookmarked = request.IsBookmarked,
            IsFavorite = request.IsFavorite,
            IsSecret = request.IsSecret,
        });

        return result.MatchResponse(item => Results.Ok(Mapper.MapToResponse(item)));
    }
}
