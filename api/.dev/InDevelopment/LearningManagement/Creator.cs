namespace Backend.Domain.InDevelopment;

public record Creator : Entity {
    public required string  Name           { get; init; }
    public required string? ProfileUrl     { get; init; }
    public required string? ContactDetails { get; init; }
    public required string? Bio            { get; init; }
}
