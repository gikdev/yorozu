using Yorozu.Common.Domain;

namespace Yorozu.Domain.ConsumptionTrackLists;

public class ConsumptionTrackList : IAggregateRoot, IHasCreationTimestamp {
    public Guid Id { get; private set; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;

    public required string Title { get; set; }
    public string? Description { get; set; }
}
