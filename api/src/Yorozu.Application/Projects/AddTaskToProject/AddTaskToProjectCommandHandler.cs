using ErrorOr;
using MediatR;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.AddTaskToProject;

internal class AddTaskToProjectCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<AddTaskToProjectCommand, ErrorOr<ProjectTask>> {
    public async Task<ErrorOr<ProjectTask>> Handle(AddTaskToProjectCommand request, CancellationToken cancellationToken) {
        var project = await projectRepository.GetByIdAsync(request.ProjectId, cancellationToken);
        if (project is null) return Error.NotFound(description: "Project not found");

        var titleResult = NotEmptyString.Create(request.Title);
        if (titleResult.IsError) return titleResult.Errors;
        var title = titleResult.Value;

        var task = project.AddTodoItem(title, request.Status);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return task;
    }
}
