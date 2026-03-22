using ErrorOr;

namespace Fanoos.Common.Domain;

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
}
