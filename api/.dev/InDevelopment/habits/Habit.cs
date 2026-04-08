namespace Backend.Domain.InDevelopment;

public record Habit : Entity
{
  public required string Name { get; init; }
  public required string? Description { get; init; }
  public required int CurrentStreak { get; init; } = 0;
  public required DateTime? LastCompletedAt { get; init; }
  public required HabitCompletion[] Completions { get; init; } = [];
}
