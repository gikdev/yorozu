using ErrorOr;

namespace Yorozu.Domain.ContentItems;

public class ContentUnitSpecification {
    public static Error InvalidTotalUnitsError { get; } = Error.Validation(
        description: "Finished content must have a positive total unit count.",
        code: "ContentUnitSpecification.InvalidTotalUnits"
    );

    public static Error OngoingWithTotalUnitsError { get; } = Error.Validation(
        description: "Ongoing content cannot have a specified total unit count.",
        code: "ContentUnitSpecification.OngoingWithTotalUnits"
    );

    public static Error InvalidUnitTypeError { get; } = Error.Validation(
        description: "Invalid unit type specified.",
        code: "ContentUnitSpecification.InvalidUnitType"
    );

    public ContentUnitType UnitType { get; private set; }
    public int? TotalUnits { get; private set; }
    public bool IsOngoing { get; private set; }

    private ContentUnitSpecification() { }

    public static ErrorOr<ContentUnitSpecification> Create(bool isOngoing, ContentUnitType unitType, int? totalUnits) {
        // Validate totalUnits for non-ongoing specifications
        if (!isOngoing && (!totalUnits.HasValue || totalUnits.Value <= 0)) {
            return InvalidTotalUnitsError;
        }

        // Validate that ongoing specifications don't have totalUnits
        if (isOngoing && totalUnits.HasValue) {
            return OngoingWithTotalUnitsError;
        }

        return new ContentUnitSpecification {
            IsOngoing = isOngoing,
            UnitType = unitType,
            TotalUnits = totalUnits
        };
    }

    public static ErrorOr<ContentUnitSpecification> CreateOngoing(ContentUnitType unitType)
        => Create(true, unitType, null);

    public static ErrorOr<ContentUnitSpecification> CreateFinished(ContentUnitType unitType, int totalUnits)
        => Create(false, unitType, totalUnits);
}
