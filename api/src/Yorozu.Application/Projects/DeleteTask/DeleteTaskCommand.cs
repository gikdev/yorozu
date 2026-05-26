using ErrorOr;
using MediatR;

namespace Yorozu.Application.Projects.DeleteTask;

public record DeleteTaskCommand(Guid ProjectId, Guid TaskId) : IRequest<ErrorOr<Deleted>>;
