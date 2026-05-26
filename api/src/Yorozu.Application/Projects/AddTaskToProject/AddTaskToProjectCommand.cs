using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.AddTaskToProject;

public record AddTaskToProjectCommand : IRequest<ErrorOr<ProjectTask>> {
    public required Guid ProjectId { get; init; }
    public required string Title { get; init; }
    public Domain.Projects.TaskStatus Status { get; init; } = Domain.Projects.TaskStatus.Backlog;
}
