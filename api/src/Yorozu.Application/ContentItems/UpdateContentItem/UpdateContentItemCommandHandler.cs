using ErrorOr;
using MediatR;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.UpdateContentItem;

internal class UpdateContentItemCommandHandler(
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateContentItemCommand, ErrorOr<ContentItem>> {
    public async Task<ErrorOr<ContentItem>> Handle(UpdateContentItemCommand request, CancellationToken cancellationToken) {
        var contentItem = await contentItemRepository.GetByIdAsync(request.Id, cancellationToken);
        if (contentItem is null) return Error.NotFound();

        var fullTitleResult = NotEmptyString.Create(request.FullTitle);
        if (fullTitleResult.IsError) return fullTitleResult.Errors;
        contentItem.ChangeFullTitle(fullTitleResult.Value);

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
            contentItem.EnsureTagAdded(tagResult.Value);
        }

        contentItem.ApplyBookmark(request.IsBookmarked ? FlagAction.On : FlagAction.Off);
        contentItem.ApplySecret(request.IsSecret ? FlagAction.On : FlagAction.Off);
        contentItem.ApplyFavorite(request.IsFavorite ? FlagAction.On : FlagAction.Off);
        contentItem.ApplyOngoing(request.IsOngoing ? FlagAction.On : FlagAction.Off);

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

        contentItem.ChangeUnitSpec(
            request.UnitType,
            request.TotalUnits
        );

        contentItemRepository.Update(contentItem);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return contentItem;
    }
}
