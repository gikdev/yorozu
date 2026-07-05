using ErrorOr;
using MediatR;
using Yorozu.Application.Common;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.ListContentItems;

internal sealed class ListContentItemsQueryHandler(
    IContentItemRepository contentItemRepository
) : IRequestHandler<ListContentItemsQuery, ErrorOr<List<ContentItem>>> {
    public async Task<ErrorOr<List<ContentItem>>> Handle(ListContentItemsQuery request, CancellationToken cancellationToken) {
        var lists = await contentItemRepository.GetAllAsync(cancellationToken);

        return lists;
    }
}
