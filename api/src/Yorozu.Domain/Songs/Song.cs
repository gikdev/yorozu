#pragma warning disable CS8618

using Yorozu.Common.Domain;
using Yorozu.Domain.Common;

namespace Yorozu.Domain.Songs;

public class Song : IAggregateRoot, IHasTimestamps {
    // Identity
    public Guid Id { get; private init; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    // Tags
    private readonly List<string> _tags = [];
    public IReadOnlyCollection<string> Tags => _tags.ToList().AsReadOnly();

    // Title
    public string Title { get; private set; }
    public string PlaceholderLetter => Title[0].ToString();

    // Flags
    public bool IsSecret => _tags.Contains(BuiltInTags.Secret);
    public bool IsFavorited => _tags.Contains(BuiltInTags.Favorited);
    public bool IsBookmarked => _tags.Contains(BuiltInTags.Bookmarked);
    public bool IsSpiritual => _tags.Contains(BuiltInTags.Spiritual);

    // EF ctor
    private Song() { }

    public static Song Create(
        NotEmptyString title,
        Guid? id = null
    ) => new() {
        Title = title.Value,
        Id = id ?? Guid.NewGuid(),
    };

    // ── Title ────────────────────────────────────────────
    public void ChangeTitle(NotEmptyString title) {
        Title = title.Value;
        MarkUpdated();
    }

    // ── Flags ────────────────────────────────────────────
    public void ApplySecret(FlagAction action) => ApplyFlag(action, BuiltInTags.Secret);
    public void ApplyBookmark(FlagAction action) => ApplyFlag(action, BuiltInTags.Bookmarked);
    public void ApplyFavorite(FlagAction action) => ApplyFlag(action, BuiltInTags.Favorited);
    public void ApplySpiritual(FlagAction action) => ApplyFlag(action, BuiltInTags.Spiritual);

    private void ApplyFlag(FlagAction action, string tag) {
        var nes = NotEmptyString.Create(tag).Value;
        switch (action) {
            case FlagAction.On: EnsureTagAdded(nes); break;
            case FlagAction.Off: EnsureTagRemoved(nes); break;
            case FlagAction.Toggle:
                if (_tags.Contains(tag)) EnsureTagRemoved(nes);
                else EnsureTagAdded(nes);
                break;
        }
    }

    // ── Tags ─────────────────────────────────────────────
    public void EnsureTagAdded(NotEmptyString tag) {
        if (_tags.Contains(tag)) return;
        _tags.Add(tag.Value);
        MarkUpdated();
    }

    public void EnsureTagRemoved(NotEmptyString tag) {
        if (_tags.Remove(tag.Value))
            MarkUpdated();
    }

    public void ClearTags() {
        _tags.Clear();
        MarkUpdated();
    }

    // ── Private ──────────────────────────────────────────
    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;

    public override bool Equals(object? obj) => obj is Song other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
