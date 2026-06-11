using Yorozu.Presentation.ContentItems.Common;

namespace Yorozu.Presentation.ContentItems.ListContentItems;

internal record ContentItemsResponse {
    public required List<ContentItemResponse> Items { get; init; }
}
