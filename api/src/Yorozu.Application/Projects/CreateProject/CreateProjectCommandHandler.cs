using ErrorOr;
using MediatR;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.Projects;

namespace Yorozu.Application.Projects.CreateProject;

internal class CreateProjectCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateProjectCommand, ErrorOr<Project>> {
    public async Task<ErrorOr<Project>> Handle(CreateProjectCommand request, CancellationToken cancellationToken) {
        var titleResult = NotEmptyString.Create(request.Title);
        if (titleResult.IsError) return titleResult.Errors;
        var title = titleResult.Value;

        var emojiResult = NotEmptyString.Create(request.Title);
        if (emojiResult.IsError) return emojiResult.Errors;
        var emoji = emojiResult.Value;

        var project = new Project {
            Id = Guid.NewGuid(),
            Title = title,
            Emoji = emoji,
        };

        projectRepository.Add(project);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return project;
    }
}
