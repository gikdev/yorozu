#pragma warning disable CA1056 // URI-like properties should not be strings

namespace Yorozu.Domain.ContentItems;

public class CoverImage {
    public required string Url { get; set; }
}
