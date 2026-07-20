#pragma warning disable CA1056
#pragma warning disable CA1030

using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public class ContentItem : IAggregateRoot, IHasCreationTimestamp, IHasDomainEvents {
    // Identity
    public Guid Id { get; private init; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;

    // Tags
    private readonly List<string> _tags = [];
    public IReadOnlyCollection<string> Tags => _tags.ToList().AsReadOnly();

    // Domain events
    private readonly List<IDomainEvent> _domainEvents = [];
    public IReadOnlyList<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();
    public void ClearDomainEvents() => _domainEvents.Clear();
    protected void RaiseDomainEvent(IDomainEvent e) => _domainEvents.Add(e);

    // Title
    public required string FullTitle { get; set; }
    public string? NickName { get; set; }
    public string Title => NickName ?? FullTitle;

    // Flags
    public bool IsSecret => _tags.Contains(BuiltInTags.Secret);
    public bool IsFavorited => _tags.Contains(BuiltInTags.Favorite);
    public bool IsBookmarked => _tags.Contains(BuiltInTags.Bookmarked);
    public bool IsOngoing => _tags.Contains(BuiltInTags.Ongoing);

    // Cover
    public string? CoverImageUrl { get; set; }
    public string PlaceholderLetter => Title[0].ToString();

    // Other
    public required ContentItemFormat Format { get; set; }
    public string? Location { get; set; }

    // EF ctor
    public ContentItem() { }

    // ── Flags ────────────────────────────────────────────
    public void ApplyBookmark(FlagAction action) => ApplyFlag(action, BuiltInTags.Bookmarked);
    public void ApplyFavorite(FlagAction action) => ApplyFlag(action, BuiltInTags.Favorite);
    public void ApplyOngoing(FlagAction action) => ApplyFlag(action, BuiltInTags.Ongoing);
    public void ApplySecret(FlagAction action) {
        var before = IsSecret;
        ApplyFlag(action, BuiltInTags.Secret);
        if (IsSecret != before)
            RaiseDomainEvent(new ContentItemSecretChangedDomainEvent(Id, IsSecret));
    }

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

    public void EnsureTagRemoved(string tag)
        => _tags.Remove(tag);

    public void ClearTags()
        => _tags.Clear();

    // ── Other ─────────────────────────────────────────────
    public override bool Equals(object? obj) => obj is ContentItem other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
