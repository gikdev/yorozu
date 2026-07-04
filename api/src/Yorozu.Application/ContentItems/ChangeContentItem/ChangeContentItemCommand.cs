using ErrorOr;
using MediatR;
using Yorozu.Common.Domain;

namespace Yorozu.Application.ContentItems.ChangeContentItem;

public sealed record ChangeContentItemCommand : IRequest<ErrorOr<Updated>> {
    public required Guid Id { get; init; }
    public required FlagAction? IsSecret { get; init; }
    public required FlagAction? IsFavorited { get; init; }
    public required FlagAction? IsBookmarked { get; init; }
}
