#pragma warning disable CA1008 // Enums should have zero value

namespace Yorozu.Domain.ContentItems;

public enum ConsumptionStatus {
    ToStart = 1,
    InProgress = 2,
    Completed = 3,
    OnHold = 4,
    Dropped = 5,
}
