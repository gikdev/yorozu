namespace Backend.Domain.InDevelopment;

public record SimpleContact : Entity
{
  public required string       Name { get; init; }
  public required List<string> Phones { get; init; }
  public required string?      Note { get; init; }
  // phones, emails, each as another object "VO" or "Entity".
  // nick name, known as, middle name, first & last names
}
