#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;

namespace Yorozu.Common.Domain;

public sealed record NotEmptyString {
    public static Error ValueCanNotBeEmptyError { get; } = Error.Validation(
        description: "Value cannot be an empty string",
        code: "NonEmptyString.ValueCanNotBeEmpty"
    );

    private NotEmptyString() {}

    public string Value { get; private init; }

    public static ErrorOr<NotEmptyString> Create(string value) {
        if (string.IsNullOrWhiteSpace(value)) {
            return ValueCanNotBeEmptyError;
        }

        return new NotEmptyString { Value = value };
    }

    public static implicit operator string(NotEmptyString s) => s.Value;
    public override string ToString() => Value;
}
