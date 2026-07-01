using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public record ContentItemUnitSpecChangedDomainEvent(
    Guid ContentItemId,
    string UnitType,
    int? TotalUnits
) : IDomainEvent;
