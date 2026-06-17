using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Application.ContentItems.CreateContentItem;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ContentItems.Common;

namespace Yorozu.Presentation.ContentItems.CreateContentItem;

internal class CreateContentItemEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPost("content-items", Handle)
            .WithName(nameof(CreateContentItem))
            .WithSummary("Create new content item")
            .WithTags(ApiTags.ContentItems)
            .Accepts<CreateContentItemRequest>("application/json")
            .Produces<ContentItemResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromBody] CreateContentItemRequest request
    ) {
        var command = MapToCommand(request);
        var result = await sender.Send(command);

        return result.MatchResponse(item => Results.Ok(Mapper.MapToResponse(item)));
    }

    private static CreateContentItemCommand MapToCommand(CreateContentItemRequest request)
        => new() {
            CoverImagePath = request.CoverImagePath,
            Format = request.Format,
            FullTitle = request.FullTitle,
            IsBookmarked = request.IsBookmarked,
            IsFavorite = request.IsFavorite,
            IsSecret = request.IsSecret,
            Location = request.Location == null ? null : new LocationDto(request.Location.Type, request.Location.Value),
            NickName = request.NickName,
            Tags = request.Tags,
            UnitSpec = request.UnitSpec == null ? null : new ContentUnitSpecDto(request.UnitSpec.IsOngoing, request.UnitSpec.UnitType, request.UnitSpec.TotalUnits),
        };
}
