namespace Backend.Domain.InDevelopment;

public record Transaction : Entity
{
  public required string Note { get; init; }
  public required int Amount { get; init; }
  public required bool IsPositive { get; init; }
  public required DateTime CreatedAt { get; init; }
}
