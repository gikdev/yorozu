#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable IDE1006 // Naming Styles

using ErrorOr;

namespace Yorozu.Common.Domain;

public sealed record FutureDateTimeOffset {
    private FutureDateTimeOffset() { }

    public DateTimeOffset Value { get; init; }

    public static ErrorOr<FutureDateTimeOffset> Create(DateTimeOffset value, DateTimeOffset now) {
        if (value <= now) return FutureDateTimeOffsetErrors.DateMustBeInTheFuture;

        var futureDateTimeOffset = new FutureDateTimeOffset {
            Value = value,
        };

        return futureDateTimeOffset;
    }

    /// <summary>
    /// Intended for restoring from DB or sth ONLY!
    /// </summary>
    public static FutureDateTimeOffset _Restore(DateTimeOffset value) {
        var futureDateTimeOffset = new FutureDateTimeOffset {
            Value = value,
        };

        return futureDateTimeOffset;
    }
}
