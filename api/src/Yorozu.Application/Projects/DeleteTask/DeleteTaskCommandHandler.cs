using ErrorOr;
using MediatR;
using Yorozu.Common.Data;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.DeleteTask;

internal class DeleteTaskCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteTaskCommand, ErrorOr<Deleted>> {
    public async Task<ErrorOr<Deleted>> Handle(DeleteTaskCommand request, CancellationToken cancellationToken) {
        var project = await projectRepository.GetByIdAsync(request.ProjectId, cancellationToken);
        if (project is null) return Error.NotFound(description: "Project not found");

        project.RemoveTodoItem(request.TaskId);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Deleted;
    }
}
