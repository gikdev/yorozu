#pragma warning disable CA1707 // Identifiers should not contain underscores
#pragma warning disable IDE1006 // Naming Styles

using System.Text.Json.Serialization;
using ErrorOr;

namespace Fanoos.Common.Domain;

public sealed record FutureDateTimeOffset {
    private FutureDateTimeOffset() { }

    public DateTimeOffset Value { get; init; }


    [JsonConstructor]
    public FutureDateTimeOffset(DateTimeOffset value) {
        // TODO: TEMP FIX: this should not be used in API contracts level
        if (value <= DateTimeOffset.UtcNow)
            throw new ArgumentException("Value cannot be in the future!");

        Value = value;
    }

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
