using ErrorOr;
using MediatR;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.UpdateProject;

internal class UpdateProjectCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<UpdateProjectCommand, ErrorOr<Project>> {
    public async Task<ErrorOr<Project>> Handle(UpdateProjectCommand request, CancellationToken cancellationToken) {
        var project = await projectRepository.GetByIdAsync(request.ProjectId, cancellationToken);
        if (project is null) return Error.NotFound(description: "Project not found");

        var titleResult = NotEmptyString.Create(request.Title);
        if (titleResult.IsError) return titleResult.Errors;

        var emojiResult = NotEmptyString.Create(request.Emoji ?? string.Empty);
        if (emojiResult.IsError) return emojiResult.Errors;

        project.Title = titleResult.Value;
        project.Emoji = emojiResult.Value;

        projectRepository.Update(project);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return project;
    }
}
