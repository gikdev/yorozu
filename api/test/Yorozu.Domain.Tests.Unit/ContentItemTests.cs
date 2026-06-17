using FluentAssertions;
using Yorozu.Common.Domain;
using Yorozu.Domain.ContentItems;

namespace Yorozu.Domain.Tests.Unit;

public class ContentItemTests {
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

        item.ChangeUnitSpec(spec, 0);

        item.UnitSpec.Should().Be(spec);
    }

    private static ContentItem CreateValidContentItem() {
        var title = NotEmptyString.Create("Test Content").Value;
        return ContentItem.Create(title, ContentItemFormat.Watchable);
    }
}
