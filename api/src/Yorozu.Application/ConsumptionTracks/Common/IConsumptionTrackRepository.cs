using Yorozu.Domain.ConsumptionTracks;

namespace Yorozu.Application.ConsumptionTracks.Common;

public interface IConsumptionTrackRepository {
    void Add(ConsumptionTrack consumptionTrack);
    void Update(ConsumptionTrack consumptionTrack);
    void Remove(ConsumptionTrack consumptionTrack);
    Task<List<ConsumptionTrack>> ListAsync(CancellationToken cancellationToken = default);
    Task<ConsumptionTrack?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<ConsumptionTrack>> GetByContentItemIdAsync(Guid contentItemId, CancellationToken cancellationToken = default);
}
