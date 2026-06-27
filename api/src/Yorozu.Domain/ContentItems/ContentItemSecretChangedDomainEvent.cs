using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public record ContentItemSecretChangedDomainEvent(
    Guid ContentItemId,
    bool IsSecret
) : IDomainEvent;
