using Microsoft.EntityFrameworkCore;
using Yorozu.Application.Common;
using Yorozu.Domain.ConsumptionLists;
using Yorozu.Infrastructure.Database;

namespace Yorozu.Infrastructure.ConsumptionTrackLists;

internal sealed class ConsumptionTrackListRepository(
    MainDbCtx db
) : IConsumptionTrackListRepository {
    public async Task<ConsumptionList?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.ConsumptionTrackLists.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public async Task<List<ConsumptionList>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.ConsumptionTrackLists.ToListAsync(cancellationToken);

    public void Add(ConsumptionList entity) {
        db.ConsumptionTrackLists.Add(entity);
    }

    public void Update(ConsumptionList entity) {
        db.ConsumptionTrackLists.Update(entity);
    }

    public void Delete(ConsumptionList entity) {
        db.ConsumptionTrackLists.Remove(entity);
    }

    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.ConsumptionTrackLists.AnyAsync(e => e.Id == id, cancellationToken);
}
