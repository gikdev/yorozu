using ErrorOr;
using MediatR;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.ChangeTaskTitle;

internal class ChangeTaskTitleCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ChangeTaskTitleCommand, ErrorOr<ProjectTask>> {
    public async Task<ErrorOr<ProjectTask>> Handle(ChangeTaskTitleCommand request, CancellationToken cancellationToken) {
        var project = await projectRepository.GetByIdAsync(request.ProjectId, cancellationToken);
        if (project is null) return Error.NotFound(description: "Project not found");

        var titleResult = NotEmptyString.Create(request.NewTitle);
        if (titleResult.IsError) return titleResult.Errors;
        var title = titleResult.Value;

        project.RenameTodoItem(request.TaskId, title);

        await unitOfWork.SaveChangesAsync(cancellationToken);

        var task = project.Tasks.FirstOrDefault(t => t.Id == request.TaskId);
        if (task is null) return Error.NotFound("Task not found");

        return task;
    }
}
