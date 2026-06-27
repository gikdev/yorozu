using ErrorOr;
using Yorozu.Common.Domain;

namespace Yorozu.Domain.ConsumptionTracks;

public class ConsumptionTrack : IAggregateRoot, IHasTimestamps {
    // Identity
    public Guid Id { get; private init; } = Guid.NewGuid();
    public Guid ContentItemId { get; private init; }
    public Guid? ConsumptionTrackListId { get; private set; }
    public DateTimeOffset CreatedAt { get; private init; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }

    // Tags
    private readonly List<string> _tags = [];
    public IReadOnlyCollection<string> Tags => _tags.ToList().AsReadOnly();

    // Flags
    public bool IsSecret => _tags.Contains(BuiltInTags.Secret);
    public bool IsBookmarked => _tags.Contains(BuiltInTags.Bookmarked);

    // Metadata
    public string Title { get; private set; } = null!;
    public string? Description { get; private set; }

    // Status
    public ConsumptionStatus Status { get; private set; } = ConsumptionStatus.Idle;
    public int CurrentUnit { get; private set; }
    public int? TotalUnits { get; private set; }

    // Sync settings
    public bool DoSyncTotalUnits { get; private set; }
    public bool DoSyncSecret { get; private set; }

    // Timestamps
    public DateTimeOffset? StartedAt { get; private set; }
    public DateTimeOffset? CompletedAt { get; private set; }
    public DateTimeOffset? DroppedAt { get; private set; }
    public DateTimeOffset? PausedAt { get; private set; }

    // ── Action guards ────────────────────────────────────
    public bool CanStart => Status == ConsumptionStatus.Idle;
    public bool CanPause => Status == ConsumptionStatus.InProgress;
    public bool CanResume => Status == ConsumptionStatus.OnHold;
    public bool CanDrop => !Status.IsTerminal;
    public bool CanComplete => Status == ConsumptionStatus.InProgress;
    public bool CanProgress => Status == ConsumptionStatus.InProgress && (!TotalUnits.HasValue || CurrentUnit < TotalUnits!.Value);
    public bool CanDecrement => Status == ConsumptionStatus.InProgress && CurrentUnit > 0;

    private bool HasReachedCap => TotalUnits.HasValue && CurrentUnit >= TotalUnits!.Value;

    // EF ctor
    private ConsumptionTrack() { }

    public static ConsumptionTrack Create(
        Guid contentItemId,
        int? totalUnits,
        NotEmptyString title,
        NotEmptyString? description = null
    ) => new() {
        ContentItemId = contentItemId,
        TotalUnits = totalUnits,
        Title = title.Value,
        Description = description?.Value,
    };

    // ── Flags ────────────────────────────────────────────
    public void ApplySecret(FlagAction action) => ApplyFlag(action, BuiltInTags.Secret);
    public void ApplyBookmark(FlagAction action) => ApplyFlag(action, BuiltInTags.Bookmarked);

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

    // ── Metadata ─────────────────────────────────────────
    public void ChangeTitle(NotEmptyString title) {
        Title = title.Value;
        MarkUpdated();
    }

    public void ChangeDescription(NotEmptyString? description) {
        Description = description?.Value;
        MarkUpdated();
    }

    public void ChangeList(Guid? listId) {
        ConsumptionTrackListId = listId;
        MarkUpdated();
    }

    // ── Sync ─────────────────────────────────────────────
    public void SetSyncTotalUnits(bool value) {
        DoSyncTotalUnits = value;
        MarkUpdated();
    }

    public void SetSyncSecret(bool value) {
        DoSyncSecret = value;
        MarkUpdated();
    }

    public void SyncTotalUnits(int? totalUnits) {
        if (Status.IsTerminal || !DoSyncTotalUnits) return;
        TotalUnits = totalUnits;
        if (TotalUnits.HasValue && CurrentUnit > TotalUnits.Value)
            CurrentUnit = TotalUnits.Value;
        MarkUpdated();
    }

    public void SyncSecret(bool isSecret) {
        if (!DoSyncSecret) return;
        ApplySecret(isSecret ? FlagAction.On : FlagAction.Off);
    }

    // ── Lifecycle ────────────────────────────────────────
    public ErrorOr<Success> Start() {
        if (!CanStart) return ConsumptionTrackErrors.AlreadyStartedError;
        Status = ConsumptionStatus.InProgress;
        StartedAt = DateTimeOffset.UtcNow;
        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> Pause() {
        if (!CanPause) return ConsumptionTrackErrors.NotInProgressError;
        Status = ConsumptionStatus.OnHold;
        PausedAt = DateTimeOffset.UtcNow;
        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> Resume() {
        if (!CanResume) return ConsumptionTrackErrors.NotOnHoldError;
        Status = ConsumptionStatus.InProgress;
        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> Complete() {
        if (!CanComplete) return ConsumptionTrackErrors.NotInProgressError;
        Status = ConsumptionStatus.Completed;
        CompletedAt = DateTimeOffset.UtcNow;
        MarkUpdated();
        return Result.Success;
    }

    public ErrorOr<Success> Drop() {
        if (!CanDrop) {
            if (Status == ConsumptionStatus.Completed)
                return ConsumptionTrackErrors.AlreadyCompletedError;

            if (Status == ConsumptionStatus.Dropped)
                return ConsumptionTrackErrors.AlreadyDroppedError;
        }

        Status = ConsumptionStatus.Dropped;
        DroppedAt = DateTimeOffset.UtcNow;
        MarkUpdated();
        return Result.Success;
    }

    // ── Progress ─────────────────────────────────────────
    public ErrorOr<Success> SetProgress(int newValue) {
        var resolved = ResolveProgressValue(newValue);
        return resolved.IsError ? resolved.Errors : ApplyProgress(resolved.Value);
    }

    public ErrorOr<Success> IncrementProgress(int amount) {
        if (amount <= 0) return ConsumptionTrackErrors.IncrementMustBePositiveError;
        var resolved = ResolveProgressValue(CurrentUnit + amount);
        return resolved.IsError ? resolved.Errors : ApplyProgress(resolved.Value);
    }

    public ErrorOr<Success> DecrementProgress(int amount) {
        if (amount <= 0) return ConsumptionTrackErrors.DecrementMustBePositiveError;
        var resolved = ResolveProgressValue(CurrentUnit - amount);
        return resolved.IsError ? resolved.Errors : ApplyProgress(resolved.Value);
    }

    // ── Private ──────────────────────────────────────────
    private ErrorOr<int> ResolveProgressValue(int newValue) {
        if (!Status.AllowsProgress)
            return ConsumptionTrackErrors.NotInProgressError;

        if (newValue < 0)
            return ConsumptionTrackErrors.CannotGoBelowZeroError;

        if (TotalUnits.HasValue && newValue > TotalUnits.Value)
            return ConsumptionTrackErrors.CannotExceedTotalUnitsError(TotalUnits.Value);

        return newValue;
    }

    private ErrorOr<Success> ApplyProgress(int newValue) {
        CurrentUnit = newValue;
        if (HasReachedCap) {
            var result = Complete();
            if (result.IsError) return result;
        }
        MarkUpdated();
        return Result.Success;
    }

    private void MarkUpdated() => UpdatedAt = DateTimeOffset.UtcNow;

    public override bool Equals(object? obj) => obj is ConsumptionTrack other && Id.Equals(other.Id);
    public override int GetHashCode() => Id.GetHashCode();
}
