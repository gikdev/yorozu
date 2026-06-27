#pragma warning disable CA1030
#pragma warning disable CS8618

using Yorozu.Common.Domain;
using Yorozu.Domain.Common;

namespace Yorozu.Domain.ContentItems;

public class ContentItem : IAggregateRoot, IHasTimestamps, IHasDomainEvents {
    // Identity
    public Guid Id { get; private init; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    // Tags
    private readonly List<string> _tags = [];
    public IReadOnlyCollection<string> Tags => _tags.ToList().AsReadOnly();

    // Domain events
    private readonly List<IDomainEvent> _domainEvents = [];
    public IReadOnlyList<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();
    public void ClearDomainEvents() => _domainEvents.Clear();
    protected void RaiseDomainEvent(IDomainEvent e) => _domainEvents.Add(e);

    // Title
    public string FullTitle { get; private set; }
    public string? NickName { get; private set; }
    public string Title => NickName ?? FullTitle;

    // Flags
    public bool IsSecret => _tags.Contains(BuiltInTags.Secret);
    public bool IsFavorited => _tags.Contains(BuiltInTags.Favorited);
    public bool IsBookmarked => _tags.Contains(BuiltInTags.Bookmarked);
    public bool IsOngoing => _tags.Contains(BuiltInTags.Ongoing);

    // Cover
    public NotEmptyString? CoverImageUrl { get; private set; }
    public string PlaceholderColor { get; private set; } = "#3A3A3A";
    public string PlaceholderLetter => Title[0].ToString();

    // Other
    public ContentItemFormat Format { get; private set; }
    public Location? Location { get; private set; }
    public ContentUnitType UnitType { get; private set; }
    public int? TotalUnits { get; private set; }

    // EF ctor
    private ContentItem() { }

    public static ContentItem Create(
        NotEmptyString fullTitle,
        ContentItemFormat format,
        Guid? id = null
    ) => new() {
        FullTitle = fullTitle.Value,
        Format = format,
        Id = id ?? Guid.NewGuid(),
    };

    // ── Title ────────────────────────────────────────────
    public void ChangeFullTitle(NotEmptyString fullTitle) {
        FullTitle = fullTitle.Value;
        MarkUpdated();
    }

    public void ChangeNickName(NotEmptyString? nickName) {
        NickName = nickName?.Value;
        MarkUpdated();
    }

    // ── Flags ────────────────────────────────────────────
    public void ApplyBookmark(FlagAction action) => ApplyFlag(action, BuiltInTags.Bookmarked);
    public void ApplyFavorite(FlagAction action) => ApplyFlag(action, BuiltInTags.Favorited);
    public void ApplyOngoing(FlagAction action) => ApplyFlag(action, BuiltInTags.Ongoing);
    public void ApplySecret(FlagAction action) {
        var before = IsSecret;
        ApplyFlag(action, BuiltInTags.Secret);
        if (IsSecret != before)
            RaiseDomainEvent(new ContentItemSecretChangedDomainEvent(Id, IsSecret));
    }

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

    // ── Cover ────────────────────────────────────────────
    public void ChangeCoverImageUrl(NotEmptyString? img) {
        CoverImageUrl = img;
        MarkUpdated();
    }

    public void SetPlaceholderColor(string? color) {
        PlaceholderColor = color ?? "#3A3A3A";
        MarkUpdated();
    }

    // ── Other ────────────────────────────────────────────
    public void ChangeFormat(ContentItemFormat format) {
        Format = format;
        MarkUpdated();
    }

    public void ChangeLocation(Location? location) {
        Location = location;
        MarkUpdated();
    }

    public void ChangeUnitSpec(ContentUnitType unitType, int? totalUnits) {
        UnitType = unitType;
        TotalUnits = totalUnits;
        RaiseDomainEvent(new ContentItemUnitSpecChangedDomainEvent(Id, unitType, totalUnits));
        MarkUpdated();
    }

    // ── Private ──────────────────────────────────────────
    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;

    public override bool Equals(object? obj) => obj is ContentItem other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
