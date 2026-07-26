using MediatR;
using Microsoft.EntityFrameworkCore;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;

namespace Yorozu.Infrastructure.Database;

public sealed class MainDbCtx(
    DbContextOptions<MainDbCtx> options,
    IMediator mediator
) : DbContext(options), IUnitOfWork {
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        if (Database.ProviderName != "Microsoft.EntityFrameworkCore.Sqlite")
            modelBuilder.HasDefaultSchema(Schemas.Main);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) {
        var result = await base.SaveChangesAsync(cancellationToken);

        var events = ChangeTracker.Entries<IHasDomainEvents>()
            .SelectMany(e => e.Entity.DomainEvents)
            .ToList();

        ChangeTracker.Entries<IHasDomainEvents>()
            .ToList()
            .ForEach(e => e.Entity.ClearDomainEvents());

        foreach (var domainEvent in events)
            await mediator.Publish(domainEvent, cancellationToken);

        return result;
    }
}
