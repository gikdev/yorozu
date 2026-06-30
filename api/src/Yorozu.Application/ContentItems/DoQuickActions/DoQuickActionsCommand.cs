using ErrorOr;
using MediatR;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.DoQuickActions;

public record DoQuickActionsCommand : IRequest<ErrorOr<ContentItem>> {
    public required Guid Id { get; init; }
    public FlagAction? BookmarkAction { get; init; }
    public FlagAction? FavoriteAction { get; init; }
    public FlagAction? SecretAction { get; init; }
}
