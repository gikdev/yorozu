using Yorozu.Domain.Songs;

namespace Yorozu.Application.Songs.Common;

public interface ISongRepository {
    void Add(Song song);
    void Update(Song song);
    void Remove(Song song);
    Task<Song?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<string>> GetAllTagsAsync(CancellationToken cancellationToken = default);
    Task<List<Song>> ListAsync(CancellationToken cancellationToken = default);
}
