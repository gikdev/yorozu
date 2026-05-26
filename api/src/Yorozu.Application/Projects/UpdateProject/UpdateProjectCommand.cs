using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.UpdateProject;

public record UpdateProjectCommand : IRequest<ErrorOr<Project>> {
    public required Guid ProjectId { get; init; }
    public required string Title { get; init; }
    public string? Emoji { get; init; }
}
