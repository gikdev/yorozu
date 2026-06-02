namespace Yorozu.Domain.ContentItems;

public class ContentUnitSpecification {
    public required ContentUnitType UnitType { get; set; }
    public required int? TotalUnits { get; set; }
    public required bool IsOngoing { get; set; }
}
