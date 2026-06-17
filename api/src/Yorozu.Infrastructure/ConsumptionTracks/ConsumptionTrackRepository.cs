using Microsoft.EntityFrameworkCore;
using Yorozu.Application.ConsumptionTracks.Common;
using Yorozu.Domain.ConsumptionTracks;
using Yorozu.Infrastructure.Database;

namespace Yorozu.Infrastructure.ConsumptionTracks;

internal class ConsumptionTrackRepository(
    MainDbCtx db
) : IConsumptionTrackRepository {
    public void Add(ConsumptionTrack consumptionTrack) => db.ConsumptionTracks.Add(consumptionTrack);

    public void Update(ConsumptionTrack consumptionTrack) => db.ConsumptionTracks.Update(consumptionTrack);

    public void Remove(ConsumptionTrack consumptionTrack) => db.ConsumptionTracks.Remove(consumptionTrack);

    public Task<ConsumptionTrack?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => db.ConsumptionTracks.FirstOrDefaultAsync(x => x.Id == id, ct);

    public Task<List<ConsumptionTrack>> ListAsync(CancellationToken ct = default)
        => db.ConsumptionTracks.ToListAsync(ct);

    public Task<List<ConsumptionTrack>> GetByContentItemIdAsync(Guid contentItemId, CancellationToken cancellationToken = default)
        => db.ConsumptionTracks.Where(x => x.ContentItemId == contentItemId).ToListAsync(cancellationToken);
}
