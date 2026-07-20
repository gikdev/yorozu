using MediatR;
using Microsoft.EntityFrameworkCore;
using Yorozu.Common.Data;
using Yorozu.Common.Domain;
using Yorozu.Domain.ConsumptionLists;
using Yorozu.Domain.ConsumptionTracks;
using Yorozu.Domain.ContentItems;
using Yorozu.Infrastructure.ConsumptionTrackLists;
using Yorozu.Infrastructure.ConsumptionTracks;
using Yorozu.Infrastructure.ContentItems;

namespace Yorozu.Infrastructure.Database;

public sealed class MainDbCtx(
    DbContextOptions<MainDbCtx> options,
    IMediator mediator
) : DbContext(options), IUnitOfWork {
    internal DbSet<ContentItem> ContentItems => Set<ContentItem>();
    internal DbSet<ConsumptionTrack> ConsumptionTracks => Set<ConsumptionTrack>();
    internal DbSet<ConsumptionList> ConsumptionTrackLists => Set<ConsumptionList>();

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        if (Database.ProviderName != "Microsoft.EntityFrameworkCore.Sqlite")
            modelBuilder.HasDefaultSchema(Schemas.Main);

        modelBuilder.ApplyConfiguration(new ContentItemConfiguration());
        modelBuilder.ApplyConfiguration(new ConsumptionTrackConfiguration());
        modelBuilder.ApplyConfiguration(new ConsumptionTrackListConfiguration());
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
