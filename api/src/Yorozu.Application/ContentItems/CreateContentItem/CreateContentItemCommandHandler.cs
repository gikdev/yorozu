using ErrorOr;
using MediatR;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.CreateContentItem;

internal class CreateContentItemCommandHandler(
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateContentItemCommand, ErrorOr<ContentItem>> {
    public async Task<ErrorOr<ContentItem>> Handle(CreateContentItemCommand request, CancellationToken cancellationToken) {
        var fullTitleResult = NotEmptyString.Create(request.FullTitle);
        if (fullTitleResult.IsError) return fullTitleResult.Errors;
        var fullTitle = fullTitleResult.Value;

        var contentItem = ContentItem.Create(
            fullTitle,
            request.Format
        );

        if (request.NickName != null) {
            var nickNameResult = NotEmptyString.Create(request.NickName);
            if (nickNameResult.IsError) return nickNameResult.Errors;
            var nickName = nickNameResult.Value;

            contentItem.ChangeNickName(nickName);
        }

        foreach (var tag in request.Tags) {
            var tagResult = NotEmptyString.Create(tag);
            if (tagResult.IsError) return tagResult.Errors;
            var finalTag = tagResult.Value;
            contentItem.AddTag(finalTag);
        }

        foreach (var genre in request.Genres)
            contentItem.AddGenre(genre);

        if (request.IsBookmarked) contentItem.Bookmark();
        if (request.IsFavorite) contentItem.Favorite();
        if (request.IsSecret) contentItem.MarkSecret();

        if (request.CoverImagePath != null) {
            var urlResult = NotEmptyString.Create(request.CoverImagePath);
            if (urlResult.IsError) return urlResult.Errors;
            var url = urlResult.Value;

            contentItem.SetCoverImageUrl(url);
        }

        if (request.Location != null) {
            var location = new Location {
                Type = request.Location.Type,
                Value = request.Location.Value,
            };

            contentItem.ChangeLocation(location);
        }

        if (request.UnitSpec != null) {
            var unitSpecResult = ContentUnitSpecification.Create(
                request.UnitSpec.IsOngoing,
                request.UnitSpec.UnitType,
                request.UnitSpec.TotalUnits
            );
            if (unitSpecResult.IsError) return unitSpecResult.Errors;
            var unitSpec = unitSpecResult.Value;

            contentItem.SetUnitSpecification(unitSpec);
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return contentItem;
    }
}
