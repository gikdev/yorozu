using ErrorOr;
using MediatR;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.CreateContentItem;

internal class CreateContentItemCommandHandler(
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateContentItemCommand, ErrorOr<ContentItem>> {
    public async Task<ErrorOr<ContentItem>> Handle(CreateContentItemCommand request, CancellationToken cancellationToken) {
        var fullTitleResult = NotEmptyString.Create(request.FullTitle);
        if (fullTitleResult.IsError) return fullTitleResult.Errors;

        var contentItem = ContentItem.Create(fullTitleResult.Value, request.Format);

        if (request.NickName != null) {
            var nickNameResult = NotEmptyString.Create(request.NickName);
            if (nickNameResult.IsError) return nickNameResult.Errors;
            contentItem.ChangeNickName(nickNameResult.Value);
        }

        foreach (var tag in request.Tags) {
            var tagResult = NotEmptyString.Create(tag);
            if (tagResult.IsError) return tagResult.Errors;
            contentItem.EnsureTagAdded(tagResult.Value);
        }

        if (request.IsBookmarked) contentItem.ApplyBookmark(FlagAction.On);
        if (request.IsFavorite) contentItem.ApplyFavorite(FlagAction.On);
        if (request.IsSecret) contentItem.ApplySecret(FlagAction.On);
        if (request.IsOngoing) contentItem.ApplyOngoing(FlagAction.On);

        if (request.CoverImagePath != null) {
            var urlResult = NotEmptyString.Create(request.CoverImagePath);
            if (urlResult.IsError) return urlResult.Errors;
            contentItem.ChangeCoverImageUrl(urlResult.Value);
        }

        if (request.Location != null) {
            contentItem.ChangeLocation(new Location {
                Type = request.Location.Type,
                Value = request.Location.Value,
            });
        }

        contentItem.ChangeUnitSpec(request.UnitType, request.TotalUnits);

        contentItemRepository.Add(contentItem);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return contentItem;
    }
}
