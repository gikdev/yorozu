using Yorozu.Common.Domain;

namespace Yorozu.Domain.ConsumptionTrackLists;

public class ConsumptionTrackList : IAggregateRoot, IHasCreationTimestamp {
    public Guid Id { get; private set; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;

    public string Title { get; private set; } = null!;
    public string? Description { get; private set; }

    private ConsumptionTrackList() { }

    public static ConsumptionTrackList Create(
        NotEmptyString title,
        string? description,
        Guid? id = null
    ) => new() {
        Description = description,
        Id = id ?? Guid.NewGuid(),
        Title = title.Value,
    };
}
