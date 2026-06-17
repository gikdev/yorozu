using ErrorOr;

namespace Yorozu.Domain.ContentItems;

public static class ContentUnitSpecErrors {
    public static Error InvalidTotalUnitsError { get; } = Error.Validation(
        description: "Finished content must have a positive total unit count.",
        code: "ContentUnitSpec.InvalidTotalUnits"
    );

    public static Error OngoingWithTotalUnitsError { get; } = Error.Validation(
        description: "Ongoing content cannot have a specified total unit count.",
        code: "ContentUnitSpec.OngoingWithTotalUnits"
    );

    public static Error InvalidUnitTypeError { get; } = Error.Validation(
        description: "Invalid unit type specified.",
        code: "ContentUnitSpec.InvalidUnitType"
    );
}
