#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;
using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public class ContentItem : IAggregateRoot, IHasTimestamps, IHasDomainEvents {
    private readonly List<string> _tags = [];

    public Guid Id { get; private init; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    private readonly List<IDomainEvent> _domainEvents = [];
    public IReadOnlyList<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();
    public void ClearDomainEvents() => _domainEvents.Clear();
    protected void RaiseDomainEvent(IDomainEvent e) => _domainEvents.Add(e);

    public NotEmptyString FullTitle { get; private set; }
    public NotEmptyString? NickName { get; private set; }
    public NotEmptyString Title => NickName ?? FullTitle;

    public ContentItemFormat Format { get; private set; }
    public IReadOnlyCollection<string> Tags => _tags.ToList().AsReadOnly();

    public bool IsSecret { get; private set; }
    public bool IsBookmarked { get; private set; }
    public bool IsFavorite { get; private set; }

    public Location? Location { get; private set; }

    public ContentUnitSpec? UnitSpec { get; private set; }
    public bool CanAddTracks => UnitSpec != null;

    public NotEmptyString? CoverImageUrl { get; private set; }
    public string PlaceholderColor { get; private set; } = "#3A3A3A";
    public string PlaceholderLetter => Title.Value[0].ToString();

    private ContentItem() { }

    public static ContentItem Create(
        NotEmptyString fullTitle,
        ContentItemFormat format,
        Guid? id = null
    ) => new() {
        FullTitle = fullTitle,
        Format = format,
        Id = id ?? Guid.NewGuid(),
    };

    public void ChangeFullName(NotEmptyString fullTitle) {
        FullTitle = fullTitle;
        MarkUpdated();
    }

    public void ChangeFormat(ContentItemFormat format) {
        Format = format;
        MarkUpdated();
    }

    public void ChangeNickName(NotEmptyString? nickName) {
        NickName = nickName;
        MarkUpdated();
    }

    public void Bookmark() {
        IsBookmarked = true;
        MarkUpdated();
    }

    public void Unbookmark() {
        IsBookmarked = false;
        MarkUpdated();
    }

    public void ToggleBookmark() {
        IsBookmarked = !IsBookmarked;
        MarkUpdated();
    }

    public void Favorite() {
        IsFavorite = true;
        MarkUpdated();
    }

    public void Unfavorite() {
        IsFavorite = false;
        MarkUpdated();
    }

    public void ToggleFavorite() {
        IsFavorite = !IsFavorite;
        MarkUpdated();
    }

    public void MarkSecret() {
        IsSecret = true;
        MarkUpdated();
    }

    public void UnmarkSecret() {
        IsSecret = false;
        MarkUpdated();
    }

    public void ToggleSecret() {
        IsSecret = !IsSecret;
        MarkUpdated();
    }

    public void AddTag(NotEmptyString tag) {
        if (_tags.Contains(tag)) return;
        _tags.Add(tag.Value);
        MarkUpdated();
    }

    public void RemoveTag(NotEmptyString tag) {
        if (_tags.Remove(tag.Value))
            MarkUpdated();
    }

    public void ClearTags() {
        _tags.Clear();
        MarkUpdated();
    }

    public void ChangeCoverImageUrl(NotEmptyString? img) {
        CoverImageUrl = img;
        MarkUpdated();
    }

    public void ChangeLocation(Location? location) {
        Location = location;
        MarkUpdated();
    }

    public void SetPlaceholderColor(string? color) {
        PlaceholderColor = color ?? "#3A3A3A";
        MarkUpdated();
    }

    public ErrorOr<Success> ChangeUnitSpec(ContentUnitSpec? spec, int trackCount) {
        if (spec is null && trackCount > 0)
            return ContentItemErrors.CannotRemoveUnitSpecWithActiveTracks;

        UnitSpec = spec;
        RaiseDomainEvent(new ContentItemUnitSpecChangedDomainEvent(Id, spec?.TotalUnits));
        MarkUpdated();
        return Result.Success;
    }

    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;

    public override bool Equals(object? obj) => obj is ContentItem other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
