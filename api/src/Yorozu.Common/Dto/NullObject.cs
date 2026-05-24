namespace Yorozu.Common.Dto;

public record NullObject<T> {
    public required T Value { get; init; }
}

public sealed record StringNullObject : NullObject<string?>;
public sealed record IntNullObject : NullObject<int?>;
public sealed record ByteNullObject : NullObject<byte?>;
public sealed record DateTimeOffsetNullObject : NullObject<DateTimeOffset?>;
