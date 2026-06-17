#pragma warning disable CA1056 // URI-like properties should not be strings

using Yorozu.Domain.ConsumptionTracks;

namespace Yorozu.Application.ConsumptionTracks.Common;

// TODO: Ain't a summary... it's a "full" variant or sth...
public record ConsumptionTrackSummaryDto {
    public required Guid Id { get; init; }
    public required Guid ContentItemId { get; init; }
    public required string ContentItemTitle { get; init; }
    public required string? ContentItemCoverImageUrl { get; init; }
    public required string ContentItemPlaceholderColor { get; init; }
    public required IntentionType Type { get; init; }
    public required ConsumptionStatus Status { get; init; }
    public required string Title { get; init; }
    public required int CurrentUnit { get; init; }
    public required int? TotalUnits { get; init; }
    public required string? Description { get; init; }
    public required DateTimeOffset CreatedAt { get; init; }
    public required DateTimeOffset? UpdatedAt { get; init; }
    public required DateTimeOffset? StartedAt { get; init; }
    public required DateTimeOffset? CompletedAt { get; init; }
    public required DateTimeOffset? DroppedAt { get; init; }
    public required DateTimeOffset? PausedAt { get; init; }
    public required bool CanStart { get; init; }
    public required bool CanPause { get; init; }
    public required bool CanResume { get; init; }
    public required bool CanComplete { get; init; }
    public required bool CanDrop { get; init; }
    public required bool CanProgress { get; init; }
    public required bool CanDecrement { get; init; }
}
