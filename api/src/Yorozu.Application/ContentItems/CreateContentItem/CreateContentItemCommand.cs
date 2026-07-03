#pragma warning disable CA1056 // URI-like properties should not be strings

using ErrorOr;
using MediatR;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Application.ContentItems.CreateContentItem;

public sealed record CreateContentItemCommand : IRequest<ErrorOr<Created>> {
    public required string FullTitle { get; init; }
    public required string? NickName { get; init; }
    public required List<string> Tags { get; init; }
    public required bool IsSecret { get; init; }
    public required bool IsFavorited { get; init; }
    public required bool IsBookmarked { get; init; }
    public required bool IsOngoing { get; init; }
    public required string? CoverImageUrl { get; init; }
    public required string? PlaceholderColor { get; init; }
    public required ContentItemFormat Format { get; init; }
    public required LocationType? LocationType { get; init; }
    public required string? LocationValue { get; init; }
    public required string UnitType { get; init; }
    public required int? TotalUnits { get; init; }
}
