using ErrorOr;
using MediatR;
using Yorozu.Common.Data;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.ChangeTaskStatus;

internal class ChangeTaskStatusCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ChangeTaskStatusCommand, ErrorOr<ProjectTask>> {
    public async Task<ErrorOr<ProjectTask>> Handle(ChangeTaskStatusCommand request, CancellationToken cancellationToken) {
        var project = await projectRepository.GetByIdAsync(request.ProjectId, cancellationToken);
        if (project is null) return Error.NotFound(description: "Project not found");

        project.ChangeTodoStatus(request.TaskId, request.NewStatus);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        var task = project.Tasks.FirstOrDefault(t => t.Id == request.TaskId);
        if (task is null) return Error.NotFound("Task not found");

        return task;
    }
}
