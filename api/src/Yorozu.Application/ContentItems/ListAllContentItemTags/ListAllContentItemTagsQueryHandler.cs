using ErrorOr;
using MediatR;
using Yorozu.Application.ContentItems.Common;

namespace Yorozu.Application.ContentItems.ListAllContentItemTags;

internal sealed class ListAllContentItemTagsQueryHandler(
    IContentItemRepository contentItemRepository
) : IRequestHandler<ListAllContentItemTagsQuery, ErrorOr<List<string>>> {
    public async Task<ErrorOr<List<string>>> Handle(ListAllContentItemTagsQuery request, CancellationToken cancellationToken) {
        var tags = await contentItemRepository.GetAllTagsAsync(cancellationToken);

        return tags;
    }
}
