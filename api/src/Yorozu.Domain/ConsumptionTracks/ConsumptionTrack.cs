using ErrorOr;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Domain.ConsumptionTracks;

public class ConsumptionTrack : IAggregateRoot, IHasTimestamps {
    public Guid Id { get; private init; } = Guid.NewGuid();
    public Guid ContentItemId { get; private init; }
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    public IntentionType Type { get; private set; }
    public ConsumptionStatus Status { get; private set; } = ConsumptionStatus.Idle;
    public string Title { get; private set; } = null!;
    public int CurrentUnit { get; private set; }
    public int? TotalUnits { get; private set; }
    public string? Description { get; private set; }

    public DateTimeOffset? StartedAt { get; private set; }
    public DateTimeOffset? CompletedAt { get; private set; }
    public DateTimeOffset? DroppedAt { get; private set; }
    public DateTimeOffset? PausedAt { get; private set; }

    public bool CanStart => Status == ConsumptionStatus.Idle;
    public bool CanPause => Status == ConsumptionStatus.InProgress;
    public bool CanResume => Status == ConsumptionStatus.OnHold;
    public bool CanComplete => Status == ConsumptionStatus.InProgress;
    public bool CanDrop => !Status.IsTerminal;
    public bool CanProgress => Status.AllowsProgress;
    public bool CanDecrement => Status.AllowsProgress && CurrentUnit > 0;

    private ConsumptionTrack() { }

    public static ConsumptionTrack Create(
        Guid contentItemId,
        int? totalUnits,
        IntentionType type,
        NotEmptyString title,
        NotEmptyString? description = null
    ) => new() {
        ContentItemId = contentItemId,
        TotalUnits = totalUnits,
        Type = type,
        Title = title,
        Description = description?.Value,
    };

    public ErrorOr<Success> Start() {
        if (Status != ConsumptionStatus.Idle)
            return ConsumptionTrackErrors.AlreadyStartedError;

        Status = ConsumptionStatus.InProgress;
        StartedAt = DateTimeOffset.UtcNow;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> Pause() {
        if (Status != ConsumptionStatus.InProgress)
            return ConsumptionTrackErrors.NotInProgressError;

        Status = ConsumptionStatus.OnHold;
        PausedAt = DateTimeOffset.UtcNow;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> Resume() {
        if (Status != ConsumptionStatus.OnHold)
            return ConsumptionTrackErrors.NotOnHoldError;

        Status = ConsumptionStatus.InProgress;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> Complete() {
        if (Status != ConsumptionStatus.InProgress)
            return ConsumptionTrackErrors.NotInProgressError;

        Status = ConsumptionStatus.Completed;
        CompletedAt = DateTimeOffset.UtcNow;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> Drop() {
        if (Status.IsTerminal)
            return Status == ConsumptionStatus.Completed
                ? ConsumptionTrackErrors.AlreadyCompletedError
                : ConsumptionTrackErrors.AlreadyDroppedError;

        Status = ConsumptionStatus.Dropped;
        DroppedAt = DateTimeOffset.UtcNow;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> SetProgress(int newValue) {
        if (!Status.AllowsProgress)
            return ConsumptionTrackErrors.NotInProgressError;

        if (newValue < 0)
            return ConsumptionTrackErrors.CannotGoBelowZeroError;

        if (TotalUnits.HasValue && newValue > TotalUnits.Value)
            return ConsumptionTrackErrors.CannotExceedTotalUnitsError(TotalUnits.Value);

        CurrentUnit = newValue;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> IncrementProgress(int amount) {
        if (amount <= 0)
            return ConsumptionTrackErrors.IncrementMustBePositiveError;

        if (!Status.AllowsProgress)
            return ConsumptionTrackErrors.NotInProgressError;

        var newValue = CurrentUnit + amount;
        if (TotalUnits.HasValue && newValue > TotalUnits.Value)
            return ConsumptionTrackErrors.CannotExceedTotalUnitsError(TotalUnits.Value);

        CurrentUnit = newValue;

        MarkUpdated();
        return Result.Success;
    }

    public void SyncTotalUnits(int? totalUnits) {
        TotalUnits = totalUnits;
        MarkUpdated();
    }

    public ErrorOr<Success> DecrementProgress(int amount) {
        if (amount <= 0)
            return ConsumptionTrackErrors.DecrementMustBePositiveError;

        if (!Status.AllowsProgress)
            return ConsumptionTrackErrors.NotInProgressError;

        var newValue = CurrentUnit - amount;
        if (newValue < 0)
            return ConsumptionTrackErrors.CannotGoBelowZeroError;

        CurrentUnit = newValue;

        MarkUpdated();
        return Result.Success;
    }

    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;

    public override bool Equals(object? obj) => obj is ConsumptionTrack other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
