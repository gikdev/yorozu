using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.GetContentItem;

internal sealed class GetContentItemQueryHandler(
    IContentItemRepository contentItemRepository
) : IRequestHandler<GetContentItemQuery, ErrorOr<ContentItem>> {
    public async Task<ErrorOr<ContentItem>> Handle(GetContentItemQuery request, CancellationToken cancellationToken) {
        var existingItem = await contentItemRepository.GetByIdAsync(request.Id, cancellationToken);
        if (existingItem is null)
            return Error.NotFound("ContentItem.NotFound", $"Item with ID {request.Id} was not found.");

        return existingItem;
    }
}
