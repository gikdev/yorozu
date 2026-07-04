using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Common.Data;

namespace Yorozu.Application.ContentItems.ChangeContentItem;

internal sealed class ChangeContentItemCommandHandler(
    IContentItemRepository contentItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ChangeContentItemCommand, ErrorOr<Updated>> {
    public async Task<ErrorOr<Updated>> Handle(ChangeContentItemCommand request, CancellationToken cancellationToken) {
        var existingItem = await contentItemRepository.GetByIdAsync(request.Id, cancellationToken);
        if (existingItem is null)
            return Error.NotFound("ContentItem.NotFound", $"Item with ID {request.Id} was not found.");

        if (request.IsBookmarked.HasValue)
            existingItem.ApplyBookmark(request.IsBookmarked.Value);

        if (request.IsFavorited.HasValue)
            existingItem.ApplyFavorite(request.IsFavorited.Value);

        if (request.IsSecret.HasValue)
            existingItem.ApplySecret(request.IsSecret.Value);

        contentItemRepository.Update(existingItem);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Updated;
    }
}
