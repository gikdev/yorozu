namespace Yorozu.Domain.ContentItems;

public class ContentUnitSpecification {
    public ContentUnitType UnitType { get; private set; }
    public int? TotalUnits { get; private set; }
    public bool IsOngoing { get; private set; }

    private ContentUnitSpecification() { }

    public static ContentUnitSpecification CreateOngoing(ContentUnitType unitType)
        => new() { IsOngoing = true, TotalUnits = null, UnitType = unitType };

    public static ContentUnitSpecification CreateFinished(ContentUnitType unitType, int totalUnits)
        => new() { IsOngoing = false, TotalUnits = totalUnits, UnitType = unitType };
}
