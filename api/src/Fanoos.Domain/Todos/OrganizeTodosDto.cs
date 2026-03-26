namespace Fanoos.Domain.Todos;

public sealed record OrganizeTodosDto {
    public required byte? AvailablePomodoros { get; init; }
    public required EnergyLevel? AvailableEnergyLevel { get; init; }
    public required TodoBucket? Bucket { get; init; }
    public required string? ExcludeQuery { get; init; }
    public required string? IncludeQuery { get; init; }
    public required TodoSortBy? SortBy { get; init; }
    public required TodoSortOrder? SortOrder { get; init; }
}
