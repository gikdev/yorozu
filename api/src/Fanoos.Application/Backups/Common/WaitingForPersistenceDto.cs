namespace Fanoos.Application.Backups.Common;

public sealed record WaitingForPersistenceDto {
    public required string Description { get; init; }
    public required DateTimeOffset ReviewAt { get; init; }
}
