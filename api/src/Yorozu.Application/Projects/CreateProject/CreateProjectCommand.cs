using ErrorOr;
using MediatR;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.CreateProject; 

public record CreateProjectCommand : IRequest<ErrorOr<Project>> {
    public required string Title { get; init; }
    public required string? Emoji { get; init; }
}
