#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;

namespace Fanoos.Common.Domain;

public sealed record NotEmptyString {
    private NotEmptyString() { }

    public string Value { get; init; }

    public static ErrorOr<NotEmptyString> Create(string value) {
        if (string.IsNullOrWhiteSpace(value))
            return NotEmptyStringErrors.ValueIsEmpty;

        var notEmptyString = new NotEmptyString {
            Value = value
        };

        return notEmptyString;
    }
}
