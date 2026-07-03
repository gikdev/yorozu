using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.CreateContentItem;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Contracts.ContentItems;

namespace Yorozu.Presentation.ContentItems.CreateContentItem;

internal class CreateContentItemEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPost("content-items", Handle)
            .WithName(nameof(CreateContentItem))
            .WithSummary("Create Content Item")
            .WithTags(ApiTags.ContentItems)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        [FromBody] CreateContentItemRequest request,
        [FromServices] ISender sender,
        CancellationToken cancellationToken
    ) {
        var command = MapToCommand(request);

        var result = await sender.Send(command, cancellationToken);

        return result.MatchResponse();
    }

    private static CreateContentItemCommand MapToCommand(CreateContentItemRequest req)
        => new() {
            FullTitle = req.FullTitle,
            NickName = req.NickName,
            Tags = req.Tags,
            IsSecret = req.IsSecret,
            IsFavorited = req.IsFavorited,
            IsBookmarked = req.IsBookmarked,
            IsOngoing = req.IsOngoing,
            CoverImageUrl = req.CoverImageUrl,
            PlaceholderColor = req.PlaceholderColor,
            Format = (Domain.ContentItems.ContentItemFormat)req.Format,
            LocationType = (Domain.ContentItems.LocationType)req.LocationType,
            LocationValue = req.LocationValue,
            UnitType = req.UnitType,
            TotalUnits = req.TotalUnits
        };
}
