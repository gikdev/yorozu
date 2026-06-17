using ErrorOr;

namespace Yorozu.Domain.ConsumptionTracks;

public static class ConsumptionTrackErrors {
    public static Error AlreadyStartedError { get; } = Error.Conflict(
        description: "Only idle tracks can be started.",
        code: "ConsumptionTrack.AlreadyStarted"
    );

    public static Error NotInProgressError { get; } = Error.Conflict(
        description: "Only in-progress tracks can perform this action.",
        code: "ConsumptionTrack.NotInProgress"
    );

    public static Error NotOnHoldError { get; } = Error.Conflict(
        description: "Only on-hold tracks can be resumed.",
        code: "ConsumptionTrack.NotOnHold"
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
}
