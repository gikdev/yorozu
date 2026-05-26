using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.ChangeTaskTitle;

public record ChangeTaskTitleCommand : IRequest<ErrorOr<ProjectTask>> {
    public required Guid ProjectId { get; init; }
    public required Guid TaskId { get; init; }
    public required string NewTitle { get; init; }
}
