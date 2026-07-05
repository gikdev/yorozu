namespace Yorozu.Contracts.ContentItems;

public sealed record ContentItemsResponse {
    public required List<ContentItemMiniResponse> Items { get; init; }
}
