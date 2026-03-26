using Fanoos.Application.Backups.Common;
using Fanoos.Application.Todos;
using Fanoos.Common.Data;
using Fanoos.Common.Domain;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Backups.RestoreBackup;

internal sealed class RestoreBackupCommandHandler(
    ITodoRepository todoRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<RestoreBackupCommand, bool> {
    public async Task<bool> Handle(RestoreBackupCommand dto, CancellationToken cancellationToken) {
        List<Todo> todos = dto.Todos.ConvertAll(MapToDomain);

        await todoRepository.RestoreBackup(todos, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static Todo MapToDomain(TodoPersistenceDto dto) {
        return Todo.Create(
            waitingForInfo: dto.WaitingForInfo == null ? null : new WaitingForInfo {
                Description = NotEmptyString.Create(dto.WaitingForInfo.Description).Value,
                ReviewAt = FutureDateTimeOffset._Restore(dto.WaitingForInfo.ReviewAt)
            },
            bucket: (TodoBucket)dto.Bucket,
            energyLevel: (EnergyLevel)dto.EnergyLevel,
            effortType: (TodoEffortType)dto.EffortType,
            priority: (TodoPriority)dto.Priority,
            contexts: dto.Contexts.Select(x => NotEmptyString.Create(x).Value).ToList(),
            dueDate: dto.DueDate.HasValue ? FutureDateTimeOffset._Restore(dto.DueDate.Value) : null,
            isDone: dto.IsDone,
            isUrgent: dto.IsUrgent,
            estimatedPomodoros: dto.EstimatedPomodoros,
            description: dto.Description == null ? null : NotEmptyString.Create(dto.Description).Value,
            why: dto.Why == null ? null : NotEmptyString.Create(dto.Why).Value,
            title: NotEmptyString.Create(dto.Title).Value,
            id: dto.Id
        ).Value;
    }
}
