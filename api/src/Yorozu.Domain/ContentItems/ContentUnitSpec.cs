using ErrorOr;

namespace Yorozu.Domain.ContentItems;

public class ContentUnitSpec {
    public ContentUnitType UnitType { get; private set; }
    public int? TotalUnits { get; private set; }
    public bool IsOngoing { get; private set; }

    private ContentUnitSpec() { }

    public static ErrorOr<ContentUnitSpec> Create(bool isOngoing, ContentUnitType unitType, int? totalUnits) {
        // Validate totalUnits for non-ongoing specs
        if (!isOngoing && (!totalUnits.HasValue || totalUnits.Value <= 0)) {
            return ContentUnitSpecErrors.InvalidTotalUnitsError;
        }

        // Validate that ongoing specs don't have totalUnits
        if (isOngoing && totalUnits.HasValue) {
            return ContentUnitSpecErrors.OngoingWithTotalUnitsError;
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
