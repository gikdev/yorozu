using Yorozu.Common.Domain;

namespace Yorozu.Domain.Projects;

public class ProjectTask : IEntity {
    public required Guid Id { get; init; }
    public required NotEmptyString Title { get; set; }
    public required TaskStatus Status { get; set; }
}
