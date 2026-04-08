namespace Backend.Domain.InDevelopment;

public record HabitCompletion : Entity
{
  public required string? Note { get; init; }
  public required DateTime CompletedAt { get; init; }
}
