namespace Yorozu.Presentation.ContentItems.ListAllContentItemTags;

internal record AllContentItemTagsResponse {
    public required List<string> Items { get; init; }
}
