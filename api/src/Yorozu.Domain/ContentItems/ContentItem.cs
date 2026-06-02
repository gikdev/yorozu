#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;
using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public class ContentItem : IAggregateRoot, IHasTimestamps {
    private readonly List<NonEmptyString> _tags = [];
    private readonly List<Genre> _genres = [];
    private readonly List<Location> _locations = [];
    private readonly List<ConsumptionTrack> _consumptionTracks = [];
    private readonly List<ContentItemImage> _images = [];

    public Guid Id { get; private init; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    public NonEmptyString FullTitle { get; private set; }
    public NonEmptyString? NickName { get; private set; }
    public NonEmptyString Title => NickName ?? FullTitle;

    public ContentItemFormat Format { get; private set; }
    public IReadOnlyCollection<NonEmptyString> Tags => _tags.AsReadOnly();
    public IReadOnlyCollection<Genre> Genres => _genres.AsReadOnly();

    public bool IsSecret { get; private set; }
    public bool IsBookmarked { get; private set; }
    public bool IsFavorite { get; private set; }

    public IReadOnlyCollection<Location> Locations => _locations.AsReadOnly();

    public ContentUnitSpecification? UnitSpecification { get; private set; }
    public IReadOnlyCollection<ConsumptionTrack> ConsumptionTracks => _consumptionTracks.AsReadOnly();

    public Guid? PrimaryImageId { get; private set; }
    public ContentItemImage? PrimaryImage => Images.ToList().Find(i => i.Id == PrimaryImageId);
    public IReadOnlyCollection<ContentItemImage> Images => _images.AsReadOnly();

    public string PlaceholderColor { get; private set; } = "#3A3A3A";
    public string PlaceholderLetter => Title.Value[0].ToString();

    private ContentItem() {
    }

    public static ErrorOr<ContentItem> Create(
        NonEmptyString fullTitle,
        ContentItemFormat format
    ) {
        return new ContentItem {
            FullTitle = fullTitle,
            Format = format,
        };
    }

    public void UpdateFullTitle(NonEmptyString fullTitle) {
        FullTitle = fullTitle;
        MarkUpdated();
    }

    public void ChangeNickName(NonEmptyString nickName) {
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

    public void AddTag(NonEmptyString tag) {
        if (_tags.Contains(tag)) return;
        _tags.Add(tag);
        MarkUpdated();
    }

    public void RemoveTag(NonEmptyString tag) {
        var isSuccess = _tags.Remove(tag);
        if (!isSuccess) return;
        MarkUpdated();
    }

    public void AddGenre(Genre genre) {
        if (_genres.Contains(genre)) return;
        _genres.Add(genre);
        MarkUpdated();
    }

    public void RemoveGenre(Genre genre) {
        var isSuccess = _genres.Remove(genre);
        if (!isSuccess) return;
        MarkUpdated();
    }

    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;
}
