namespace Backend.Domain.InDevelopment;

public record Budget : Entity
{
  public required Transaction[] Transactions { get; init; }
  public required string Name { get; init; }
  public required long Remaining { get; init; }
}
