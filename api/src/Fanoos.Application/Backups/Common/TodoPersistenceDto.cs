namespace Fanoos.Application.Backups.Common; 

public sealed class TodoPersistenceDto {
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public required string? Context { get; init; }
    public required string? Project { get; init; }
    public required int? Time { get; init; }
    public required string? Tag { get; init; }
    public required string EnergyLevel { get; init; }
    public required string Bucket { get; init; }
    public required bool IsImportant { get; init; }
    public required bool IsUrgent { get; init; }
    public required bool IsDone { get; init; }
    public required bool IsArchived { get; init; }
}
