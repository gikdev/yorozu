namespace Fanoos.Application.Backups.Common;

public record BackupDto {
    public required int Version { get; init; }
    public required List<TodoPersistenceDto> Todos { get; init; }
}
