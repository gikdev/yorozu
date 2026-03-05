namespace Fanoos.Domain.Todos;

internal sealed record EisenhowerMatrix {
    public required bool IsUrgent { get; init; }
    public required bool IsImportant { get; init; }
}
