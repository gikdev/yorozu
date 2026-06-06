using ErrorOr;

namespace Yorozu.Domain.ContentItems;

public class ConsumptionTrack {
    // ---------- errors ----------
    public static Error AlreadyStartedError { get; } = Error.Conflict(
        description: "Only idle tracks can be started.",
        code: "ConsumptionTrack.AlreadyStarted"
    );
    public static Error NotInProgressError { get; } = Error.Conflict(
        description: "Only in-progress tracks can perform this action.",
        code: "ConsumptionTrack.NotInProgress"
    );
    public static Error AlreadyCompletedError { get; } = Error.Conflict(
        description: "Cannot modify a completed track.",
        code: "ConsumptionTrack.AlreadyCompleted"
    );
    public static Error AlreadyDroppedError { get; } = Error.Conflict(
        description: "Cannot modify a dropped track.",
        code: "ConsumptionTrack.AlreadyDropped"
    );
    public static Error CannotExceedTotalUnitsError(int totalUnits) => Error.Validation(
        description: $"Cannot exceed total units ({totalUnits}).",
        code: "ConsumptionTrack.CannotExceedTotalUnits"
    );
    public static Error IncrementMustBePositiveError { get; } = Error.Validation(
        description: "Increment amount must be positive.",
        code: "ConsumptionTrack.IncrementMustBePositive"
    );
    public static Error DecrementMustBePositiveError { get; } = Error.Validation(
        description: "Decrement amount must be positive.",
        code: "ConsumptionTrack.DecrementMustBePositive"
    );
    public static Error CannotGoBelowZeroError { get; } = Error.Validation(
        description: "Current unit cannot go below zero.",
        code: "ConsumptionTrack.CannotGoBelowZero"
    );

    public Guid Id { get; private init; } = Guid.NewGuid();
    public IntentionType Type { get; private set; }
    public ConsumptionStatus Status { get; private set; } = ConsumptionStatus.Idle;
    public NonEmptyString Title { get; private set; } = null!;
    public int CurrentUnit { get; private set; }
    public NonEmptyString? Description { get; private set; }

    public DateTimeOffset? StartedAt { get; private set; }
    public DateTimeOffset? CompletedAt { get; private set; }
    public DateTimeOffset? DroppedAt { get; private set; }
    public DateTimeOffset? PausedAt { get; private set; }

    private ConsumptionTrack() { }

    public static ConsumptionTrack Create(
        IntentionType type,
        NonEmptyString title,
        NonEmptyString? description = null,
        Guid? id = null
    ) => new() {
        Id = id ?? Guid.NewGuid(),
        Type = type,
        Title = title,
        Description = description,
        Status = ConsumptionStatus.Idle,
        CurrentUnit = 0,
    };

    public ErrorOr<Success> Start() {
        if (Status != ConsumptionStatus.Idle)
            return AlreadyStartedError;

        Status = ConsumptionStatus.InProgress;
        StartedAt = DateTimeOffset.UtcNow;

        return Result.Success;
    }

    public ErrorOr<Success> Pause() {
        if (Status != ConsumptionStatus.InProgress)
            return NotInProgressError;

        Status = ConsumptionStatus.OnHold;
        PausedAt = DateTimeOffset.UtcNow;

        return Result.Success;
    }

    public ErrorOr<Success> Resume() {
        if (Status != ConsumptionStatus.OnHold)
            return Error.Conflict(
                description: "Only on-hold tracks can be resumed.",
                code: "ConsumptionTrack.NotOnHold"
            );

        Status = ConsumptionStatus.InProgress;

        return Result.Success;
    }

    public ErrorOr<Success> Complete() {
        if (Status != ConsumptionStatus.InProgress)
            return NotInProgressError;

        Status = ConsumptionStatus.Completed;
        CompletedAt = DateTimeOffset.UtcNow;

        return Result.Success;
    }

    public ErrorOr<Success> Drop() {
        if (Status.IsTerminal)
            return Status == ConsumptionStatus.Completed
                ? AlreadyCompletedError
                : AlreadyDroppedError;

        Status = ConsumptionStatus.Dropped;
        DroppedAt = DateTimeOffset.UtcNow;

        return Result.Success;
    }

    public ErrorOr<Success> SetProgress(int newValue, int? totalUnits) {
        if (!Status.AllowsProgress)
            return NotInProgressError;

        if (newValue < 0)
            return CannotGoBelowZeroError;

        if (totalUnits.HasValue && newValue > totalUnits.Value)
            return CannotExceedTotalUnitsError(totalUnits.Value);

        CurrentUnit = newValue;

        return Result.Success;
    }

    public ErrorOr<Success> IncrementProgress(int amount, int? totalUnits) {
        if (amount <= 0)
            return IncrementMustBePositiveError;

        if (!Status.AllowsProgress)
            return NotInProgressError;

        var newValue = CurrentUnit + amount;
        if (totalUnits.HasValue && newValue > totalUnits.Value)
            return CannotExceedTotalUnitsError(totalUnits.Value);

        CurrentUnit = newValue;
        
        return Result.Success;
    }

    public ErrorOr<Success> DecrementProgress(int amount) {
        if (amount <= 0)
            return DecrementMustBePositiveError;

        if (!Status.AllowsProgress)
            return NotInProgressError;

        var newValue = CurrentUnit - amount;
        if (newValue < 0)
            return CannotGoBelowZeroError;

        CurrentUnit = newValue;

        return Result.Success;
    }

    internal void ForceProgress(int newValue) {
        CurrentUnit = newValue;
    }

    internal void ForceComplete() {
        Status = ConsumptionStatus.Completed;
        CompletedAt = DateTimeOffset.UtcNow;
    }

    public override bool Equals(object? obj) => obj is ConsumptionTrack other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
