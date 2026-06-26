#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using Yorozu.Common.Domain;
using Yorozu.Domain.Common;

namespace Yorozu.Domain.Songs;

public class Song : IAggregateRoot, IHasTimestamps {
    public Guid Id { get; private init; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    private readonly List<string> _tags = [];
    public IReadOnlyCollection<string> Tags => _tags.ToList().AsReadOnly();

    public string Title { get; private set; }
    public string PlaceholderLetter => Title[0].ToString();

    public bool IsSecret => _tags.Contains(BuiltInTags.Secret);
    public bool IsFavorited => _tags.Contains(BuiltInTags.Favorited);
    public bool IsBookmarked => _tags.Contains(BuiltInTags.Bookmarked);
    public bool IsSpiritual => _tags.Contains(BuiltInTags.Spiritual);

    private Song() { }

    public static Song Create(
        NotEmptyString title,
        Guid? id = null
    ) => new() {
        Title = title.Value,
        Id = id ?? Guid.NewGuid(),
    };

    public void ChangeTitle(NotEmptyString title) {
        Title = title.Value;
        MarkUpdated();
    }

    public void Bookmark() {
        EnsureTagAdded(NotEmptyString.Create(BuiltInTags.Bookmarked).Value);
        MarkUpdated();
    }

    public void Unbookmark() {
        EnsureTagRemoved(NotEmptyString.Create(BuiltInTags.Bookmarked).Value);
        MarkUpdated();
    }

    public void ToggleBookmark() {
        if (IsBookmarked) {
            Bookmark();
        } else {
            Unbookmark();
        }

        MarkUpdated();
    }

    public void Favorite() {
        EnsureTagAdded(NotEmptyString.Create(BuiltInTags.Favorited).Value);
        MarkUpdated();
    }

    public void Unfavorite() {
        EnsureTagRemoved(NotEmptyString.Create(BuiltInTags.Favorited).Value);
        MarkUpdated();
    }

    public void ToggleFavorited() {
        if (IsFavorited) {
            Favorite();
        } else {
            Unfavorite();
        }

        MarkUpdated();
    }

    public void MarkSecret() {
        EnsureTagAdded(NotEmptyString.Create(BuiltInTags.Secret).Value);
        MarkUpdated();
    }

    public void UnmarkSecret() {
        EnsureTagRemoved(NotEmptyString.Create(BuiltInTags.Secret).Value);
        MarkUpdated();
    }

    public void ToggleSecret() {
        if (IsSecret) {
            MarkSecret();
        } else {
            UnmarkSecret();
        }

        MarkUpdated();
    }

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

    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;

    public override bool Equals(object? obj) => obj is Song other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
