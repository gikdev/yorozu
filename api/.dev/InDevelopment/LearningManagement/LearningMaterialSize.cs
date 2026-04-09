namespace Backend.Domain.InDevelopment;

public record LearningMaterialSize {
    public required int                      Value { get; init; }
    public required LearningMaterialSizeType Type  { get; init; }
}
