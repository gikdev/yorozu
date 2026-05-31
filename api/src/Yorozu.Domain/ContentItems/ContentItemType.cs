#pragma warning disable CA1008 // Enums should have zero value

namespace Yorozu.Domain.ContentItems;

public enum ContentItemType {
    Readable = 1,
    Listenable = 2,
    Watchable = 3,
}
