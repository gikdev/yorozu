using Fanoos.Application.Backups.Common;
using Fanoos.Application.Todos;
using Fanoos.Common.Data;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Backups.RestoreBackup;

internal sealed class RestoreBackupCommandHandler(
    ITodoRepository todoRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<RestoreBackupCommand, bool> {
    public async Task<bool> Handle(RestoreBackupCommand request, CancellationToken cancellationToken) {
        List<Todo> todos = request.Todos.ConvertAll(MapToDomain);

        await todoRepository.RestoreBackup(todos, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static Todo MapToDomain(TodoPersistenceDto dto) {
        return Todo.Create(
            id: dto.Id,
            isArchived: dto.IsArchived,
            isDone: dto.IsDone,
            isUrgent: dto.IsUrgent,
            isImportant: dto.IsImportant,
            bucket: (dynamic)dto.Bucket,
            energyLevel: (dynamic)dto.EnergyLevel,
            tag: dto.Tag,
            time: dto.Time,
            project: dto.Project,
            context: dto.Context,
            title: dto.Title
        ).Value;
    }
}
