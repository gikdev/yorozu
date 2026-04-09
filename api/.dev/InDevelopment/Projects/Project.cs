namespace Backend.Domain.InDevelopment;

public record Project : Entity
{
  public required string Title { get; init; }
  public required string? Description { get; init; }
  public required DateTime? StartDate { get; init; }
  public required DateTime? DueDate { get; init; }
  public required bool IsArchived { get; init; } = false;
}
