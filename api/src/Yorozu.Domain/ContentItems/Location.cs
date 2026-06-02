namespace Yorozu.Domain.ContentItems;

public class Location {
    public required Guid Id { get; set; }
    public required LocationType Type { get; set; }
    public required string Value { get; set; }
    public required string Title { get; set; }
}

