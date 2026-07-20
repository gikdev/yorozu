namespace Yorozu.Domain.Songs;

public record LyricLine {
    public required float? Timestamp { get; set; }
    public required string? Persian { get; set; }
    public required string? English { get; set; }
    public required string? Japanese { get; set; }
    public required string? Arabic { get; set; }
    public required string? Romaji { get; set; }
    public required string? Spanish { get; set; }
    public required string? Annotation { get; set; }
    public required LyricTextKind MainKind { get; set; }
}
