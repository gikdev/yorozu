using Yorozu.Common.Domain;

namespace Yorozu.Presentation.ContentItems.DoQuickActions;

public record DoQuickActionsRequest {
    public TriState? IsBookmarked { get; init; }
    public TriState? IsFavorite { get; init; }
    public TriState? IsSecret { get; init; }
}
