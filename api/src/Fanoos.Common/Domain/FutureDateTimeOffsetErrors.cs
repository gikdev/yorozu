using ErrorOr;

namespace Fanoos.Common.Domain;

public static class FutureDateTimeOffsetErrors {
    public readonly static Error DateMustBeInTheFuture = Error.Validation(
        description: "Date must be in the future!",
        code: "FutureDateTimeOffset.DateMustBeInTheFuture"
    );
}
