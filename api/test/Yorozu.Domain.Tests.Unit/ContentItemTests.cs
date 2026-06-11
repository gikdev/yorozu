using FluentAssertions;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Domain.Tests.Unit;

internal class ContentItemTests {
    [Fact]
    public void Create_WithValidTitleAndFormat_SetsProperties() {
        var title = NotEmptyString.Create("My Item").Value;
        var format = ContentItemFormat.Readable;

        var item = ContentItem.Create(title, format);

        item.FullTitle.Should().Be(title);
        item.Format.Should().Be(format);
        item.Id.Should().NotBe(Guid.Empty);
        item.CreatedAt.Should().BeOnOrBefore(DateTimeOffset.UtcNow);
        item.UpdatedAt.Should().BeNull();
        item.Tags.Should().BeEmpty();
    }

    // 2. Metadata mutations
    [Fact]
    public void Bookmark_SetsIsBookmarkedTrue_AndUpdatesTimestamp() {
        var item = CreateValidContentItem();

        item.Bookmark();

        var before = item.UpdatedAt ?? throw new ArgumentException("Item's updated at is null.");

        item.IsBookmarked.Should().BeTrue();
        item.UpdatedAt.Should().NotBeNull();
        item.UpdatedAt.Should().BeOnOrAfter(before);
    }

    [Fact]
    public void Unbookmark_SetsIsBookmarkedFalse() {
        var item = CreateValidContentItem();
        item.Bookmark();

        item.Unbookmark();

        item.IsBookmarked.Should().BeFalse();
    }

    [Fact]
    public void Favorite_SetsIsFavoriteTrue() {
        var item = CreateValidContentItem();
        item.Favorite();
        item.IsFavorite.Should().BeTrue();
    }

    [Fact]
    public void Unfavorite_SetsIsFavoriteFalse() {
        var item = CreateValidContentItem();
        item.Favorite();
        item.Unfavorite();
        item.IsFavorite.Should().BeFalse();
    }

    [Fact]
    public void MarkSecret_SetsIsSecretTrue() {
        var item = CreateValidContentItem();
        item.MarkSecret();
        item.IsSecret.Should().BeTrue();
    }

    // 3. Tags / Genres
    [Fact]
    public void AddTag_NewTag_AddsToList() {
        var item = CreateValidContentItem();
        var tag = NotEmptyString.Create("fantasy").Value;

        item.AddTag(tag);

        item.Tags.Should().Contain(tag);
    }

    [Fact]
    public void AddTag_DuplicateTag_DoesNotAddAgain() {
        var item = CreateValidContentItem();
        var tag = NotEmptyString.Create("fantasy").Value;
        item.AddTag(tag);
        item.AddTag(tag);

        item.Tags.Should().HaveCount(1);
    }

    [Fact]
    public void RemoveTag_ExistingTag_RemovesIt() {
        var item = CreateValidContentItem();
        var tag = NotEmptyString.Create("fantasy").Value;
        item.AddTag(tag);

        item.RemoveTag(tag);

        item.Tags.Should().NotContain(tag);
    }

    // 4. Unit Spec
    [Fact]
    public void SetUnitSpec_Ongoing_SetsSpecWithoutClearingTracks() {
        var item = CreateValidContentItem();
        var spec = ContentUnitSpec.CreateOngoing(ContentUnitType.Episode).Value;

        item.SetUnitSpec(spec);

        item.UnitSpec.Should().Be(spec);
    }

    [Fact]
    public void RemoveUnitSpec_ClearsTracks() {
        var item = CreateValidContentItem();
        item.SetUnitSpec(ContentUnitSpec.CreateFinished(ContentUnitType.Chapter, 10).Value);
        item.AddConsumptionTrack(IntentionType.Fun, NotEmptyString.Create("My Track").Value);

        item.RemoveUnitSpec();

        item.UnitSpec.Should().BeNull();
        item.ConsumptionTracks.Should().BeEmpty();
    }

    [Fact]
    public void SetUnitSpec_FinishedWithTotal_CapsTracksExceedingTotalAndCompletesInProgress() {
        var item = CreateValidContentItem();
        item.SetUnitSpec(ContentUnitSpec.CreateOngoing(ContentUnitType.Page).Value);
        var trackId = item.AddConsumptionTrack(IntentionType.Fun, NotEmptyString.Create("Read").Value).Value;
        item.StartTrack(trackId);
        item.SetTrackProgress(trackId, 50);

        var newSpec = ContentUnitSpec.CreateFinished(ContentUnitType.Page, 30).Value;
        item.SetUnitSpec(newSpec);

        var track = item.ConsumptionTracks.First();
        track.CurrentUnit.Should().Be(30);
        track.Status.Should().Be(ConsumptionStatus.Completed);
        track.CompletedAt.Should().NotBeNull();
    }

