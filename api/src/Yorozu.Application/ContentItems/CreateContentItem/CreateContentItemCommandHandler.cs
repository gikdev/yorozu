#pragma warning disable CA1056 // URI-like properties should not be strings

using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.CreateContentItem;

internal sealed class CreateContentItemCommandHandler(
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateContentItemCommand, ErrorOr<Created>> {
    public async Task<ErrorOr<Created>> Handle(
        CreateContentItemCommand request,
        CancellationToken cancellationToken
    ) {
        // 1. Validate required fields (using your ValueObjects)
        var fullTitleResult = NotEmptyString.Create(request.FullTitle);
        if (fullTitleResult.IsError)
            return fullTitleResult.Errors;

        // 2. Create the domain entity
        var item = ContentItem.Create(
            fullTitleResult.Value,
            request.Format
        );

        // 3. Apply nick name (optional)
        if (request.NickName is not null) {
            var nickNameResult = NotEmptyString.Create(request.NickName);
            if (nickNameResult.IsError)
                return nickNameResult.Errors;
            item.ChangeNickName(nickNameResult.Value);
        }

        // 4. Apply unit spec
        var unitTypeResult = NotEmptyString.Create(request.UnitType);
        if (unitTypeResult.IsError)
            return unitTypeResult.Errors;
        item.ChangeUnitSpec(unitTypeResult.Value, request.TotalUnits);

        // 5. Apply cover image (optional)
        if (request.CoverImageUrl is not null) {
            var coverResult = NotEmptyString.Create(request.CoverImageUrl);
            if (coverResult.IsError)
                return coverResult.Errors;
            item.ChangeCoverImageUrl(coverResult.Value);
        }

        // 6. Apply placeholder color
        item.SetPlaceholderColor(request.PlaceholderColor);

        // 7. Apply location (if provided)
        if (request.LocationType.HasValue && !string.IsNullOrEmpty(request.LocationValue)) {
            var locationValueResult = NotEmptyString.Create(request.LocationValue);
            if (locationValueResult.IsError) return locationValueResult.Errors;
            item.ChangeLocation(new Location(request.LocationType.Value, locationValueResult.Value));
        }

        // 8. Apply tags
        foreach (var tag in request.Tags) {
            var tagResult = NotEmptyString.Create(tag);
            if (tagResult.IsError)
                return tagResult.Errors;
            item.EnsureTagAdded(tagResult.Value);
        }

        // 9. Apply flags (these add tags internally)
        if (request.IsSecret)
            item.ApplySecret(FlagAction.On);
        if (request.IsFavorited)
            item.ApplyFavorite(FlagAction.On);
        if (request.IsBookmarked)
            item.ApplyBookmark(FlagAction.On);
        if (request.IsOngoing)
            item.ApplyOngoing(FlagAction.On);

        // 10. Save
        contentItemRepository.Add(item);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Created;
    }
}
