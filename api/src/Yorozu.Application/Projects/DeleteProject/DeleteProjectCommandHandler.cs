using ErrorOr;
using MediatR;
using Yorozu.Common.Data;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.DeleteProject;

internal class DeleteProjectCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteProjectCommand, ErrorOr<Deleted>> {
    public async Task<ErrorOr<Deleted>> Handle(DeleteProjectCommand request, CancellationToken cancellationToken) {
        var project = await projectRepository.GetByIdAsync(request.ProjectId, cancellationToken);
        if (project is null) return Error.NotFound(description: "Project not found");

        projectRepository.Delete(project);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return Result.Deleted;
    }
}
