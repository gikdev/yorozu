using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.GetProjectById;

internal class GetProjectByIdQueryHandler(
    IProjectRepository projectRepository
) : IRequestHandler<GetProjectByIdQuery, ErrorOr<Project>> {
    public async Task<ErrorOr<Project>> Handle(GetProjectByIdQuery request, CancellationToken cancellationToken) {
        var project = await projectRepository.GetByIdAsync(request.ProjectId, cancellationToken);
        if (project is null) return Error.NotFound(description: "Project not found");
        return project;
    }
}
