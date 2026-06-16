using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Application.ContentItems.UpdateContentItem;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using Yorozu.Presentation.ContentItems.Common;

namespace Yorozu.Presentation.ContentItems.UpdateContentItem;

internal class UpdateContentItemEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPut("content-items/{id:guid}", Handle)
            .WithName(nameof(UpdateContentItem))
            .WithSummary("Update a content item")
            .WithTags("Content Items")
            .Accepts<UpdateContentItemRequest>("application/json")
            .Produces<ContentItemResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromRoute] Guid id,
        [FromBody] UpdateContentItemRequest request
    ) {
        var command = MapToCommand(id, request);
        var result = await sender.Send(command);

        return result.MatchResponse(item => Results.Ok(Mapper.MapToResponse(item)));
    }

    private static UpdateContentItemCommand MapToCommand(Guid id, UpdateContentItemRequest request)
        => new() {
            Id = id,
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
