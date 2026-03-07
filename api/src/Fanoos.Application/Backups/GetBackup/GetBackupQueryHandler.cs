using Fanoos.Application.Backups.Common;
using Fanoos.Application.Todos;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Backups.GetBackup;

internal sealed class GetBackupQueryHandler(
    ITodoRepository todoRepository
) : IRequestHandler<GetBackupQuery, BackupDto> {
    public async Task<BackupDto> Handle(GetBackupQuery request, CancellationToken cancellationToken) {
        List<Todo> todos = await todoRepository.GetBackup(cancellationToken);

        return new BackupDto {
            Version = Constants.CurrentVersion,
            Todos = todos.ConvertAll(MapToDto),
        };
    }

    private static TodoPersistenceDto MapToDto(Todo t) {
        return new TodoPersistenceDto {
            Bucket = t.Bucket.ToString(),
            Context = t.Context,
            EnergyLevel = t.EnergyLevel.ToString(),
            Id = t.Id,
            IsArchived = t.IsArchived,
            IsDone = t.IsDone,
            IsImportant = t.IsImportant,
            IsUrgent = t.IsUrgent,
            Project = t.Project,
            Tag = t.Tag,
            Time = t.Time,
            Title = t.Title,
        };
    }
}
