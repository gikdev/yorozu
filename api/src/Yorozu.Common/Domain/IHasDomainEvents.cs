namespace Yorozu.Common.Domain;

public interface IHasDomainEvents {
    IReadOnlyList<IDomainEvent> DomainEvents { get; }
    void ClearDomainEvents();
}
