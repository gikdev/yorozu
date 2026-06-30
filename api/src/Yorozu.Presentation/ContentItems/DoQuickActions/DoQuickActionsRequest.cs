using Yorozu.Common.Domain;

namespace Yorozu.Presentation.ContentItems.DoQuickActions;

public record DoQuickActionsRequest {
    public FlagAction? IsBookmarked { get; init; }
    public FlagAction? IsFavorite { get; init; }
    public FlagAction? IsSecret { get; init; }
}
