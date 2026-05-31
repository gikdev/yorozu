#pragma warning disable CA1008 // Enums should have zero value

using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public class ContentItem : IAggregateRoot {
    public required Guid Id { get; init; }
    public required ContentItemType Type { get; set; }
    public required List<Title> Titles { get; set; }
    public required List<ConsumptionTrack> ConsumptionTracks { get; set; }
    public required List<string> Tags { get; set; }
    public required List<Genre> Genres { get; set; }
    public required ContentUnitSpecification UnitSpecification { get; set; }
    public required ContentItemGallery Gallery { get; set; }
    public required bool IsSecret { get; set; }
    public required bool IsBookmarked { get; set; }
    public required bool IsFavorite { get; set; }
    public required List<Goal> Goals { get; set; }
    public required List<Note> Notes { get; set; }
    public required List<ToDoItem> Todos { get; set; }
    public required List<Location> Locations { get; set; }
}

public class ContentItemGallery {
    public List<GalleryImage> Images { get; set; } = [];
    public Guid? PrimaryImageId { get; set; }
    public string? PlaceholderColor { get; set; } = "#3A3A3A";
}

public enum ImageSourceType { Url, FilePath }

public class GalleryImage {
    public Guid Id { get; init; }
    public ImageSourceType SourceType { get; set; }
    public string Value { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}

public interface IHasTimestamps {
    DateTimeOffset CreatedAt { get; }
    DateTimeOffset UpdatedAt { get; set; }
}

public record ContentUnitSpecification {
    public required ContentUnitType UnitType { get; init; }
    public required int? TotalUnits { get; init; }
    public required bool IsOngoing { get; init; }
}

public class Location {
    public required Guid Id { get; init; }
    public required LocationType Type { get; set; }
    public required string Value { get; set; }
    public required string Title { get; set; }
}

public enum LocationType { FilePath, Url, Physical }

public enum Genre {
    // Demographics / Target audience
    Shounen, Shoujo, Seinen, Josei, Kids, Adult,

    // Anime-specific sub-genres / tropes
    Isekai, Mecha, MagicalGirl, Harem, ReverseHarem, CuteGirlsDoingCuteThings, Cyberpunk,

    // General fiction
    Action, Adventure, Comedy, Drama, Fantasy, Horror, Mystery, Romance, SciFi,
    SliceOfLife, Thriller, Historical, Supernatural, Psychological, Tragedy,
    Dystopian, Western, Crime,

    // Non-fiction / real-world
    NonFiction, SelfHelp, Biography, Memoir, Technology, Science, Philosophy,
    Art, Music, Cooking, Travel, Business, Health, Education, Sports,
    TrueCrime, History, Politics
}

public class ConsumptionTrack {
    public required Guid Id { get; init; }
    public required IntentionType Type { get; set; }
    public required ConsumptionStatus Status { get; set; }
    public required ContentUnitType UnitType { get; set; }
    public required int CurrentUnit { get; set; }
    public string? Description { get; set; }
}

public class Title {
    public required Guid Id { get; init; }
    public required string Text { get; init; }
    public required Language Language { get; init; }
    public required TitleKind Kind { get; init; }
}

public class QuickRecommendation {
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Title { get; set; }
    public ContentItemType? Type { get; set; }
    public string? Link { get; set; }
    public string? Note { get; set; }
    public DateTimeOffset CreatedAt { get; init; } = DateTimeOffset.UtcNow;
}

public class Goal {
    public Guid Id { get; init; } = Guid.NewGuid();
    public required Guid ConsumptionTrackId { get; set; }
    public required string Description { get; set; }
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }
}

public class Note {
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Text { get; set; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public Guid? ConsumptionTrackId { get; set; }   // optional link
}

public class ToDoItem {
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Description { get; set; }
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public Guid? ConsumptionTrackId { get; set; }   // optional link
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}
