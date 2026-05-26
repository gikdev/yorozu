using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.GetProjects;

public record GetProjectsQuery : IRequest<ErrorOr<IReadOnlyList<Project>>>;
