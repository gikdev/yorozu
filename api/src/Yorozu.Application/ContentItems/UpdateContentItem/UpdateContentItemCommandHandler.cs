using ErrorOr;
using MediatR;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.UpdateContentItem;

internal class UpdateContentItemCommandHandler(
    IContentItemRepository contentItemRepository,
    IConsumptionTrackRepository consumptionTrackRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateContentItemCommand, ErrorOr<ContentItem>> {
    public async Task<ErrorOr<ContentItem>> Handle(UpdateContentItemCommand request, CancellationToken cancellationToken) {
        var contentItem = await contentItemRepository.GetByIdAsync(request.Id, cancellationToken);
        if (contentItem is null) return Error.NotFound();

        var tracks = await consumptionTrackRepository.GetByContentItemIdAsync(contentItem.Id, cancellationToken);

        var fullTitleResult = NotEmptyString.Create(request.FullTitle);
        if (fullTitleResult.IsError) return fullTitleResult.Errors;
        contentItem.ChangeFullName(fullTitleResult.Value);

        contentItem.ChangeFormat(request.Format);

        if (request.NickName != null) {
            var nickNameResult = NotEmptyString.Create(request.NickName);
            if (nickNameResult.IsError) return nickNameResult.Errors;
            contentItem.ChangeNickName(nickNameResult.Value);
        } else {
            contentItem.ChangeNickName(null);
        }

        contentItem.ClearTags();
        foreach (var tag in request.Tags) {
            var tagResult = NotEmptyString.Create(tag);
            if (tagResult.IsError) return tagResult.Errors;
            contentItem.AddTag(tagResult.Value);
        }

        if (request.IsBookmarked) contentItem.Bookmark(); else contentItem.Unbookmark();
        if (request.IsFavorite) contentItem.Favorite(); else contentItem.Unfavorite();
        if (request.IsSecret) contentItem.MarkSecret(); else contentItem.UnmarkSecret();

        if (request.CoverImagePath != null) {
            var urlResult = NotEmptyString.Create(request.CoverImagePath);
            if (urlResult.IsError) return urlResult.Errors;
            contentItem.ChangeCoverImageUrl(urlResult.Value);
        } else {
            contentItem.ChangeCoverImageUrl(null);
        }

        contentItem.ChangeLocation(request.Location == null ? null : new Location {
            Type = request.Location.Type,
            Value = request.Location.Value,
        });

        if (request.UnitSpec != null) {
            var unitSpecResult = ContentUnitSpec.Create(
                request.UnitSpec.IsOngoing,
                request.UnitSpec.UnitType,
                request.UnitSpec.TotalUnits
            );
            if (unitSpecResult.IsError) return unitSpecResult.Errors;
            var result = contentItem.ChangeUnitSpec(unitSpecResult.Value, tracks.Count);
            if (result.IsError) return result.Errors;
        } else {
            var result = contentItem.ChangeUnitSpec(null, tracks.Count);
            if (result.IsError) return result.Errors;
        }

        contentItemRepository.Update(contentItem);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return contentItem;
    }
}
