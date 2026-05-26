using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.GetProjects;

internal class GetProjectsQueryHandler(
    IProjectRepository projectRepository
) : IRequestHandler<GetProjectsQuery, ErrorOr<IReadOnlyList<Project>>> {
    public async Task<ErrorOr<IReadOnlyList<Project>>> Handle(GetProjectsQuery request, CancellationToken cancellationToken) {
        return (await projectRepository.ListAsync(cancellationToken)).ToList().AsReadOnly();
    }
}
