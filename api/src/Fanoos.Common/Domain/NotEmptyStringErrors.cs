using ErrorOr;

namespace Fanoos.Common.Domain;

public static class NotEmptyStringErrors {

    public readonly static Error ValueIsEmpty = Error.Validation(
        description: "Value is empty! (null or whitespace)",
        code: "NotEmptyString.ValueIsEmpty"
    );
}
