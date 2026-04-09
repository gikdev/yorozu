namespace Backend.Domain.InDevelopment;

public record Thought : Entity
{
  public required string Title { get; init; }
  public required bool IsHighlighted { get; init; } = false;
  public required DateTime? ArchivedAt { get; init; }
}
