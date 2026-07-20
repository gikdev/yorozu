using Microsoft.EntityFrameworkCore;
using Yorozu.Application.Common;
using Yorozu.Domain.ConsumptionLists;
using Yorozu.Infrastructure.Database;

namespace Yorozu.Infrastructure.ConsumptionLists;

internal sealed class ConsumptionListRepository(
    MainDbCtx db
) : IConsumptionListRepository {
    public async Task<ConsumptionList?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.ConsumptionLists.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

    public async Task<List<ConsumptionList>> GetAllAsync(CancellationToken cancellationToken = default)
        => await db.ConsumptionLists.ToListAsync(cancellationToken);

    public void Add(ConsumptionList entity) {
        db.ConsumptionLists.Add(entity);
    }

    public void Update(ConsumptionList entity) {
        db.ConsumptionLists.Update(entity);
    }

    public void Delete(ConsumptionList entity) {
        db.ConsumptionLists.Remove(entity);
    }

    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
        => await db.ConsumptionLists.AnyAsync(e => e.Id == id, cancellationToken);
}
