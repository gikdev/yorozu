using ErrorOr;
using MediatR;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.GetContentItem;

internal sealed class GetContentItemQueryHandler(
    IContentItemRepository contentItemRepository
) : IRequestHandler<GetContentItemQuery, ErrorOr<ContentItem>> {
    public async Task<ErrorOr<ContentItem>> Handle(GetContentItemQuery request, CancellationToken cancellationToken) {
        var contentItem = await contentItemRepository.GetByIdAsync(request.Id, cancellationToken);
        if (contentItem is null) return Error.NotFound();

        return contentItem;
    }
}
