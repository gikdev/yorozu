using ErrorOr;

namespace Yorozu.Domain.ContentItems;

#pragma warning disable CS8618
public sealed record NonEmptyString {
    public static Error ValueCanNotBeEmptyError { get; } = Error.Validation(
        description: "Value cannot be an empty string",
        code: "NonEmptyString.ValueCanNotBeEmpty"
    );

    private NonEmptyString() {
    }

    public string Value { get; private init; }

    public static ErrorOr<NonEmptyString> Create(string value) {
        if (string.IsNullOrWhiteSpace(value)) {
            return ValueCanNotBeEmptyError;
        }

        return new NonEmptyString { Value = value };
    }

    public static implicit operator string(NonEmptyString s) => s.Value;
    public override string ToString() => Value;
}
