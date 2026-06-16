using ErrorOr;
using MediatR;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.DoQuickActions;

internal class DoQuickActionsCommandHandler(
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DoQuickActionsCommand, ErrorOr<ContentItem>> {
    public async Task<ErrorOr<ContentItem>> Handle(DoQuickActionsCommand request, CancellationToken cancellationToken) {
        var contentItem = await contentItemRepository.GetByIdAsync(request.Id, cancellationToken);
        if (contentItem is null) return Error.NotFound();

        if (request.IsBookmarked == TriState.On) contentItem.Bookmark();
        else if (request.IsBookmarked == TriState.Off) contentItem.Unbookmark();
        else if (request.IsBookmarked == TriState.Toggle) contentItem.ToggleBookmark();

        if (request.IsFavorite == TriState.On) contentItem.Favorite();
        else if (request.IsFavorite == TriState.Off) contentItem.Unfavorite();
        else if (request.IsFavorite == TriState.Toggle) contentItem.ToggleFavorite();

        if (request.IsSecret == TriState.On) contentItem.MarkSecret();
        else if (request.IsSecret == TriState.Off) contentItem.UnmarkSecret();
        else if (request.IsSecret == TriState.Toggle) contentItem.ToggleSecret();

        contentItemRepository.Update(contentItem);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return contentItem;
    }
}
