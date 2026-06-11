using Microsoft.EntityFrameworkCore;
using Yorozu.Common.Data;
using Yorozu.Domain.ContentItems;
using Yorozu.Infrastructure.ContentItems;

namespace Yorozu.Infrastructure.Database;

public sealed class MainDbCtx(DbContextOptions<MainDbCtx> options) : DbContext(options), IUnitOfWork {
    internal DbSet<ContentItem> ContentItems => Set<ContentItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        if (Database.ProviderName != "Microsoft.EntityFrameworkCore.Sqlite")
            modelBuilder.HasDefaultSchema(Schemas.Main);

        modelBuilder.ApplyConfiguration(new ContentItemConfiguration());
        modelBuilder.ApplyConfiguration(new ConsumptionTrackConfiguration());
    }
}
