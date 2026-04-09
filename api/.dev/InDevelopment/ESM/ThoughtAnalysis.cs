namespace Backend.Domain.InDevelopment;

public record ThoughtAnalysis
{
  public required Guid ThoughtId { get; init; }

  public required string? Description { get; init; }
  public required string? AiFeedback { get; init; }
  public required bool IsClear { get; init; }
  public required string[] Tags { get; init; }
  public required EarlyMaladaptiveSchema[]? ProbableSchemas { get; init; }
}
