#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;
using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public class ContentItem : IAggregateRoot, IHasTimestamps {
    public static Error MustHaveUnitSpecificationError { get; } = Error.Validation(
        description: "A unit specification is required to track consumption.",
        code: "ContentItem.MustHaveUnitSpecification"
    );
    public static Error TrackNotFoundError(Guid id) => Error.NotFound(
        description: $"Consumption track with id '{id}' was not found.",
        code: "ContentItem.TrackNotFound"
    );

    private readonly List<NotEmptyString> _tags = [];
    private readonly List<Genre> _genres = [];
    private readonly List<ConsumptionTrack> _consumptionTracks = [];

    public Guid Id { get; private init; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    public NotEmptyString FullTitle { get; private set; }
    public NotEmptyString? NickName { get; private set; }
    public NotEmptyString Title => NickName ?? FullTitle;

    public ContentItemFormat Format { get; private set; }
    public IReadOnlyCollection<NotEmptyString> Tags => _tags.AsReadOnly();
    public IReadOnlyCollection<Genre> Genres => _genres.AsReadOnly();

    public bool IsSecret { get; private set; }
    public bool IsBookmarked { get; private set; }
    public bool IsFavorite { get; private set; }

    public Location? Location { get; private set; }

    public ContentUnitSpecification? UnitSpecification { get; private set; }
    public IReadOnlyCollection<ConsumptionTrack> ConsumptionTracks => _consumptionTracks.AsReadOnly();
    public bool HasAnyTracks => _consumptionTracks.Count > 0;
    public bool CanAddTracks => UnitSpecification != null;

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

    public void UpdateFullTitle(NotEmptyString fullTitle) {
        FullTitle = fullTitle;
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
        _tags.Add(tag);
        MarkUpdated();
    }

    public void RemoveTag(NotEmptyString tag) {
        if (_tags.Remove(tag))
            MarkUpdated();
    }

    public void AddGenre(Genre genre) {
        if (_genres.Contains(genre)) return;
        _genres.Add(genre);
        MarkUpdated();
    }

    public void RemoveGenre(Genre genre) {
        if (_genres.Remove(genre))
            MarkUpdated();
    }

    public void SetCoverImageUrl(NotEmptyString img) {
        CoverImageUrl = img;
        MarkUpdated();
    }

    public void RemoveCoverImageUrl() {
        CoverImageUrl = null;
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

    public void SetUnitSpecification(ContentUnitSpecification spec) {
        UnitSpecification = spec;

        // Auto-cap & auto-complete tracks that exceed the new total
        if (!spec.IsOngoing && spec.TotalUnits.HasValue) {
            foreach (var track in _consumptionTracks) {
                if (track.CurrentUnit > spec.TotalUnits.Value) {
                    track.ForceProgress(spec.TotalUnits.Value);

                    if (track.Status == ConsumptionStatus.InProgress) {
                        track.ForceComplete();
                    }
                }
            }
        }

        MarkUpdated();
    }

    public void RemoveUnitSpecification() {
        UnitSpecification = null;
        _consumptionTracks.Clear();
        MarkUpdated();
    }

    public ErrorOr<Guid> AddConsumptionTrack(
        IntentionType type,
        NotEmptyString title,
        NotEmptyString? description = null,
        Guid? trackId = null
    ) {
        if (!CanAddTracks)
            return MustHaveUnitSpecificationError;

        var track = ConsumptionTrack.Create(type, title, description, trackId);
        _consumptionTracks.Add(track);
        MarkUpdated();
        return track.Id;
    }

    public ErrorOr<Success> RemoveConsumptionTrack(Guid trackId) {
        var track = _consumptionTracks.FirstOrDefault(x => x.Id == trackId);
        if (track is null)
            return TrackNotFoundError(trackId);

        _consumptionTracks.Remove(track);
        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> StartTrack(Guid trackId) {
        var track = _consumptionTracks.FirstOrDefault(t => t.Id == trackId);
        if (track is null) return TrackNotFoundError(trackId);

        var result = track.Start();
        if (result.IsError) return result.Errors;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> PauseTrack(Guid trackId) {
        var track = _consumptionTracks.FirstOrDefault(t => t.Id == trackId);
        if (track is null) return TrackNotFoundError(trackId);

        var result = track.Pause();
        if (result.IsError) return result.Errors;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> ResumeTrack(Guid trackId) {
        var track = _consumptionTracks.FirstOrDefault(t => t.Id == trackId);
        if (track is null) return TrackNotFoundError(trackId);

        var result = track.Resume();
        if (result.IsError) return result.Errors;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> CompleteTrack(Guid trackId) {
        var track = _consumptionTracks.FirstOrDefault(t => t.Id == trackId);
        if (track is null) return TrackNotFoundError(trackId);

        var result = track.Complete();
        if (result.IsError) return result.Errors;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> DropTrack(Guid trackId) {
        var track = _consumptionTracks.FirstOrDefault(t => t.Id == trackId);
        if (track is null) return TrackNotFoundError(trackId);

        var result = track.Drop();
        if (result.IsError) return result.Errors;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> SetTrackProgress(Guid trackId, int newValue) {
        var track = _consumptionTracks.FirstOrDefault(t => t.Id == trackId);
        if (track is null) return TrackNotFoundError(trackId);

        var result = track.SetProgress(newValue, UnitSpecification?.TotalUnits);
        if (result.IsError) return result.Errors;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> IncrementTrackProgress(Guid trackId, int amount = 1) {
        var track = _consumptionTracks.FirstOrDefault(t => t.Id == trackId);
        if (track is null) return TrackNotFoundError(trackId);

        var result = track.IncrementProgress(amount, UnitSpecification?.TotalUnits);
        if (result.IsError) return result.Errors;

        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> DecrementTrackProgress(Guid trackId, int amount = 1) {
        var track = _consumptionTracks.FirstOrDefault(t => t.Id == trackId);
        if (track is null) return TrackNotFoundError(trackId);

        var result = track.DecrementProgress(amount);
        if (result.IsError) return result.Errors;

        MarkUpdated();
        return Result.Success;
    }

    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;

    public override bool Equals(object? obj) => obj is ContentItem other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
