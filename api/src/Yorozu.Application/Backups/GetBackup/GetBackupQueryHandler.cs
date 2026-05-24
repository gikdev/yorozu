using Yorozu.Application.Backups.Common;
using Yorozu.Application.Todos;
using Yorozu.Domain.Todos;
using MediatR;

namespace Yorozu.Application.Backups.GetBackup;

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
            Id = t.Id,
            IsDone = t.IsDone,
            IsUrgent = t.IsUrgent,
            Title = t.Title.Value,
            Bucket = (int)t.Bucket,
            Contexts = t.Contexts.Select(x => x.Value).ToList(),
            Description = t.Description?.Value,
            DueDate = t.DueDate?.Value,
            EffortType = (int)t.EffortType,
            EnergyLevel = (int)t.EnergyLevel,
            EstimatedPomodoros = t.EstimatedPomodoros,
            Priority = (int)t.Priority,
            Why = t.Why?.Value,
            WaitingForInfo = t.WaitingForInfo == null ? null : new WaitingForPersistenceDto {
                Description = t.WaitingForInfo.Description.Value,
                ReviewAt = t.WaitingForInfo.ReviewAt.Value,
            },
        };
    }
}
