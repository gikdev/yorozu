namespace Yorozu.Contracts.ContentItems;

public sealed record ListAllContentItemTagsResponse {
    public required List<string> Items { get; init; }
}
