#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;
using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public class ContentItem : IAggregateRoot, IHasTimestamps {
    public static Error MustHaveUnitSpecificationError { get; } = Error.Validation(
        description: "A unit specification is required to track consumption.",
        code: "ContentItem.MustHaveUnitSpecification"
    );

    private readonly List<NonEmptyString> _tags = [];
    private readonly List<Genre> _genres = [];
    private readonly List<ConsumptionTrack> _consumptionTracks = [];

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

    public Location? Location { get; private set; }

    public ContentUnitSpecification? UnitSpecification { get; private set; }
    public IReadOnlyCollection<ConsumptionTrack> ConsumptionTracks => _consumptionTracks.AsReadOnly();

    public CoverImage? CoverImage { get; private set; }
    public string PlaceholderColor { get; private set; } = "#3A3A3A";
    public string PlaceholderLetter => Title.Value[0].ToString();

    private ContentItem() { }

    public static ContentItem Create(
        NonEmptyString fullTitle,
        ContentItemFormat format,
        Guid? id = null
    ) {
        return new ContentItem {
            FullTitle = fullTitle,
            Format = format,
            Id = id ?? Guid.NewGuid(),
        };
    }

    public void UpdateFullTitle(NonEmptyString fullTitle) {
        FullTitle = fullTitle;
        MarkUpdated();
    }

    public void ChangeNickName(NonEmptyString? nickName) {
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

    public void SetCoverImage(CoverImage img) {
        CoverImage = img;
        MarkUpdated();
    }

    public void RemoveCoverImage() {
        CoverImage = null;
        MarkUpdated();
    }

    public void ChangeLocation(Location? location) {
        Location = location;
        MarkUpdated();
    }

    public void SetUnitSpecification(ContentUnitSpecification spec) {
        UnitSpecification = spec;
        MarkUpdated();
    }

    public void RemoveUnitSpecification() {
        UnitSpecification = null;
        _consumptionTracks.Clear();
        MarkUpdated();
    }

    public ErrorOr<Guid> AddConsumptionTrack(
        IntentionType type,
        NonEmptyString title,
        NonEmptyString? description = null,
        Guid? trackId = null
    ) {
        if (UnitSpecification is null)
            return MustHaveUnitSpecificationError;

        var track = new ConsumptionTrack {
            Title = title,
            Type = type,
            Id = trackId ?? Guid.NewGuid(),
            Description = description,
        };

        _consumptionTracks.Add(track);

        MarkUpdated();

        return track.Id;
    }

    public void RemoveConsumptionTrack(Guid trackId) {
        var track = _consumptionTracks.FirstOrDefault(x => x.Id == trackId);
        if (track == null) return;

        _consumptionTracks.Remove(track);
        MarkUpdated();
    }

    public void SetPlaceholderColor(string? color) {
        PlaceholderColor = color ?? "#3A3A3A";
        MarkUpdated();
    }

    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;

    public override bool Equals(object? obj) => obj is ContentItem other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
