using ErrorOr;
using MediatR;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Common.Data;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.DoQuickActions;

internal sealed class DoQuickActionsCommandHandler(
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DoQuickActionsCommand, ErrorOr<ContentItem>> {
    public async Task<ErrorOr<ContentItem>> Handle(DoQuickActionsCommand request, CancellationToken cancellationToken) {
        var contentItem = await contentItemRepository.GetByIdAsync(request.Id, cancellationToken);
        if (contentItem is null) return Error.NotFound();

        if (request.BookmarkAction.HasValue)
            contentItem.ApplyBookmark(request.BookmarkAction.Value);

        if (request.FavoriteAction.HasValue)
            contentItem.ApplyFavorite(request.FavoriteAction.Value);

        if (request.SecretAction.HasValue)
            contentItem.ApplySecret(request.SecretAction.Value);

        contentItemRepository.Update(contentItem);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return contentItem;
    }
}
