using ErrorOr;
using MediatR;

namespace Yorozu.Application.Projects.DeleteProject;

public record DeleteProjectCommand(Guid ProjectId) : IRequest<ErrorOr<Deleted>>;
