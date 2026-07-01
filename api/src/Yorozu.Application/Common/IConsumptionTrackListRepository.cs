using Yorozu.Domain.ConsumptionTrackLists;

namespace Yorozu.Application.Common;

public interface IConsumptionTrackListRepository {
    Task<ConsumptionTrackList?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<ConsumptionTrackList>> GetAllAsync(CancellationToken cancellationToken = default);
    void Add(ConsumptionTrackList entity);
    void Update(ConsumptionTrackList entity);
    void Delete(ConsumptionTrackList entity);
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
}
