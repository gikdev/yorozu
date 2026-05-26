namespace Yorozu.Domain.Projects;

public interface IProjectRepository {
    Task<Project?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Project>> ListAsync(CancellationToken cancellationToken = default);
    void Add(Project project);
    void Update(Project project);
    void Delete(Project project);
}
