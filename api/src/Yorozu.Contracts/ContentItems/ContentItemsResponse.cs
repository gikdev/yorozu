namespace Yorozu.Contracts.ContentItems;

public sealed record ContentItemsResponse {
    public required List<ContentItemResponse> Items { get; init; }
}
