#pragma warning disable CA1051 // Do not declare visible instance fields
#pragma warning disable S1104 // Fields should not have public accessibility

using Yorozu.Common.Domain;

namespace Yorozu.Domain.Songs;

public class Song : IAggregateRoot, IHasCreationTimestamp {
    // Identity
    public Guid Id { get; private init; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;

    // Tags
    private readonly List<string> _tags = [];
    public IReadOnlyCollection<string> Tags => _tags.ToList().AsReadOnly();

    // Lyrics
    public required List<LyricLine> LyricLines = [];
    public required LyricTextKind PrimaryLyricTextKind { get; set; }

    // Title
    public required string Title { get; set; }
    public string PlaceholderLetter => Title[0].ToString();

    // Flags
    public bool IsSecret => _tags.Contains(BuiltInTags.Secret);
    public bool IsFavorited => _tags.Contains(BuiltInTags.Favorite);
    public bool IsBookmarked => _tags.Contains(BuiltInTags.Bookmarked);
    public bool IsSpiritual => _tags.Contains(BuiltInTags.Spiritual);

    // ── Flags ────────────────────────────────────────────
    public void ApplySecret(FlagAction action) => ApplyFlag(action, BuiltInTags.Secret);
    public void ApplyBookmark(FlagAction action) => ApplyFlag(action, BuiltInTags.Bookmarked);
    public void ApplyFavorite(FlagAction action) => ApplyFlag(action, BuiltInTags.Favorite);
    public void ApplySpiritual(FlagAction action) => ApplyFlag(action, BuiltInTags.Spiritual);

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

    // ── Private ──────────────────────────────────────────
    public override bool Equals(object? obj) => obj is Song other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
