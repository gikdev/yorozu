using ErrorOr;
using MediatR;
using Yorozu.Application.ContentItems.Common;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.UpdateContentItem;

public record UpdateContentItemCommand : IRequest<ErrorOr<ContentItem>> {
    public required Guid Id { get; init; }
    public required string FullTitle { get; init; }
    public required ContentItemFormat Format { get; init; }
    public required string? NickName { get; init; }
    public required List<string> Tags { get; init; }
    public required bool IsSecret { get; init; }
    public required bool IsBookmarked { get; init; }
    public required bool IsFavorite { get; init; }
    public required string? CoverImagePath { get; init; }
    public required LocationDto? Location { get; init; }
    public required ContentUnitSpecDto? UnitSpec { get; init; }
}
