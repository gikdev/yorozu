using ErrorOr;
using MediatR;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.DoQuickActions;

public record DoQuickActionsCommand : IRequest<ErrorOr<ContentItem>> {
    public required Guid Id { get; init; }
    public TriState? IsBookmarked { get; init; }
    public TriState? IsFavorite { get; init; }
    public TriState? IsSecret { get; init; }
}
