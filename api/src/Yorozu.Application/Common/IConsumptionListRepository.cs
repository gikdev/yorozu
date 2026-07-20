using Yorozu.Domain.ConsumptionLists;

namespace Yorozu.Application.Common;

public interface IConsumptionListRepository {
    Task<ConsumptionList?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<ConsumptionList>> GetAllAsync(CancellationToken cancellationToken = default);
    void Add(ConsumptionList entity);
    void Update(ConsumptionList entity);
    void Delete(ConsumptionList entity);
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
}
