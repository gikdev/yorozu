using Yorozu.Common.Domain;

namespace Yorozu.Domain.ConsumptionLists;

public class ConsumptionList : IAggregateRoot, IHasCreationTimestamp {
    public Guid Id { get; private set; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;

    public required string Title { get; set; }
    public string? Description { get; set; }
}
