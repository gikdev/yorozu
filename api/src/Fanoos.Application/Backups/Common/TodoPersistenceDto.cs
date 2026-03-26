namespace Fanoos.Application.Backups.Common;

public sealed record TodoPersistenceDto {
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public required string? Why { get; init; }
    public required string? Description { get; init; }
    public required byte? EstimatedPomodoros { get; init; }
    public required int EnergyLevel { get; init; }
    public required int Bucket { get; init; }
    public required bool IsUrgent { get; init; }
    public required bool IsDone { get; init; }
    public required DateTimeOffset? DueDate { get; init; }
    public required IEnumerable<string> Contexts { get; init; }
    public required int Priority { get; set; }
    public required int EffortType { get; set; }
    public required WaitingForPersistenceDto? WaitingForInfo { get; set; }
}
