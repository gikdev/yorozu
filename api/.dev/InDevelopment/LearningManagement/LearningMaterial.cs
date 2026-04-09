namespace Backend.Domain.InDevelopment;

public record LearningMaterial : Entity {
    public required LearningMaterialType   Type        { get; init; }
    public required string                 Title       { get; init; }
    public required string[]               Authors     { get; init; }
    public required LearningMaterialStatus Status      { get; init; } = LearningMaterialStatus.Planned;
    public required string?                ResumeNote  { get; init; }
    public required byte?                  Rating      { get; init; }
    public required string[]?              Tags        { get; init; }
    public required string?                SourceUrl   { get; init; }
    public required DateTimeOffset?        CompletedAt { get; init; }
    public required LearningMaterialSize?  Size        { get; init; }
}
