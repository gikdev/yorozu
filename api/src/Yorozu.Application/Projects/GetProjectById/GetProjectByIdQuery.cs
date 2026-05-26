using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.GetProjectById;

public record GetProjectByIdQuery(Guid ProjectId) : IRequest<ErrorOr<Project>>;
