#pragma warning disable CA1008 // Enums should have zero value

using Yorozu.Common.Domain;

namespace Yorozu.Domain.ContentItems;

public class ContentItem : IAggregateRoot {
    public required Guid Id { get; init; }
    public required ContentItemType Type { get; set; }
    public required List<Title> Titles { get; set; }
    public required List<IntentionTrack> IntentionTracks { get; set; }
    public required List<string> Tags { get; set; }
    public required ContentUnitType UnitType { get; set; }
    public required int? UnitMax { get; set; }
    public required bool IsAiring { get; set; }
    public required bool IsSecret { get; set; }
    public required bool IsBookmarked { get; set; }
    public required bool IsFavorite { get; set; }
    public required List<Goal> Goals { get; set; }
    public required List<Note> Notes { get; set; }
    public required List<Todo> Todos { get; set; }
}

public enum Genre {
    // Demographics / Target audience (mostly anime/manga but can apply to books too)
    Shounen,
    Shoujo,
    Seinen,
    Josei,
    Kids,
    Adult,

    // Anime-specific sub-genres / tropes
    Isekai,
    Mecha,
    MagicalGirl,
    Harem,
    ReverseHarem,
    Yuri,
    Yaoi,
    ShounenAi,
    ShoujoAi,
    Ecchi,
    Hentai,

    // General fiction (books, movies, podcasts)
    Action,
    Adventure,
    Comedy,
    Drama,
    Fantasy,
    Horror,
    Mystery,
    Romance,
    SciFi,
    SliceOfLife,
    Thriller,
    Historical,
    Supernatural,
    Psychological,
    Tragedy,

    // Non‑fiction / real‑world (for books, podcasts, courses)
    NonFiction,
    SelfHelp,
    Biography,
    Memoir,
    Technology,
    Science,
    Philosophy,
    Art,
    Music,
    Cooking,
    Travel,
    Business,
    Health,
    Education,
    Sports,
}

public class IntentionTrack {
    public required Guid Id { get; init; }
    public required IntentionType Type { get; set; }
    public required IntentionStatus Status { get; set; }
    public required ContentUnitType UnitType { get; set; }
    public required int CurrentUnit { get; set; }
    public string? Description { get; set; }
}

public enum IntentionType {
    Unknown = 0,
    Fun = 1,
    Learning = 2,
}

public enum IntentionStatus {
    ToStart = 1,
    InProgress = 2,
    Completed = 3,
    OnHold = 4,
    Dropped = 5,
}

public enum ContentUnitType {
    Unknown = 0,
    Minute = 1,
    Hour = 2,
    Episode = 3,
    Page = 4,
    Chapter = 5,
    Lesson = 6,
    Track = 7,
    Session = 8,
    Volume = 9,
    Percent = 10,
}

public enum ContentItemType {
    Readable = 1,
    Listenable = 2,
    Watchable = 3,
}

public class Title {
    public required Guid Id { get; init; }
    public required string Text { get; init; }
    public required Language Language { get; init; }
    public required TitleKind Kind { get; init; }
}

public enum TitleKind {
    None = 0,
    Real = 1,
    Nick = 2,
}

public enum Language {
    Unknown = 0,
    Persian = 1,
    English = 2,
    Japanese = 3,
    Arabic = 4,
    Spanish = 5,
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
    public required Guid IntentionTrackId { get; set; }
    public required string Description { get; set; }
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }
}

public class Note {
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Text { get; set; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public Guid? IntentionTrackId { get; set; }   // optional link
}

public class Todo {
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Description { get; set; }
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public Guid? IntentionTrackId { get; set; }   // optional link
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}

