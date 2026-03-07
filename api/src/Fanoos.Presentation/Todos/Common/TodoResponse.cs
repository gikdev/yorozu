using Fanoos.Domain.Todos;

namespace Fanoos.Presentation.Todos.Common;

internal sealed record TodoResponse {
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public required string RawTitle { get; init; }
    public required string? Context { get; init; }
    public required string? Project { get; init; }
    public required int? Time { get; init; }
    public required string? Tag { get; init; }
    public required EnergyLevel? EnergyLevel { get; init; }
    public required bool IsImportant { get; init; }
    public required bool IsUrgent { get; init; }
    public required bool IsDone { get; init; }
    public required bool IsArchived { get; init; }
}
