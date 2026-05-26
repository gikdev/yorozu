using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.ChangeTaskStatus;

public record ChangeTaskStatusCommand : IRequest<ErrorOr<ProjectTask>> {
    public required Guid ProjectId { get; init; }
    public required Guid TaskId { get; init; }
    public required Domain.Projects.TaskStatus NewStatus { get; init; }
}
