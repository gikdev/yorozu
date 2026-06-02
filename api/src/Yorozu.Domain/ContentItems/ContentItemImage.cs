namespace Yorozu.Domain.ContentItems;

public class ContentItemImage {
    public Guid Id { get; init; }
    public ImageSourceType SourceType { get; set; }
    public string Value { get; set; } = string.Empty;
}
