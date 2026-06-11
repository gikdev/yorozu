using ErrorOr;
using MediatR;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.ListContentItems;

internal class ListContentItemsQueryHandler(
    IContentItemRepository contentItemRepository
) : IRequestHandler<ListContentItemsQuery, ErrorOr<List<ContentItem>>> {
    public async Task<ErrorOr<List<ContentItem>>> Handle(ListContentItemsQuery request, CancellationToken cancellationToken) {
        var contentItems = await contentItemRepository.ListAsync(cancellationToken);

        return contentItems;
    }
}
