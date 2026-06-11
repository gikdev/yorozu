using ErrorOr;

namespace Yorozu.Domain.ContentItems;

public class ContentUnitSpec {
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

    public ContentUnitType UnitType { get; private set; }
    public int? TotalUnits { get; private set; }
    public bool IsOngoing { get; private set; }

    private ContentUnitSpec() { }

    public static ErrorOr<ContentUnitSpec> Create(bool isOngoing, ContentUnitType unitType, int? totalUnits) {
        // Validate totalUnits for non-ongoing specs
        if (!isOngoing && (!totalUnits.HasValue || totalUnits.Value <= 0)) {
            return InvalidTotalUnitsError;
        }

        // Validate that ongoing specs don't have totalUnits
        if (isOngoing && totalUnits.HasValue) {
            return OngoingWithTotalUnitsError;
        }

        return new ContentUnitSpec {
            IsOngoing = isOngoing,
            UnitType = unitType,
            TotalUnits = totalUnits
        };
    }

    public static ErrorOr<ContentUnitSpec> CreateOngoing(ContentUnitType unitType)
        => Create(true, unitType, null);

    public static ErrorOr<ContentUnitSpec> CreateFinished(ContentUnitType unitType, int totalUnits)
        => Create(false, unitType, totalUnits);
}
