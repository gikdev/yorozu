using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public record ContentItemUnitSpecChangedDomainEvent(
    Guid ContentItemId,
    int? TotalUnits
) : IDomainEvent;
