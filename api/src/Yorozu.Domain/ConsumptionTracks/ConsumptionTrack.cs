using Yorozu.Common.Domain;

namespace Yorozu.Domain.ConsumptionTracks;

public class ConsumptionTrack : IAggregateRoot, IHasCreationTimestamp {
    // Identity
    public Guid Id { get; private init; } = Guid.NewGuid();
    public required Guid ContentItemId { get; init; }
    public required Guid ConsumptionListId { get; set; }

    // Tags
    private readonly List<string> _tags = [];
    public IReadOnlyCollection<string> Tags => _tags.ToList().AsReadOnly();

    // Flags
    public bool IsSecret => _tags.Contains(BuiltInTags.Secret);
    public bool IsBookmarked => _tags.Contains(BuiltInTags.Bookmarked);

    // Metadata
    public required string Title { get; set; }
    public string? Note { get; set; }
    public string? Description { get; set; }

    // Status, Settings
    public bool DoSyncSecret { get; set; } = true;
    public ConsumptionStatus Status { get; set; } = ConsumptionStatus.Idle;
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;

    // ── Flags ────────────────────────────────────────────
    public void ApplySecret(FlagAction action) => ApplyFlag(action, BuiltInTags.Secret);
    public void ApplyBookmark(FlagAction action) => ApplyFlag(action, BuiltInTags.Bookmarked);

    private void ApplyFlag(FlagAction action, string tag) {
        switch (action) {
            case FlagAction.On: EnsureTagAdded(tag); break;
            case FlagAction.Off: EnsureTagRemoved(tag); break;
            case FlagAction.Toggle:
                if (_tags.Contains(tag)) EnsureTagRemoved(tag);
                else EnsureTagAdded(tag);
                break;
        }
    }

    // ── Tags ─────────────────────────────────────────────
    public void EnsureTagAdded(string tag) {
        if (_tags.Contains(tag)) return;
        _tags.Add(tag);
    }

    public void EnsureTagRemoved(string tag) {
        _tags.Remove(tag);
    }

    public void ClearTags() {
        _tags.Clear();
    }

    // ── Settings ─────────────────────────────────────────────
    public void SyncSecret(bool isSecret) {
        if (!DoSyncSecret) return;
        ApplySecret(isSecret ? FlagAction.On : FlagAction.Off);
    }

    // ── Other ──────────────────────────────────────────
    public override bool Equals(object? obj) => obj is ConsumptionTrack other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