    // 5. Add consumption track
    [Fact]
    public void AddConsumptionTrack_WithoutUnitSpec_ReturnsError() {
        var item = CreateValidContentItem();

        var result = item.AddConsumptionTrack(IntentionType.Fun, NotEmptyString.Create("X").Value);

        result.IsError.Should().BeTrue();
        result.Errors.Should().Contain(e => e.Code == ContentItem.MustHaveUnitSpecError.Code);
    }

    [Fact]
    public void AddConsumptionTrack_WithSpec_ReturnsTrackId() {
        var item = CreateValidContentItem();
        item.SetUnitSpec(ContentUnitSpec.CreateFinished(ContentUnitType.Episode, 12).Value);

        var result = item.AddConsumptionTrack(IntentionType.Fun, NotEmptyString.Create("Watch").Value);

        ErrorOrAssert.IsSuccess(result);
        result.Value.Should().NotBe(Guid.Empty);
        item.ConsumptionTracks.Should().HaveCount(1);
    }

    // 6. Track lifecycle transitions
    [Fact]
    public void StartTrack_IdleToInProgress_Success() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);

        var result = item.StartTrack(trackId);

        ErrorOrAssert.IsSuccess(result);
        var track = item.ConsumptionTracks.First();
        track.Status.Should().Be(ConsumptionStatus.InProgress);
        track.StartedAt.Should().NotBeNull();
    }

    [Fact]
    public void StartTrack_AlreadyStarted_ReturnsError() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);
        item.StartTrack(trackId);

        var result = item.StartTrack(trackId);

        ErrorOrAssert.IsError(result, ConsumptionTrack.AlreadyStartedError.Code);
    }

    [Fact]
    public void PauseTrack_InProgress_Success() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);
        item.StartTrack(trackId);

        var result = item.PauseTrack(trackId);

        ErrorOrAssert.IsSuccess(result);
        item.ConsumptionTracks.First().Status.Should().Be(ConsumptionStatus.OnHold);
    }

    [Fact]
    public void ResumeTrack_OnHold_Success() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);
        item.StartTrack(trackId);
        item.PauseTrack(trackId);

        var result = item.ResumeTrack(trackId);

        ErrorOrAssert.IsSuccess(result);
        item.ConsumptionTracks.First().Status.Should().Be(ConsumptionStatus.InProgress);
    }

    [Fact]
    public void CompleteTrack_InProgress_SuccessAndSetsCompletedAt() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);
        item.StartTrack(trackId);

        var result = item.CompleteTrack(trackId);

        ErrorOrAssert.IsSuccess(result);
        var track = item.ConsumptionTracks.First();
        track.Status.Should().Be(ConsumptionStatus.Completed);
        track.CompletedAt.Should().NotBeNull();
    }

    [Fact]
    public void DropTrack_InProgress_Success() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);
        item.StartTrack(trackId);

        var result = item.DropTrack(trackId);

        ErrorOrAssert.IsSuccess(result);
        item.ConsumptionTracks.First().Status.Should().Be(ConsumptionStatus.Dropped);
    }

    [Fact]
    public void DropTrack_AlreadyCompleted_ReturnsError() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);
        item.StartTrack(trackId);
        item.CompleteTrack(trackId);

        var result = item.DropTrack(trackId);

        ErrorOrAssert.IsError(result, ConsumptionTrack.AlreadyCompletedError.Code);
    }

    [Fact]
    public void CompleteTrack_NotInProgress_ReturnsError() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);

        var result = item.CompleteTrack(trackId);

        ErrorOrAssert.IsError(result, ConsumptionTrack.NotInProgressError.Code);
    }

    // 7. Progress updates
    [Fact]
    public void SetProgress_ValidValue_Success() {
        var item = CreateStartedTrackWithTotal(10);
        var trackId = GetFirstTrackId(item);

        var result = item.SetTrackProgress(trackId, 5);

        ErrorOrAssert.IsSuccess(result);
        item.ConsumptionTracks.First().CurrentUnit.Should().Be(5);
    }

    [Fact]
    public void SetProgress_ExceedTotal_ReturnsError() {
        var item = CreateStartedTrackWithTotal(5);
        var trackId = GetFirstTrackId(item);

        var result = item.SetTrackProgress(trackId, 6);

        ErrorOrAssert.IsError(result, ConsumptionTrack.CannotExceedTotalUnitsError(1).Code);
    }

    [Fact]
    public void SetProgress_Negative_ReturnsError() {
        var item = CreateStartedTrackWithTotal(10);
        var trackId = GetFirstTrackId(item);

        var result = item.SetTrackProgress(trackId, -1);

        ErrorOrAssert.IsError(result, ConsumptionTrack.CannotGoBelowZeroError.Code);
    }

    [Fact]
    public void IncrementProgress_By2_Success() {
        var item = CreateStartedTrackWithTotal(10);
        var trackId = GetFirstTrackId(item);
        item.SetTrackProgress(trackId, 3);

        var result = item.IncrementTrackProgress(trackId, 2);

        ErrorOrAssert.IsSuccess(result);
        item.ConsumptionTracks.First().CurrentUnit.Should().Be(5);
    }

    [Fact]
    public void IncrementProgress_ZeroAmount_ReturnsError() {
        var item = CreateStartedTrackWithTotal(10);
        var trackId = GetFirstTrackId(item);

        var result = item.IncrementTrackProgress(trackId, 0);

        ErrorOrAssert.IsError(result, ConsumptionTrack.IncrementMustBePositiveError.Code);
    }

    [Fact]
    public void DecrementProgress_ToZero_Success() {
        var item = CreateStartedTrackWithTotal(10);
        var trackId = GetFirstTrackId(item);
        item.SetTrackProgress(trackId, 2);

        var result = item.DecrementTrackProgress(trackId, 2);

        ErrorOrAssert.IsSuccess(result);
        item.ConsumptionTracks.First().CurrentUnit.Should().Be(0);
    }

    [Fact]
    public void DecrementProgress_BelowZero_ReturnsError() {
        var item = CreateStartedTrackWithTotal(10);
        var trackId = GetFirstTrackId(item);

        var result = item.DecrementTrackProgress(trackId, 1);

        ErrorOrAssert.IsError(result, ConsumptionTrack.CannotGoBelowZeroError.Code);
    }

    [Fact]
    public void SetProgress_OngoingSpec_AllowsAnyValue() {
        var item = CreateValidContentItem();
        item.SetUnitSpec(ContentUnitSpec.CreateOngoing(ContentUnitType.Page).Value);
        var trackId = item.AddConsumptionTrack(IntentionType.Fun, NotEmptyString.Create("Infinity").Value).Value;
        item.StartTrack(trackId);

        var result = item.SetTrackProgress(trackId, 9999);

        ErrorOrAssert.IsSuccess(result);
    }

    // 8. Removing tracks
    [Fact]
    public void RemoveConsumptionTrack_ExistingTrack_RemovesIt() {
        var item = CreateItemWithTrack();
        var trackId = GetFirstTrackId(item);

        var result = item.RemoveConsumptionTrack(trackId);

        ErrorOrAssert.IsSuccess(result);
        item.ConsumptionTracks.Should().BeEmpty();
    }

    [Fact]
    public void RemoveConsumptionTrack_NotExisting_ReturnsError() {
        var item = CreateItemWithTrack();

        var result = item.RemoveConsumptionTrack(Guid.NewGuid());

        ErrorOrAssert.IsError(result, ContentItem.TrackNotFoundError(Guid.Empty).Code);
    }

    private static ContentItem CreateValidContentItem() {
        var title = NotEmptyString.Create("Test Content").Value;
        return ContentItem.Create(title, ContentItemFormat.Watchable);
    }

    private static ContentItem CreateItemWithTrack() {
        var item = CreateValidContentItem();
        item.SetUnitSpec(ContentUnitSpec.CreateFinished(ContentUnitType.Episode, 12).Value);
        item.AddConsumptionTrack(IntentionType.Fun, NotEmptyString.Create("Main").Value);
        return item;
    }

    private static Guid GetFirstTrackId(ContentItem item) {
        return item.ConsumptionTracks.First().Id;
    }

    private static ContentItem CreateStartedTrackWithTotal(int totalUnits) {
        var item = CreateValidContentItem();
        item.SetUnitSpec(ContentUnitSpec.CreateFinished(ContentUnitType.Chapter, totalUnits).Value);
        var trackId = item.AddConsumptionTrack(IntentionType.Fun, NotEmptyString.Create("Track").Value).Value;
        item.StartTrack(trackId);
        return item;
    }
}
